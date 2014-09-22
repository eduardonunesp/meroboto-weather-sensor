var assert = require('assert')
  , meroboto = require('meroboto/lib')
  , util = require('util')
  , weatherSensor = require('../lib');

describe('Weather Sensor Lab Test, BIP!', function(){
  describe('Basic Test', function(){
    it('Should get the weather', function(done){
      this.timeout(5000);
      var robot = new meroboto.Robot();
      var sensor = new weatherSensor({
        name: 'weather-sensor-1', 
        timeInterval: 10, 
        city: 'São Paulo'}
      );
      var count = 0;
      var action = new meroboto.Action({
        name: 'action-1', 
        fn: function(data) {
          assert.notEqual(null, data);
          assert.notEqual(undefined, data);
          if (count > 2) {
            sensor.stop();
            done();
          } else {
            count++;
          }
        }
      });
      robot.combine('combine-', new meroboto.Combine({
        sensor:sensor, 
        action:action
      }));
    });
  });
})