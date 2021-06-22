import axios from "axios";
import { useState } from "react";

function Index() {
  const [text, setText] = useState("Welcome to Next.js!");
  return (
    <div
      onClick={() => {
        axios
          .get(`/api/test/reviewCalendarUpTo1Week`)
          .then((res) => {
            console.log(res, "what came back?");
            // if (res.data) {
            //   setText(res.data);
            // } else {
            //   console.log("res error");
            // }
          })
          .catch((err) => {
            console.log("an error occurred");
          });
      }}
    >
      {text}
    </div>
  );
}

export default Index;