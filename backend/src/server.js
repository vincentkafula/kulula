import express from "express";
import cors from "cors";
import {
  headlines,
  hero,
  latestNews,
  categories,
  onAir,
  tvHighlights,
  schedule
} from "./data.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ service: "kulula-backend", status: "ok" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/headlines", (_req, res) => {
  res.json({ headlines });
});

app.get("/api/hero", (_req, res) => {
  res.json(hero);
});

app.get("/api/news", (_req, res) => {
  res.json({ news: latestNews });
});

app.get("/api/categories", (_req, res) => {
  res.json({ categories });
});

app.get("/api/onair", (_req, res) => {
  res.json(onAir);
});

app.get("/api/tv-highlights", (_req, res) => {
  res.json({ highlights: tvHighlights });
});

app.get("/api/schedule", (_req, res) => {
  res.json({ schedule });
});

app.post("/api/newsletter", (req, res) => {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  res.json({ status: "subscribed", email });
});

app.listen(PORT, () => {
  console.log(`kulula-backend listening on port ${PORT}`);
});
