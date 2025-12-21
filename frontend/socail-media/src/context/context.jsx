import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";

export let Context = createContext(null);
export let ContextFunction = ({ children }) => {
  let navigate = useNavigate();
  let [msg, setmsg] = useState("");
  let [from, setfrom] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });
  let [postDeta, setpostDeta] = useState({ text: "", image: "" });
  let logout = () => {
    fetch("http://localhost:8000/logout", {
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
        console.log(value);
        if (value.ok) {
          toast.success(value.massage + "✅", {
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
          return navigate("/login");
        }
      });
  };
  let submit = (from) => {
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(from),
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (!value.ok) {
          return setmsg(value.massage);
        }
        setmsg("");
        toast.success(value.massage + "✅", {
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
        return navigate("/login");
      });
  };

  let postsubmit = (deta) => {
    fetch("http://localhost:8000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deta),
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (!value.ok) {
          return setmsg(value.massage);
        }
        setmsg("");
        setpostDeta("");
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
    <Context.Provider
      value={{
        logout,
        from,
        setfrom,
        submit,
        msg,
        postsubmit,
        postDeta,
        setpostDeta,
      }}
    >
      {children}
    </Context.Provider>
  );
};
