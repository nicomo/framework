(function(window) {
  var Share = function() {
    this.onshow = null;
    this.onhide = null;
  }
 
  Share.prototype = {

    triggerActionSheet: function(imageName) {
      cordova.exec(null, null, "SharePlugin", "triggerActionSheet", [imageName]);
    },

  };
 
  cordova.addConstructor(function() {
    window.share = new Share();
  });
})(window);