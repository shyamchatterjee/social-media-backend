import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router";
import CreatePost from "../post/createpost";
import PostCard from "../post/post";

let Home = () => {
  let [posts, setpost] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8000/", {
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
          return navigate("/login");
        }
        setpost(value.deta);
      });
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <Navbar />
      <div className="max-w-xl mx-auto mt-4 hidden md:block">
        <CreatePost />

        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="block  md:hidden w-full flex justify-center items-center flex-col">
        <CreatePost />

        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Home;
