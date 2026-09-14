# Express + Redis visit counter

A small [Express](https://expressjs.com) app that counts visits in Redis. [The Deployer](https://thedploy.com) Lab
deploys it into a real cloud account to measure how long a deploy takes, what breaks and what it costs.

## Run it locally

```bash
npm install
REDIS_URL=redis://localhost:6379 npm start
```

`GET /health` answers `200` when Redis is reachable.
