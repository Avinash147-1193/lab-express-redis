# Express + Redis visit counter

[![Deploy to your own cloud](https://thedploy.com/check/button.svg)](https://thedploy.com/check/deploy?repo=github.com/Avinash147-1193/lab-express-redis)

A small [Express](https://expressjs.com) app that counts visits in Redis. [The Deployer](https://thedploy.com) Lab
deploys it into a real cloud account to measure how long a deploy takes, what breaks and what it costs.

## Run it locally

```bash
npm install
REDIS_URL=redis://localhost:6379 npm start
```

`GET /health` answers `200` when Redis is reachable.

## Deploy it into your own cloud

Click the button above, or check it first with no account:

```sh
npx thedeploy-check github.com/Avinash147-1193/lab-express-redis
```

It goes into your own AWS, Google Cloud, Azure or DigitalOcean account, so your cloud provider bills you directly and nothing is locked to us.
