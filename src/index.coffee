meroboto = require 'meroboto'
weather = require 'weather-js'
debug = true if process.env.WEATHER_ROBOT_DEBUG is 'true'

module.exports = 
  class Weather extends meroboto.Sensor
    constructor: (options) ->
      {@name, @timeInterval, @city, @degreeType} = options
      @degreeType ?= 'C'
      super
        name : @name
        timeInterval : @timeInterval

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
