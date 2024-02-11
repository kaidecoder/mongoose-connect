import express from "express"
import "dotenv/config"
import mongoose from "mongoose";
import gradesRoute from "./routes/grade.mjs"
import morgan from "morgan"

const PORT = process.env.PORT || 5050;
const app = express()

app.use(express.json());
app.use(morgan("dev"))
// Connect to Mongoose
const connectionString = process.env.DB_URI;
mongoose.connect(connectionString)


// Connection events
const db = mongoose.connection;

// Event: Connected
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Event: Error
db.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
});


app.use("/grades", gradesRoute);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})