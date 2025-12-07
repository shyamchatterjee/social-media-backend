let mongoos = require("mongoose");

let postsecma = new mongoos.Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    user_id: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "user",
    },
    like: [
      {
        type: mongoos.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comment: [
      {
        text: {
          type: String,
        },
        user_name: {
          type: mongoos.Schema.Types.String,
          ref: "user",
        },
        user_id: {
          type: mongoos.Schema.Types.ObjectId,
          ref: "user",
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);
let post = mongoos.model("post", postsecma);
module.exports = post;
