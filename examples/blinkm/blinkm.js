var FADE_TO_HSB, FADE_TO_RGB, GET_ADDRESS, GET_RGB, GET_VERSION, PLAY_SCRIPT, Pixel, READ_SCRIPT, SET_ADDRESS, SET_FADE, STOP_SCRIPT, TO_RGB, WRITE_SCRIPT, Wire, _;

Wire = require('i2c');

_ = require('underscore');

TO_RGB = 0x6e;

GET_RGB = 0x67;

FADE_TO_RGB = 0x63;

FADE_TO_HSB = 0x68;

GET_ADDRESS = 0x61;

SET_ADDRESS = 0x41;

SET_FADE = 0x66;

GET_VERSION = 0x5a;

WRITE_SCRIPT = 0x57;

READ_SCRIPT = 0x52;

PLAY_SCRIPT = 0x70;

STOP_SCRIPT = 0x0f;

Pixel = (function() {
  Pixel.prototype.address = 0x01;

  function Pixel(address) {
    this.address = address;
    this.wire = new Wire(this.address);
  }

  Pixel.prototype.off = function() {
    return this.setRGB(0, 0, 0);
  };

  Pixel.prototype.getAddress = function(callback) {
    return this._read(GET_ADDRESS, 1, callback);
  };

  Pixel.prototype.getVersion = function(callback) {
    return this._read(GET_VERSION, 1, callback);
  };

  Pixel.prototype.setFadeSpeed = function(speed) {
    return this._send(SET_FADE, speed);
  };

  Pixel.prototype.setRGB = function(r, g, b) {
    return this._send(TO_RGB, [r, g, b]);
  };

  Pixel.prototype.getRGB = function(callback) {
    return setTimeout((function(_this) {
      return function() {
        return _this._read(GET_RGB, 3, callback);
      };
    })(this), 200);
  };

  Pixel.prototype.fadeToRGB = function(r, g, b) {
    return this._send(FADE_TO_RGB, [r, g, b]);
  };

  Pixel.prototype.fadeToHSB = function(h, s, b) {
    return this._send(FADE_TO_HSB, [h, s, b]);
  };

  Pixel.prototype._send = function(cmd, values) {
    return this.wire.writeBytes(cmd, values);
  };

  Pixel.prototype._read = function(cmd, length, callback) {
    return this.wire.readBytes(cmd, length, callback);
  };

  return Pixel;

})();

