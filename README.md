# Asturias Weather Bot Sender

Service to send information  about Weather in Asturias using Twitter's tweets.


## Information 🚀

### Architecture

![alt text](https://i.imgur.com/jxk19Yf.png)

- **AEMET API:** it's an API REST service for meteorology data from Spain
- **ASTURIAS-WEAHTER-BOT-GATHER:** microservice to request forecasting and municipality data
- **ASTURIAS-WEATHER-BOT-API:** microserive to manage CRUD operations
- **DATABASE:** storages data of forecastings and municipalities
- **ASTURIAS-WEATHER-BOT-SENDER:** microservice to create tweets about forecasting and munipality data

### Pre-requisitos 📋

Software requited to run this project:
- Git
- NodeJS v10.16.0
- NPM v6.14.5
- *Nodemon (optional)*
- *PM2 (optional)*


### Installation & First Run 🔧

1. Clone the repo and navigate to the workspace folder:

```bash
git clone https://github.com/IgnacioRubio/asturias-weather-bot-sender.git
cd asturias-weather-bot-sender
```

2. Install project dependencies

```bash
npm install
```

3. Create and set up environment variables into *.env* file 

```bash
echo > .env
```

```
DB_URL_API=localhost:3000
TW_CONSUMER_KEY=N7ShYAp4jOJ1EOzJ7xbiNJ8nr
TW_CONSUMER_SECRET=2k5f9ozwmFSHnNUOxj2tO9mCixeTztT7d7zNGkv7CQkNTEr7zu
TW_TOKEN_KEY=1264627332020686850-a9BOzp90s1Oo9SvUfhSa4EeIPy8tGY
TW_TOKEN_SECRET=MbxGdoC7eXpVOp71U0Nc4vhK5h6MmH1sR4K4fBQAZupcF
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_AUTH_USER=example@example.com
EMAIL_AUTH_PASS=example123
EMAIL_MSG_FROM=exmaple@example.com
EMAIL_MSG_TO=example@example.com
```

3. Run SENDER service 

```
npm start
```

### What's included 📂

```
asturias-weather-bot-sender
├── index.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── services
    │   ├── email.js
    │   └── forecasting.js
    ├── util
    │   └── env.js
    └── var
        └── state-skies-emojis.js
```

### Flowchart

![alt text](https://i.imgur.com/4SZklHe.png)

## Deployment 📦

PM2 is used to make the deployment.

1. Run *package.json* script `npm run pm2`
2. List service `pm2 list`
3. Restart service after update `pm2 restart awb-sender`
4. Stop service `pm2 stop awb-sender`

## Built with 🛠️

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime
* [Express](https://expressjs.com/) - Web application framework
* [nodemailer](https://www.npmjs.com/package/nodemailer) - Easy as cake e-mail sending
* [node-schedule](https://www.npmjs.com/package/node-schedule) - A cron-like and not-cron-like job scheduler
* [node-emoji](https://www.npmjs.com/package/node-emoji) - Simple emoji support
* [twitter](https://www.npmjs.com/package/twitter) - Twitter API client library 
* [dotenv](https://www.npmjs.com/package/dotenv) - Storing configuration in the environment 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details