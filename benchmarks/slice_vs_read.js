var Benchmark = require('benchmark');
var SlowBuffer = require('buffer').SlowBuffer;

var suite = new Benchmark.Suite;
var buffer = new Buffer("010203040506", "hex");
// add tests
suite.add('buffer#index', function() {
  var x = [];
  x[0] = buffer[0];
  x[1] = buffer[1];
  x[2] = buffer[2];
  x[3] = buffer[3];
  x[4] = buffer[4];
  x[5] = buffer[5];
})
.add('buffer#slice', function() {
  var x = buffer.slice(0,6);
})
.add('buffer#toString', function() {
  var x = buffer.toString();
})
.add('buffer#copy->slowbuffer', function() {
  var sb = new SlowBuffer(6)
  buffer.copy(sb, 0, 0, 6);
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
