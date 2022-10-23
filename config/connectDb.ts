import mongoose from "mongoose";
import colors from "colors";
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then((res) => {
      console.log(
        colors.bgMagenta.white.bold(
          `the db is connected in: ${res.connection.port}`
        )
      );
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
export default connectDB;
