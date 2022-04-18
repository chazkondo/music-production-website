import axios from "axios";
import Cors from "cors";
import initMiddleware from "../../middleware/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"],
  })
);

export default async (req, res) => {
  await cors(req, res);

  function getActivities(resolve) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities`;
    axios
      .get(activities_link, {
        headers: { authorization: `Bearer ${resolve.access_token}` },
      })
      .then(async (response) => {
        const filtered = response.data.map((item) => {
          return {
            distance: item.distance,
            id: item.id,
            start_date: item.start_date,
            start_date_local: item.start_date_local,
            time: item.elapsed_time,
            speed: item.average_speed,
            name: item.name,
          };
        });
        const stringified = JSON.stringify(filtered);
        res.setHeader("Cache-Control", "s-maxage=86400");
        res.status(200).json(stringified);
      })
      .catch((err) => {
        console.log("An error occurred", err);
      });
  }
  fetch("https://www.strava.com/oauth/token?", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      refresh_token: process.env.REFRESH_TOKEN,
      grant_type: process.env.GRANT_TYPE,
    }),
  })
    .then(async (response) => getActivities(await response.json()))
    .catch((err) => console.log("err"));
};
