var i2c = require('./build/Release/i2c');

i2c.write(0x18, 0x6e);
i2c.write(0x18, 0x22);
i2c.write(0x18, 0x22);
i2c.write(0x18, 0x22);