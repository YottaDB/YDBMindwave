var Mindwave = require('mindwave');
var mw = new Mindwave();
var _ = require('lodash');
var gtm = require('nodem');
var db = new gtm.Gtm();
var deviceId = 1;

db.open();
console.log("Starting MindWave Process...")

mw.on('eeg', function(eeg) {
  var node, ret;
  var date = new Date().getTime();

  _.each(eeg, function(value, key) {
    node = {
      global: 'MindWave',
      subscripts: [deviceId, date, key],
      data: value
    };
    ret = db.set(node);
  });
});

mw.on('attention', function(attention) {
  if(attention) {
    var node, ret
    var date = new Date().getTime();
    
    node = {
      global: 'MindWave',
      subscripts: [deviceId, date, 'attention'],
      data: attention
    };
    ret = db.set(node);
  }
});

mw.on('meditation', function(meditation) {
  if(meditation) {
    var node;
    var ret;
    var date = new Date().getTime();

    node = {
      global: 'MindWave',
      subscripts: [deviceId, date, 'meditation'],
      data: meditation
    };
    ret = db.set(node);
  }
});

process.on('SIGINT', function() {
    db.close();
    console.log('CTRL-C Pressed Exiting...');
    process.exit(0);
});

mw.connect('/dev/rfcomm0');
