const request = require('request')


const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/5313af9d9a77df2b8b8cdbbc6a434d38/${lat},${long}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather services!', undefined);
    } else if(body.error) {
      callback('Unable to find location! Try again.', undefined);
    } else {
      callback(undefined, `${body.daily.data[0].summary} Trenutno je ${body.currently.temperature} stepeni Celzijusa uz ${body.currently.precipProbability}% mogućnosti padavina.
      Najniža temperatura danas je ${body.daily.data[0].temperatureLow}.
      Najviša temperatura danas je ${body.daily.data[0].temperatureHigh}.`);
    }
  })
}


module.exports = forecast;