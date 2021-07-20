// import axios from "axios";

// export default async (req, res) => {
//   axios
//     .get(`https://api.habitify.me/habits`, {
//       headers: { Authorization: process.env.HABITIFY_AUTH },
//     })
//     .then(async (resolve) => {
//       const stringified = JSON.stringify(resolve.data);
//       res.status(200).json(stringified);
//     })
//     .catch((err) => {
//       console.log("An error occurred", err);
//     });
// };
