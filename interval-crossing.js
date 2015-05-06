module.exports = crossing;

var abs = Math.abs;

function sign(i) {
  return i = (i>0) - (i<0);
}

function crossing(interval, fn) {

  var s = interval[0];
  var e = interval[1];

  var sv = fn(s);
  var ev = fn(e);

  var sentinal = 10;
  while (sentinal--) {

    var vd = sv - ev;
    var d = e - s;
    var r = d/vd;

    if (!isFinite(r)) {
      r = 0.5;
    }

    var n = s + d * r;
    var nv = fn(n);
    if (nv === 0) {
      return n;
    } else {
      if (sign(nv) !== sign(ev)) {
        s = n;
        sv = nv;
      } else if (sign(nv) !== sign(sv)) {
        e = n;
        ev = nv;
      }
    }
  }

}
