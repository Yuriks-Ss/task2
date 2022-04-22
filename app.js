const express = require('express')
const req = require('express/lib/request')
const app = express();
const hbs = require('hbs');
const path = require('path')

const weatherData = require('./weatherData')

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './views')
const partialsPath = path.join(__dirname, './partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicStaticDirPath))

app.get('/', (req, res) => {
    //res.send("route")
    res.render('index', {
        title: 'Weather'
    })
})
app.get('/weather', ((req, res) => {
    const address = req.query.address
    if (!address) {
        //console.log("add",address)
        return res.send({
            error: "Please enter a valid location to search weather"
        })
    }
    weatherData(address, (error, {temperature, description, cityName, humidity}) => {
        if (error) {
            return res.send({
                error
            })
        }
        //console.log(temperature, description, cityName, humidity)
        res.send({
            temperature,
            description,
            humidity,
            cityName
        })
    })
}))
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not Found'
    })
})
app.listen(port, () => {
    console.log("server run in port", port)
})