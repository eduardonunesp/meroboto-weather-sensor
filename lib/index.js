var Weather, debug, meroboto, weather,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

meroboto = require('../../meroboto/lib/');

weather = require('weather-js');

if (process.env.WEATHER_ROBOT_DEBUG === 'true') {
  debug = true;
}

module.exports = Weather = (function(_super) {
  __extends(Weather, _super);

  function Weather(name, timeInterval, city, degreeType) {
    this.name = name;
    this.timeInterval = timeInterval;
    this.city = city;
    this.degreeType = degreeType != null ? degreeType : 'C';
    Weather.__super__.constructor.call(this, this.name, this.timeInterval);
  }

  Weather.prototype.update = function() {
    var conf;
    this.lock = true;
    conf = {
      search: this.city,
      degreeType: this.degreeType
    };
    return weather.find(conf, (function(_this) {
      return function(err, result) {
        var error;
        try {
          if (err) {
            throw err.toString();
          }
          return _this.fn = function() {
            this.lock = false;
            return result[0].current.temperature;
          };
        } catch (_error) {
          error = _error;
          return _this.fn(false);
        } finally {
          Weather.__super__.update.call(_this);
        }
      };
    })(this));
  };

  return Weather;

})(meroboto.Sensor);
