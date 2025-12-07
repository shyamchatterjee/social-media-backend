let express = require("express");
let router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const User = require("./model/userscema");
const post = require("./model/postsecma");

let secretKey = "SHYAM";
let registermiddleware = async (req, res, next) => {
  let finduser = await User.findOne({ email: req.body.email });
  if (!finduser) {
    return next();
  }
  return res.json({ ok: false, massage: "You're email   allredy register" });
};

let verifyTokenMiddleware = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(404).json({ ok: false, massage: "Please login" });
  }
  let verify = jwt.verify(req.cookies.token, secretKey);
  let checkuser = await User.findById(verify.id);
  if (!checkuser)
    return res.status(404).json({ ok: false, massage: "Unvaield token" });

  req.user = verify;
  return next();
};

router.post("/register", registermiddleware, async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.json({ ok: false, massage: "please fill the deta" });
    }
    let password = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });
    return res
      .status(200)
      .json({ ok: true, massage: "You are registered", user: user });
  } catch (err) {
    return res.status(500).json({ ok: false, massage: "Server eror" });
  }
});
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .json({ ok: false, massage: "please fill the deta" });
    }
    let checkemail = await User.findOne({ email: req.body.email });
    if (!checkemail) {
      return res.status(404).json({
        ok: false,
        massage: "Your eamil is not exist, Please register then",
      });
    }
    let match = await bcrypt.compare(req.body.password, checkemail.password);
    if (!match)
      return res.status(404).json({
        ok: false,
        massage: "Unvailed password",
      });

    let token = jwt.sign(
      { id: checkemail.id, name: checkemail.name },
      secretKey
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({ ok: true, massage: "You're Login" });
  } catch (err) {
    return res.status(500).json({ ok: false, massage: "Server problem" });
  }
});

router.post("/post", verifyTokenMiddleware, async (req, res) => {
  try {
    if (!req.body.text || !req.body.image)
      return res
        .status(404)
        .json({ ok: false, massage: "please fill the deta" });

    let postdeta = await post.create({
      text: req.body.text,
      user_id: req.user.id,
      image: req.body.image,
    });
    res.status(200).json({ ok: true, massage: "Posted ✓", postdeta: postdeta });
  } catch (err) {
    return res.status(500).json({ ok: false, massage: "Server problem" });
  }
});
router.get("/like/:id", verifyTokenMiddleware, async (req, res) => {
  let id = req.params.id;
  let findpost = await post.findById(id);
  if (!findpost) {
    return res.status(404).json({ ok: false, massage: "not like it" });
  }

  if (!findpost.like.includes(req.user.id)) {
    findpost.like.push(req.user.id);
  }
  await findpost.save();
  return res.status(200).json({
    ok: true,
    massage: "Like the post",
    likepost: findpost.like.length,
  });
});
router.get("/", verifyTokenMiddleware, async (req, res) => {
  let deta = await post
    .find()
    .populate("user_id")
    .populate("like")
    .populate("comment.user_id");
  console.log(deta);
  res.status(200).json({ ok: true, deta: deta });
});
router.get("/unlike/:id", verifyTokenMiddleware, async (req, res) => {
  let id = req.params.id;
  let findpost = await post.findById(id);

  let removedeta = findpost.like.filter((element) => {
    if (element.toString() !== req.user.id) {
      return element;
    }
  });
  findpost.like = removedeta;
  await findpost.save();
  res.status(200).json({
    ok: true,
    massage: "Unlike the post",
    likedeta: findpost.like.length,
  });
});
router.post("/comment/:id", verifyTokenMiddleware, async (req, res) => {
  if (!req.body.text) {
    return res.status(404).json({ ok: false, massage: "Please fill the deta" });
  }
  let id = req.params.id;
  let findpost = await post.findById(id);

  findpost.comment.push({
    text: req.body.text,
    user_id: req.user.id,
    user_name: req.user.name,
  });
  await findpost.save();

  return res.status(200).json({
    ok: true,
    commentpost: findpost,
    comment: findpost.comment.length,
  });
});
router.delete("/remove/:id", verifyTokenMiddleware, async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ ok: false, massage: "unvalied id" });
  }

  let removedeta = await post
    .find({ user_id: req.user.id })
    .findByIdAndDelete(req.params.id);
  if (!removedeta) {
    return res
      .status(404)
      .json({ ok: false, massage: "anathor post not deleted" });
  }
  return res.status(200).json({ ok: true, massage: "Your post deleted" });
});
router.delete(
  "/comment/remove/:postid/:commentid",
  verifyTokenMiddleware,
  async (req, res) => {
    let findeta = await post.findById(req.params.postid);
    if (!findeta)
      return res.status(404).json({ ok: false, massage: "post not found" });
    let checkuser = findeta.comment.find((element) => {
      if (element.user_id == req.user.id) {
        return element;
      }
    });
    if (!checkuser) {
      return res.status(404).json({
        ok: false,
        massage: "only comment owner can be massage delete",
      });
    }
    let removedeta = findeta.comment.filter((element) => {
      if (element._id.toString() !== req.params.commentid) {
        return element;
      }
    });
    findeta.comment = removedeta;
    await findeta.save();
    return res.status(200).json({ ok: true, massage: "comment deleted" });
  }
);
module.exports = router;
