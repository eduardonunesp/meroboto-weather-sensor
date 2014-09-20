var assert = require('assert')
  , meroboto = require('meroboto')
  , util = require('util')
  , weatherSensor = require('../lib');

describe('Weather Sensor Lab Test, BIP!', function(){
  describe('Basic Test', function(){
    it('Should get the weather', function(done){
      this.timeout(5000);
      var robot = new meroboto.Robot('robot-1');
      var sensor = new weatherSensor('weather-sensor-1', 10, 'São Paulo');
      var count = 0;
      var action = new meroboto.Action('action-1', function(data) {
        assert.notEqual(null, data);
        assert.notEqual(undefined, data);
        if (count > 2) {
          sensor.stop();
          done();
        } else {
          count++;
        }
      });
      robot.combine(sensor, action);
    });
  });
})