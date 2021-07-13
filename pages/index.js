import axios from "axios";
import { useState } from "react";

function Index() {
  const [text, setText] = useState("Welcome to Next.js!");
  axios
    .get(`/api/running`)
    .then((resolve) => {
      console.log(resolve, "what am i getting here?");
    })
    .catch((err) => {
      console.log("An error occurred", err);
    });
  return <div>{text}</div>;
}

export default Index;
