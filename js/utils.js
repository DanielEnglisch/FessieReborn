function inherits (ctor, superCtor) {
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

function transpose(a) {
  
      // Calculate the width and height of the Array
      var w = a.length || 0;
      var h = a[0] instanceof Array ? a[0].length : 0;
  
      // In case it is a zero matrix, no transpose routine needed.
      if (h === 0 || w === 0) {
          return [];
      }
  
      /**
       * @var {Number} i Counter
       * @var {Number} j Counter
       * @var {Array} t Transposed data is stored in this array.
       */
      var i, j, t = [];
  
      // Loop through every item in the outer array (height)
      for (i = 0; i < h; i++) {
  
          // Insert a new row (array)
          t[i] = [];
  
          // Loop through every item per item in outer array (width)
          for (j = 0; j < w; j++) {
  
              // Save transposed data.
              t[i][j] = a[j][i];
          }
      }
  
      return t;
  }

  
function readTextFile(file) {
  var allText = null;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
              allText = rawFile.responseText;
          }
      }
  }
  rawFile.send(null);
  return allText;
}
