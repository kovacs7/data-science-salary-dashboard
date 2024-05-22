import express from "express";
import cors from "cors";
import { getFeedback } from "./getFeedback.mjs";

const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

app.post("/Chat", async (req, res) => {
  try {
    const { input } = req.body;
    const feedback = await getFeedback(input);
    res.json({ feedback });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
