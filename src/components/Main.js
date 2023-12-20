import React from "react";
import { useState } from "react";
import loader from "../assets/images/loader.png";
import { ImageList, ImageListItem } from "@mui/material";
import "@fontsource/montserrat";
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
// card imported
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Avatar from "@mui/material/Avatar";

function Main(props) {
  const [popup, setpopup] = useState("");

  return (
    <>
      {props.data ? (
        <div id="container">
          <ImageList variant="masonry" cols={3} gap={8}>
            {props.data.map((items, index) => (
              <ImageListItem
                key={index}
                onClick={() => {
                  setpopup(index + 1);
                  document.getElementById("container").style.opacity = "0.2";
                }}
              >
                <div
                  className="image_div"
                  style={props.mode === "Dark" ? {} : { border: "none" }}
                >
                  
                  <img  src={items.urls.small} key={index} alt="coming" />
            
                  <div
                    className="user_div"
                    style={
                      props.mode === "Dark"
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "rgb(20,20,20)", color: "white" }
                    }
                  >
                    <div className="user_intro">
                      <img src={items.user.profile_image.large} alt="coming" />
                      <div className="name_div">
                        <h3>{items.user.name}</h3>
                        <p>@{items.user.username}</p>
                      </div>
                    </div>

                    <div className="likes_div">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-hand-thumbs-up"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                      <p>{items.likes}</p>
                    </div>
                  </div>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      ) : (
        <div id="Loader">
          <img src={loader} alt="IMG"></img>
          <h1>Loading some awesome Images...</h1>
        </div>
      )}

      {popup ? (
        <Card sx={{ maxWidth: 1000 }} id="crad_div">
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={props.data[popup - 1].urls.raw}
              alt="green iguana"
            />
            <Button variant="outlined" id="buttonshare">
              {" "}
              <ShareIcon /> &nbsp;Share
            </Button>
            <Button variant="outlined" id="buttoninfo">
              <HelpOutlineOutlinedIcon />
              &nbsp; info
            </Button>
            <Button variant="contained" id="buttondawnload" >
              Download image
            </Button>
          </CardActionArea>
          <CardActionArea>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
              sx={{ width: 56, height: 56 }}
            />
            
          </CardActionArea>
          <button
            onClick={() => {
              setpopup("");
              document.getElementById("container").style.opacity = "1";
            }}
            id="cancelbutton"
          >
            X
          </button>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export default Main;
