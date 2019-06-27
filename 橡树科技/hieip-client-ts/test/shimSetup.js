global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 1);
};