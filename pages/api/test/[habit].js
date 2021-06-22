import axios from "axios";

export default async (req, res) => {
  const newDate = new Date();
  const habits = {
    reviewCalendarUpTo1Week: process.env.REVIEW_CALENDAR_UP_TO_1_WEEK,
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
  };

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
      const stringified = JSON.stringify(resolve.data);
      res.status(200).json(stringified);
    })
    .catch((err) => {
      console.log("An error occurred", err);
    });
};
