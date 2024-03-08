import mongoose from "mongoose";

export const Connection = async (username, password) => {
  //   const URL = `mongodb://${username}:${password}@127.0.0.1:27017/DWR`;
  const URL = `mongodb+srv://${username}:${password}@dwr.q8qhn7h.mongodb.net/`;

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error while connecting with database", error.message);
  }
};

export default Connection;
