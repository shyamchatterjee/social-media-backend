import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

export default function PostCard({ post }) {
  let [bool, setbool] = useState(false);
  let [text, settext] = useState("");
  let comment = (postid, text) => {
    fetch("http://localhost:8000/comment/" + postid, {
      method: "POST",
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (!value.ok) {
          return toast.success(value.massage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        settext("");
        return toast.success(value.massage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  let commentdelete = (postid, commentid) => {
    console.log(postid, commentid);
    fetch("http://localhost:8000/comment/remove/" + postid + "/" + commentid, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (value.ok === false) {
          return toast.success(value.massage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        return toast.success(value.massage + "✅", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };
  let like = (postid) => {
    fetch("http://localhost:8000/like/" + postid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (!value.ok) {
          return toast.success(value.massage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        setbool(true);
        return toast.success(value.massage + "✅", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  let unlike = (postid) => {
    fetch("http://localhost:8000/unlike/" + postid, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (!value.ok) {
          return toast.success(value.massage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        setbool(false);
        return toast.success(value.massage + "✅", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };

  return (
    <>
      <div className="  hidden bg-white  shadow-md rounded-xl mt-5 p-3  md:block">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              src={post.user_id?.image}
              alt=""
            />
          </div>
          <h3 className="font-bold text-sm sm:text-base">
            {post.user_id?.name}
          </h3>
        </div>

        {/* Post Text */}
        <p className="text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
          {post.text}
        </p>
        <img
          src={post.image}
          style={{ width: "50px", height: "50px" }}
          alt=""
        />

        {/* Buttons */}
        <div className="flex gap-4 mb-2 sm:mb-3 text-sm sm:text-base">
          <button className="text-blue-600 text-2xl flex items-center cursor-pointer">
            {bool ? (
              <p onClick={() => unlike(post._id)}>❤️</p>
            ) : (
              <CiHeart onClick={() => like(post._id)} />
            )}
            <p className="text-[15px]">{post.like?.length}</p>
          </button>

          <button className="text-gray-600 text-2xl flex items-center ">
            💬
            <p className="text-[15px]">
              {" "}
              {post.comment?.length == 0
                ? "No comment yet"
                : post.comment?.length}
            </p>
          </button>
        </div>

        {/* Comments */}
        <div>
          {post.comment?.map((c) => (
            <div
              key={c._id}
              className="flex justify-between items-start py-1 border-b text-sm sm:text-base"
            >
              <p className="pr-2">
                <span className="font-bold">{c.user_name}</span>: {c.text}
              </p>

              <a href="/">
                <button
                  className="text-red-500 text-xs sm:text-sm cursor-pointer"
                  onClick={() => commentdelete(post._id, c._id)}
                >
                  ❌
                </button>
              </a>
            </div>
          ))}

          <input
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                comment(post._id, e.target.value), navigate("/");
            }}
            className="border p-2 w-full rounded-lg mt-2 text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="bg-white block shadow-md rounded-xl mt-5 p-3  md:hidden">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              src={post.user_id?.image}
              alt=""
            />
          </div>
          <h3 className="font-bold text-sm sm:text-base">
            {post.user_id?.name}
          </h3>
        </div>

        {/* Post Text */}
        <p className="text-gray-800 text-sm sm:text-base mb-2 sm:mb-3">
          {post.text}
        </p>
        <img
          src={post.image}
          style={{ width: "50px", height: "50px" }}
          alt=""
        />

        {/* Buttons */}
        <div className="flex gap-4 mb-2 sm:mb-3 text-sm sm:text-base">
          <button className="text-blue-600 text-2xl flex items-center cursor-pointer">
            {bool ? (
              <p onClick={() => unlike(post._id)}>❤️</p>
            ) : (
              <CiHeart onClick={() => like(post._id)} />
            )}{" "}
            <p className="text-[15px]">{post.like?.length}</p>
          </button>
          <button className="text-gray-600 text-2xl flex items-center ">
            💬
            <p className="text-[15px]">
              {" "}
              {post.comment?.length == 0
                ? "No comment yet"
                : post.comment?.length}
            </p>
          </button>
        </div>

        {/* Comments */}
        <div>
          {post.comment?.map((c) => (
            <div
              key={c._id}
              className="flex justify-between items-start py-1 border-b text-sm sm:text-base"
            >
              <p className="pr-2">
                <span className="font-bold">{c.user_name}</span>: {c.text}
              </p>

              <a href="/">
                {" "}
                <button
                  className="text-red-500 text-xs sm:text-sm cursor-pointer"
                  onClick={() => commentdelete(post._id, c._id)}
                >
                  ❌
                </button>{" "}
              </a>
            </div>
          ))}

          <input
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") comment(post._id, e.target.value);
            }}
            className="border p-2 w-full rounded-lg mt-2 text-sm sm:text-base"
          />
        </div>
      </div>
    </>
  );
}
