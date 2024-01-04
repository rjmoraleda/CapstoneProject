import express from "express";
import { errorResponserHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import {Cloudinary} from "@cloudinary/url-gen";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Configuration
dotenv.config();
connectDB();
const app = express();
// // const cors = require('cors');
// app.use(cors(
//    {
//       origin: ["https://deploy-mern-1whq.vercel.app"],
//       methods: ["POST", "GET"],
//       credentials: true
//    }

// ));

// Cloudinary
const App = () => {
   const cld = new Cloudinary({cloud: {cloudName: 'dvcmjwehc'}});
 };


// Middlewarre
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Server is running");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

//Static Assests
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorResponserHandler);
// app.use(invalidPathHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
