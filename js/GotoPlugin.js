(function(window) {
  var Goto = function() {
    this.onshow = null;
    this.onhide = null;
  }
 
  Goto.prototype = {

    goto: function(target) {
      cordova.exec(null, null, "GotoPlugin", "goto", [target]);
    },

  };
 
  cordova.addConstructor(function() {
    window.gotoplugin = new Goto();
  });
})(window);