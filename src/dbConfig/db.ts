import { error } from "console";
import { connect } from "mongoose";
//rf6QCSKvLNZI0AhW
const db = async () => {
  connect(
    "mongodb+srv://ashrafabusunaina1986:rf6QCSKvLNZI0AhW@cluster0.h2ko2kp.mongodb.net/"
  )
    .then(() => console.log("Database connection successfully"))
    .catch((error) => console.log(error));
};
export default db;
