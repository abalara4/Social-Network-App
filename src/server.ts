import express from "express";
import userRoutes from "./routes/api/userRoutes";
import thoughtRoutes from "./routes/api/thoughtRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
