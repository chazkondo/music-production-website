import axios from "axios";
import { useState } from "react";

function Index() {
  const [text, setText] = useState("Welcome to Next.js!");
  return <div>{text}</div>;
}

export default Index;
