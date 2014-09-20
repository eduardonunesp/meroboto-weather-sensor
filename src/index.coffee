meroboto = require '../../meroboto/lib/'
weather = require 'weather-js'
debug = true if process.env.WEATHER_ROBOT_DEBUG is 'true'

module.exports = 
  class Weather extends meroboto.Sensor
    constructor: (@name, @timeInterval, @city, @degreeType = 'C') ->
      super @name, @timeInterval

    update: ->
      @lock = true
      conf = 
        search : @city 
        degreeType : @degreeType

      weather.find conf, (err, result) =>
        try
          throw err.toString() if err
          @fn = -> 
            @lock = false
            result[0].current.temperature
        catch error
          @fn false
        finally
          super()