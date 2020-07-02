require('dotenv').config();
require('./src/util/env');

const schedule = require('node-schedule');
const Twitter = require('twitter');
const emoji = require('node-emoji')

const Forecasting = require('./src/services/forecasting');
const Email = require('./src/services/email');

const STATE_SKIES_EMOJIS = require('./src/var/state-skies-emojis');



// global variables
const MONTH_NAMES = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

const TIME_RANGE = { "madrugada": "00:00-06:00", "mañana": "06:00-12:00", "tarde": "12:00-18:00", "noche": "18:00-24:00" };


// twitter client
const twClient = new Twitter({
  consumer_key: process.env.TW_CONSUMER_KEY,
  consumer_secret: process.env.TW_CONSUMER_SECRET,
  access_token_key: process.env.TW_TOKEN_KEY,
  access_token_secret: process.env.TW_TOKEN_SECRET 
});

// FORCE FUNCTION WHEN NEEDED, npm run force
if (process.env.FORCE_RUN) {
  tweet();

  return;
}

schedule.scheduleJob('0 0 17 * * *', async () => {
  tweet();
});

async function tweet() {
  try {
    console.log(new Date().toString());
    console.log('Running Asturias Weather Sender');

    // tomorrow date
    const tomorrowDate = getTomorrowDate();
    const tomDay = tomorrowDate.getDate();
    const tomMonth = MONTH_NAMES[tomorrowDate.getMonth()];

    // get forecastings' data
    const forecastings = await Forecasting.getFromDB();
    
    // create new forecastings tweets
    for await (let forecast of forecastings) {
      console.log(forecast.municipalityName);
      const msgHeader = `El tiempo para mañana ${tomDay} de ${tomMonth} en #${forecast.municipalityName}:`;

      console.log('DAWN - ' + forecast.stateSkies[3].descripcion);
      const msgDawn = `${emoji.get('stopwatch')}${TIME_RANGE['madrugada']} ${emoji.get('thermometer')}${forecast.temperatures[0].value}ºC  ${emoji.get(STATE_SKIES_EMOJIS[forecast.stateSkies[3].descripcion])} ${forecast.precipitations[3].value}%`;

      console.log('MORNING - ' + forecast.stateSkies[4].descripcion);
      const msgMorning = `${emoji.get('stopwatch')}${TIME_RANGE['mañana']} ${emoji.get('thermometer')}${forecast.temperatures[1].value}ºC  ${emoji.get(STATE_SKIES_EMOJIS[forecast.stateSkies[4].descripcion])} ${forecast.precipitations[4].value}%`;

      console.log('AFTERNOON- ' + forecast.stateSkies[5].descripcion);
      const msgAfternoon = `${emoji.get('stopwatch')}${TIME_RANGE['tarde']} ${emoji.get('thermometer')}${forecast.temperatures[2].value}ºC  ${emoji.get(STATE_SKIES_EMOJIS[forecast.stateSkies[5].descripcion])} ${forecast.precipitations[5].value}%`;

      console.log('NIGHT- ' + forecast.stateSkies[6].descripcion);
      const msgNight = `${emoji.get('stopwatch')}${TIME_RANGE['noche']} ${emoji.get('thermometer')}${forecast.temperatures[3].value}ºC  ${emoji.get(STATE_SKIES_EMOJIS[forecast.stateSkies[6].descripcion])} ${forecast.precipitations[6].value}%`;

      // message completed
      const msgComplete = `${msgHeader}\n\n   ${msgDawn}\n   ${msgMorning}\n   ${msgAfternoon}\n   ${msgNight}`;

      await twClient.post('statuses/update', { status: msgComplete });
    }

  } catch (err) {
    // notify error with email
    msg = {
      subject: 'ERROR WAS THROW IN ASTURIAS-WEATHER-BOT-SENDER',
      text: err.toString()
    };
    
    Email.send(msg);

    // log error
    console.error(err);
  }
}

function getTomorrowDate() {
  let tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  return tomorrowDate;
}