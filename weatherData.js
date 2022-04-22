const request = require('request')
const constants = require('./config')
const {response} = require("express");

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.URL + encodeURIComponent(address) + `&appid=` + constants.openWeatherMap.secretKey
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        // console.log("code",body.code)
        if (error) {
            callback(`Can't fetch data`, undefined)
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name,
                humidity: body.main.humidity
            })
        }
    })
}
module.exports = weatherData