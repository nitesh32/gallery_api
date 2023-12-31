import "./App.css";
// import Navbarmain from './components/Navbarmain';
import Main from "./components/Main";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";


const style_dark = {
  backgroundColor: "rgb(35,35,35)",
  color: "white",
};
const style_light = {
  backgroundColor: "rgb(255,255,255)",
  color: "black",
};
const style_bar_dark = {
  backgroundColor: "rgb(79,79,79)",
  color: "rgb(196,196,196)",
};
const style_bar_light = {
  backgroundColor: "rgb(249,249,249)",
  borderRadius: "10px",
};

function App() {
  // all states --------------------------------------------------------------------------
  const [mode, setmode] = useState("Dark");
  const [Data, setData] = useState("");
  const [hello, sethello] = useState("Home");
  const [place, setPlace] = useState("");
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(1);
  //handeling modes --------------------------------------------------------------------------
  function handlemode() {
    if (mode === "Dark") {
      setmode("Light");
    } else {
      setmode("Dark");
    }
  }
  // api call --------------------------------------------------------------------------
  const [apiUrl, setapiUrl] = useState(
    `https://api.unsplash.com/search/photos?query={}&per_page=10&client_id=tmdUnO9SEc6CqG5vHJIQbYSv5EqsTXwzJ9O8TylSwrM`
  );
  // //dependecy on string
  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data.results);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [hello]);
  // hadeling enter on search bar -------------------------------------------------
  const handleenter = (event) => {
    if (event.key === "Enter") {
      sethello(event.target.value);
      setapiUrl(
        `https://api.unsplash.com/search/photos?query=${event.target.value}&per_page=10&client_id=tmdUnO9SEc6CqG5vHJIQbYSv5EqsTXwzJ9O8TylSwrM`
      );
      setData("");
      setPage(1);
      event.target.value = "";
    }
    setPlace(event.target.value);
  };
  // handeling suggestions -----------------------------------------------------------------
  const handlesugg = (val) => {
    const ele = document.getElementById("search_text");
    ele.value = val;
    ele.focus();
    setPlace("");
  };

  useEffect(() => {
    if (place) {
      fetch(`https://api.tvmaze.com/search/shows?q=${place}`)
        .then((res) => res.json())
        .then((data) => setSearch(data));
    } else {
      setSearch([]);
    }
  }, [place]);
  // handling page up and down ---------------------------------------------
  const handlepagedown = () => {
    var val = page;
    if (val > 1) {
      setPage(val - 1);
    }
  };
  const handlepageup = () => {
    var val = page;
    setPage(val + 1);
  };
  // handeling page state --------------------------------------------------------------------------
  useEffect(() => {
    setapiUrl(
      `https://api.unsplash.com/search/photos?query=${hello}&page=${page}&per_page=10&client_id=tmdUnO9SEc6CqG5vHJIQbYSv5EqsTXwzJ9O8TylSwrM`
    );

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [page]);
  // handeling dependency on api url ----------------------------------------------------------------
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [apiUrl]);

  return (
    <div
      className="App"
      style={
        mode === "Dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "rgb(35,35,35)" }
      }
    >
      <div id="navbar" style={mode === "Dark" ? style_light : style_dark}>
        <strong>Image Gallery</strong>
        <div
          id="search_bar"
          style={mode === "Dark" ? style_bar_light : style_bar_dark}
        >
          <div
            id="static_bar"
            style={mode === "Dark" ? style_bar_light : style_bar_dark}
          >
            <div id="search_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Images here"
              style={mode === "Dark" ? style_bar_light : style_bar_dark}
              id="search_text"
              onKeyUp={(event) => handleenter(event, 1)}
              autoComplete="off"
            ></input>
          </div>

          {search.map((data, index) => {
            return (
              <h3
                key={index}
                className="suggestions"
                onClick={() => handlesugg(data.show.name)}
              >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
                {data.show.name}
              </h3>
            );
          })}
        </div>

        <div id="buttons_action">
          <h3 onClick={() => handlepagedown()}>-</h3>
          <h3>{page}</h3>
          <h3 onClick={() => handlepageup()}>+</h3>
        </div>

        <div id="mode_change">
          <h3>{mode} Mode</h3>
          <div
            id="mode_outer"
            onClick={() => handlemode()}
            style={
              mode === "Dark"
                ? {
                    justifyContent: "flex-start",
                    backgroundColor: "rgb(133,132,132)",
                  }
                : { justifyContent: "flex-end", backgroundColor: "white" }
            }
          >
            <div
              id="mode_inner"
              style={
                mode === "Dark"
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "rgb(133,132,132)" }
              }
            ></div>
          </div>
        </div>
      </div>
      <Stack
        sx={{ width: "80%", position: "fixed", top: 100, zIndex: 1 }}
        spacing={2}
      >
        <Alert
          severity="success"
          sx={{
            bgcolor: mode === "Dark" ? "#cccccc" : "#4f4f4f",
            color: mode === "Dark" ? "black" : "white",
          }}
        >
          Results for : {hello ? hello : "Random_images"} ,Page no: {page}
        </Alert>
      </Stack>
      <Main mode={mode} data={Data} mean={hello} />
    </div>
  );
}

export default App;
