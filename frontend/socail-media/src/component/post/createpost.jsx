import { useContext, useState } from "react";
import { Context } from "../../context/context";

export default function CreatePost() {
  let { postsubmit, msg, postDeta, setpostDeta } = useContext(Context);
  return (
    <>
      <div className="bg-white hidden md:block mt-6 p-4 md:mt-4 shadow-md rounded-xl">
        <textarea
          className="w-full border p-3 rounded-lg outline-0"
          placeholder="What's on your mind?"
          onChange={(e) => {
            setpostDeta({ ...postDeta, text: e.target.value });
          }}
        ></textarea>
        <input
          type="text"
          name=""
          id=""
          className="mt-3  w-full border-0 outline-0"
          placeholder="Image"
          onChange={(e) => {
            setpostDeta({ ...postDeta, image: e.target.value });
          }}
        />
        {msg ? <p className="text-blue-500 mt-3 text-center">{msg}</p> : ""}

        <button
          className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg"
          onClick={() => postsubmit(postDeta)}
        >
          Post
        </button>
      </div>
      <div className="bg-white w-[80vw] block md:hidden mt-6 p-4 md:mt-4 shadow-md rounded-xl">
        <textarea
          className="w-full border p-3 rounded-lg outline-0"
          placeholder="What's on your mind?"
          value={postDeta.text}
          onChange={(e) => {
            setpostDeta({ ...postDeta, text: e.target.value });
          }}
        ></textarea>
        <input
          type="text"
          name=""
          id=""
          value={postDeta.image}
          className="mt-3  w-full border-0 outline-0"
          placeholder="Image"
          onChange={(e) => {
            setpostDeta({ ...postDeta, image: e.target.value });
          }}
        />
        {msg ? <p className="text-blue-500 mt-3 text-center">{msg}</p> : ""}

        <button
          className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg"
          onClick={() => postsubmit(postDeta)}
        >
          Post
        </button>
      </div>
    </>
  );
}
