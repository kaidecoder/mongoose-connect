import mongoose from "mongoose";

mongoose.connect(DB_URI)
.then(() => {
    console.log("db connection successful")
})
.catch((error) => {
    console.log("something went wrong", error)
})
