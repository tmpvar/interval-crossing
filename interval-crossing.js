module.exports = crossing;

var abs = Math.abs;
var max = Math.max;
var min = Math.min;
function sign(i) {
  return i = (i>0) - (i<0);
}

function crossing(interval, fn, eps) {
  var s = interval[0];
  var e = interval[1];

  var sv = fn(s);
  var ev = fn(e);

  var sentinal = 500;
  while (sentinal--) {

    var vd = max(sv, ev) - min(sv, ev);
    var d = max(e, s) - min(e, s);


    var r = min(d, vd) / max(d, vd);

    if (!isFinite(r) || min(d, vd) === 0) {
      r = 0.5;
    }

    var n = s + d * r;
    var nv = fn(n);
    if ((eps && abs(nv) < eps) || nv === 0) {
      return n;
    } else {
      if (sign(nv) !== sign(ev) && sign(nv) !== sign(sv)) {
        console.log('BOTH')
      } else if (sign(nv) !== sign(ev)) {
        s = n;
        sv = nv;
      } else if (sign(nv) !== sign(sv)) {
        e = n;
        ev = nv;
      } else {
        if (abs(sv) < abs(ev)) {
          e = n;
          ev = nv;
        } else {
          s = n;
          sv = nv;
        }
      }
    }
  }

}
