(function(window) {
  var Pinterest = function() {
    this.onshow = null;
    this.onhide = null;
  }
 
  Pinterest.prototype = {

    initPin: function(clientID) {
      cordova.exec(null, null, "PinterestPlugin", "initPin", [clientID]);
    },

    canPin: function(callback) {
      cordova.exec(callback, null, "PinterestPlugin", "canPin", []);
    },

    composePin: function(imageURL, sourceURL, descriptionText) {
      cordova.exec(null, null, "PinterestPlugin", "composePin", [imageURL, sourceURL, descriptionText]);
    },

  };
 
  cordova.addConstructor(function() {
    window.pinterest = new Pinterest();
  });
})(window);