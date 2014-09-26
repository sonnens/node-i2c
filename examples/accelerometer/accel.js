var accelerometer, BANDWIDTH_BIT, BANDWIDTH_LENGTH, BW_25HZ, GET_ID, RANGE_2G, RANGE_BIT, RANGE_BWIDTH, RANGE_LENGTH, Wire, accel;

Wire = require('../../main');

RANGE_BWIDTH = 0x14;

RANGE_BIT = 0x04;

RANGE_LENGTH = 0x02;

RANGE_2G = 0x00;

BANDWIDTH_BIT = 0x02;

BANDWIDTH_LENGTH = 0x03;

BW_25HZ = 0x00;

GET_ID = 0x00;

Accelerometer = (function() {
  function Accelerometer(address) {
    this.address = address;
    this.wire = new Wire(this.address);
    this.setRange();
    this.setBandwidth();
    this.wire.on('data', function(data) {
      return console.log(data);
    });
  }

  Accelerometer.prototype.setRange = function() {
    return this.wire.write(RANGE_BWIDTH, [RANGE_BIT, RANGE_LENGTH, RANGE_2G], null);
  };

  Accelerometer.prototype.testConnection = function(callback) {
    return this.getDeviceID(function(err, data) {
      return data[0] === 0x2;
    });
  };

  Accelerometer.prototype.getDeviceID = function(callback) {
    return this.wire.read(GET_ID, 1, callback);
  };

  Accelerometer.prototype.setBandwidth = function() {
    return this.wire.write(RANGE_BWIDTH, [BANDWIDTH_BIT, BANDWIDTH_LENGTH, BW_25HZ], null);
  };

  Accelerometer.prototype.getHeading = function() {
    this.wire.write(0x0A, 0x1);
    return setTimeout((function(_this) {
      return function() {
        return _this.wire.read(0x03, 6, function(err, buffer) {
          var pos;
          pos = {
            x: (buffer[1] << 8) | buffer[0],
            y: (buffer[3] << 8) | buffer[2],
            z: (buffer[5] << 8) | buffer[4]
          };
          return console.log(pos);
        });
      };
    })(this), 10);
  };

  Accelerometer.prototype.getMotion = function() {
    return this.wire.stream(0x02, 6, 100);
  };

  return Accelerometer;

})();

accel = new Accelerometer(56);

accel.getHeading();

