import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
});

const User = mongoose.model("user", userSchema);

export default User; // ✅ ES module default export
