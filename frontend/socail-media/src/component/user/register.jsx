import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Context } from "../../context/context";

let Register = () => {
  let { setfrom, from, submit, msg } = useContext(Context);
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
        if (value.ok) {
          return navigate("/");
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4 text-sm sm:text-base"
          onChange={(e) => {
            setfrom({ ...from, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Your image"
          className="w-full border p-3 rounded-lg mb-4 text-sm sm:text-base"
          onChange={(e) => {
            setfrom({ ...from, image: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4 text-sm sm:text-base"
          onChange={(e) => {
            setfrom({ ...from, email: e.target.value });
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4 text-sm sm:text-base"
          onChange={(e) => {
            setfrom({ ...from, password: e.target.value });
          }}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm sm:text-base font-semibold"
          onClick={() => {
            submit(from);
          }}
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer font-semibold">
            <Link to="/login">Login</Link>
          </span>
        </p>
        {msg ? <p className="text-red-500 mt-2 text-center">{msg}</p> : ""}
      </div>
    </div>
  );
};
export default Register;
