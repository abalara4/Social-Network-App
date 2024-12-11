import express from "express";
import routes from "./routes";
import router from "@routes/api";

const app = express();
const PORT = process.env.PORT || 3001;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(routes)

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
