import express from "express";
import { createClient } from "redis";

const port = Number(process.env.PORT || 3000);
const redis = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
redis.on("error", (error) => console.error("redis:", error.message));
// node-redis keeps reconnecting on its own, so a Redis that starts after the app is fine.
redis.connect().catch((error) => console.error("redis connect:", error.message));

const app = express();
app.disable("x-powered-by");

app.get("/health", async (_req, res) => {
  try {
    await redis.ping();
    res.json({ status: "ok", redis: "ok" });
  } catch {
    res.status(503).json({ status: "degraded", redis: "unreachable" });
  }
});

app.get("/api/visits", async (_req, res, next) => {
  try {
    res.json({ visits: Number((await redis.get("visits")) || 0) });
  } catch (error) {
    next(error);
  }
});

app.get("/", async (_req, res, next) => {
  try {
    const visits = await redis.incr("visits");
    res.type("html").send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Visits</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:40px auto;padding:0 16px">
<h1>Visit counter</h1><p>This page has been opened <strong>${visits}</strong> times. The count lives in Redis.</p>
</body></html>`);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
