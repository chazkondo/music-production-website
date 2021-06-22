export default async (req, res) => {
  try {
    res.status(200).json("hi");
  } catch (error) {
    console.log("err", error);
    throw err;
  }
};
