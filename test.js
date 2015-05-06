var test = require('tape');
var crossing = require('./interval-crossing');

var places = 15
var EPS = 1/(Math.pow(10, places));

test('center', function(t) {
  var r = crossing(
    [0, 1],
    function f(x) { return 1 - x * 2; }
  );

  t.equal(r, .5, 'right in the middle');
  t.end();
})

test('.25 in', function(t) {
  var r = crossing(
    [0, 1],
    function f(x) { return 1 - x * 4; }
  );

  t.equal(r, .25, 'right in the middle');
  t.end();
})

test('corner @ .5', function(t) {
  var r = crossing(
    [0, 1],
    function f(x) { return (x<=.5) ? 1 - x * 2 : x; }
  );

  t.equal(r, .5, 'right in the middle');
  t.end();
})

test('crossing at PI', function(t) {
  function f(x) {
    if (x === 0) {
      x=1e-10;
    }

    return Math.sin(x)/x;
  }
  var r = crossing([2, 3.2], f, EPS);
  t.equal((r).toFixed(places-1), Math.PI.toFixed(places-1), 'right on pi');
  t.end();
})
