import axios from "axios";
import Cors from "cors";
import initMiddleware from "../../middleware/init-middleware";

let cache = {};

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
  const newDate = new Date();
  const habits = {
    reviewCalendarUpTo1Week: process.env.REVIEW_CALENDAR_UP_TO_1_WEEK,
    weeklyGoals: process.env.WEEKLY_GOALS,
    weeklyReview: process.env.WEEKLY_REVIEW,
    emptyCaptures: process.env.EMPTY_CAPTURES,
    reviewReprioritizePersonalOrganizer:
      process.env.REVIEW_REPRIORITIZE_PERSONAL_ORGANIZER,
    fifteenMinuteOrganizingCleaning:
      process.env.FIFTEEN_MINUTE_ORGANIZING_CLEANING,
    meditationHypnosis: process.env.MEDITATION_HYPNOSIS,
    studyReadFlashCardsAudible: process.env.STUDY_READ_FLASH_CARDS_AUDIBLE,
    intermittentFasting: process.env.INTERMITTENT_FASTING,
    nutriblast: process.env.NUTRIBLAST,
    lumosity: process.env.LUMOSITY,
    om: process.env.OM,
    vs: process.env.VS,
  };

  // route: 'reviewCalendarUpTo1Week'
  // route: 'weeklyGoals'
  // route: 'weeklyReview'
  // route: 'emptyCaptures'
  //  route: 'reviewReprioritizePersonalOrganizer'
  //  route: 'fifteenMinuteOrganizingCleaning'
  // route: 'meditationHypnosis'
  // route: 'studyReadFlashCardsAudible'
  // route: 'intermittentFasting'
  //  route: 'nutriblast'
  // route: 'lumosity'

  axios
    .get(
      `https://api.habitify.me/logs/${
        habits[req.query.habit]
      }?from=2018-01-02T00%3A00%3A00%2D10%3A00&to=${
        newDate.toISOString().slice(0, 19).replace(/\:/g, "%3A") + "%2D10%3A00"
      }`,
      { headers: { Authorization: process.env.HABITIFY_AUTH } }
    )
    .then(async (resolve) => {
      const newData = {
        ...resolve.data,
        timestamp: newDate,
        // cache: cache[data] ? cache[data] : "nothing",
      };

      const stringified = JSON.stringify(newData);
      res.setHeader("Cache-Control", "s-maxage=86400");
      res.status(200).json(stringified);
    })
    .catch((err) => {
      console.log("An error occurred", err);
    });
};
