function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var Vec = function (x, y) {
  this.x = x;
  this.y = y;
};

var posToBlock = function(pos){
  return new Vec(Math.floor(pos.x),Math.floor(pos.y));
}