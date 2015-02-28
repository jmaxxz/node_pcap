var Benchmark = require('benchmark');
var SlowBuffer = require('buffer').SlowBuffer;
var suite = new Benchmark.Suite;


var l4 = [1,2,3,4]
// add tests
suite.add('concat_4', function() {
  var x = l4[0] + '.' + l4[1] + '.' + l4[2] + '.' + l4[3];
})
.add('string.join', function() {
  var x = l4.join('.');
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