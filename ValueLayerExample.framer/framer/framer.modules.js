require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ValueLayer":[function(require,module,exports){
var ValueLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ValueLayer = (function(superClass) {
  extend(ValueLayer, superClass);

  function ValueLayer(options) {
    var parent, ref, ref1, ref2;
    this.formatString = (ref = options.formatString) != null ? ref : function(v) {
      return v;
    };
    this._value = (ref1 = options.value) != null ? ref1 : 0;
    this._sigfigs = (ref2 = options.sigfigs) != null ? ref2 : 0;
    ValueLayer.__super__.constructor.call(this, options);
    parent = this;
    this.proxy = new Layer({
      name: this.name + "proxy",
      parent: this,
      height: 1,
      width: 1,
      backgroundColor: "red",
      opacity: 0,
      y: parent.value
    });
    this.proxy.onAnimationEnd(function() {
      if (parent.callback != null) {
        return parent.callback();
      }
    });
  }

  ValueLayer.define("value", {
    get: function() {
      return this._value;
    },
    set: function(v) {
      this._value = Utils.round(v, this._sigfigs);
      this.html = this.formatString(this._value);
      return this.emit("change:value", this._value);
    }
  });

  ValueLayer.prototype.interpolate = function(v, animationOptions, callback) {
    var argument, i, len, parent;
    if (Number(v) === this._value) {
      return;
    }
    for (i = 0, len = arguments.length; i < len; i++) {
      argument = arguments[i];
      if (_.isFunction(argument)) {
        this.callback = argument;
      }
    }
    parent = this;
    if (animationOptions == null) {
      animationOptions = {
        time: 0.4,
        curve: "ease-in-out"
      };
    }
    animationOptions.properties = {
      y: v
    };
    this.proxy.on("change:y", function() {
      return parent.value = Utils.round(this.y);
    });
    this.proxy.y = parent.value;
    return this.proxy.animate(animationOptions);
  };

  return ValueLayer;

})(Layer);

exports.ValueLayer = ValueLayer;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL1ZhbHVlTGF5ZXIuY29mZmVlIiwiL1VzZXJzL3RyZXZvcnAvZGV2L2ZyYW1lci12YWx1ZS1sYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNLQSxJQUFBLFVBQUE7RUFBQTs7O0FBQU07OztFQUNTLG9CQUFDLE9BQUQ7QUFDWCxRQUFBO0lBQUEsSUFBQyxDQUFBLFlBQUQsZ0RBQXVDLFNBQUMsQ0FBRDthQUFPO0lBQVA7SUFDdkMsSUFBQyxDQUFBLE1BQUQsMkNBQTBCO0lBQzFCLElBQUMsQ0FBQSxRQUFELDZDQUE4QjtJQUU5Qiw0Q0FBTSxPQUFOO0lBRUEsTUFBQSxHQUFTO0lBQ1QsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FDWDtNQUFBLElBQUEsRUFBUyxJQUFDLENBQUEsSUFBRixHQUFPLE9BQWY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLE1BQUEsRUFBUSxDQUZSO01BRVcsS0FBQSxFQUFPLENBRmxCO01BR0EsZUFBQSxFQUFpQixLQUhqQjtNQUlBLE9BQUEsRUFBUyxDQUpUO01BS0EsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUxWO0tBRFc7SUFPYixJQUFDLENBQUEsS0FBSyxDQUFDLGNBQVAsQ0FBc0IsU0FBQTtNQUNwQixJQUFHLHVCQUFIO2VBQXlCLE1BQU0sQ0FBQyxRQUFQLENBQUEsRUFBekI7O0lBRG9CLENBQXRCO0VBZlc7O0VBa0JiLFVBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNFO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsQ0FBRDtNQUNILElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsSUFBQyxDQUFBLFFBQWhCO01BQ1YsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxNQUFmO2FBQ1IsSUFBQyxDQUFBLElBQUQsQ0FBTSxjQUFOLEVBQXNCLElBQUMsQ0FBQSxNQUF2QjtJQUhHLENBREw7R0FERjs7dUJBT0EsV0FBQSxHQUFhLFNBQUMsQ0FBRCxFQUFJLGdCQUFKLEVBQXNCLFFBQXRCO0FBQ1gsUUFBQTtJQUFBLElBQUcsTUFBQSxDQUFPLENBQVAsQ0FBQSxLQUFhLElBQUMsQ0FBQSxNQUFqQjtBQUE2QixhQUE3Qjs7QUFDQSxTQUFBLDJDQUFBOztNQUNFLElBQUcsQ0FBQyxDQUFDLFVBQUYsQ0FBYSxRQUFiLENBQUg7UUFBK0IsSUFBQyxDQUFBLFFBQUQsR0FBWSxTQUEzQzs7QUFERjtJQUVBLE1BQUEsR0FBUzs7TUFFVCxtQkFDRTtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQ0EsS0FBQSxFQUFPLGFBRFA7OztJQUVGLGdCQUFnQixDQUFDLFVBQWpCLEdBQ0U7TUFBQSxDQUFBLEVBQUcsQ0FBSDs7SUFFRixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxVQUFWLEVBQXNCLFNBQUE7YUFDcEIsTUFBTSxDQUFDLEtBQVAsR0FBZSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsQ0FBQyxDQUFkO0lBREssQ0FBdEI7SUFHQSxJQUFDLENBQUEsS0FBSyxDQUFDLENBQVAsR0FBVyxNQUFNLENBQUM7V0FDbEIsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQWUsZ0JBQWY7RUFoQlc7Ozs7R0ExQlU7O0FBNEN6QixPQUFPLENBQUMsVUFBUixHQUFxQjs7OztBQzdDckIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uXG4jIHtWYWx1ZUxheWVyfSA9IHJlcXVpcmUgXCJWYWx1ZUxheWVyXCJcbiMgaW5zdGFudGlhdGUgbmV3IGluc3RhbmNlcyB3aXRoOiBuZXcgVmFsdWVMYXllclxuXG5cbmNsYXNzIFZhbHVlTGF5ZXIgZXh0ZW5kcyBMYXllclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG4gICAgQGZvcm1hdFN0cmluZyA9IG9wdGlvbnMuZm9ybWF0U3RyaW5nID8gKHYpIC0+IHZcbiAgICBAX3ZhbHVlID0gb3B0aW9ucy52YWx1ZSA/IDBcbiAgICBAX3NpZ2ZpZ3MgPSBvcHRpb25zLnNpZ2ZpZ3MgPyAwXG5cbiAgICBzdXBlciBvcHRpb25zXG5cbiAgICBwYXJlbnQgPSBAXG4gICAgQHByb3h5ID0gbmV3IExheWVyXG4gICAgICBuYW1lOiBcIiN7QG5hbWV9cHJveHlcIlxuICAgICAgcGFyZW50OiBAXG4gICAgICBoZWlnaHQ6IDEsIHdpZHRoOiAxXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcbiAgICAgIG9wYWNpdHk6IDBcbiAgICAgIHk6IHBhcmVudC52YWx1ZVxuICAgIEBwcm94eS5vbkFuaW1hdGlvbkVuZCAtPlxuICAgICAgaWYgcGFyZW50LmNhbGxiYWNrPyB0aGVuIHBhcmVudC5jYWxsYmFjaygpXG5cbiAgQGRlZmluZSBcInZhbHVlXCIsXG4gICAgZ2V0OiAtPiBAX3ZhbHVlXG4gICAgc2V0OiAodikgLT5cbiAgICAgIEBfdmFsdWUgPSBVdGlscy5yb3VuZCh2LCBAX3NpZ2ZpZ3MpXG4gICAgICBAaHRtbCA9IEBmb3JtYXRTdHJpbmcoQF92YWx1ZSlcbiAgICAgIEBlbWl0KFwiY2hhbmdlOnZhbHVlXCIsIEBfdmFsdWUpXG5cbiAgaW50ZXJwb2xhdGU6ICh2LCBhbmltYXRpb25PcHRpb25zLCBjYWxsYmFjaykgLT5cbiAgICBpZiBOdW1iZXIodikgPT0gQF92YWx1ZSB0aGVuIHJldHVyblxuICAgIGZvciBhcmd1bWVudCBpbiBhcmd1bWVudHNcbiAgICAgIGlmIF8uaXNGdW5jdGlvbihhcmd1bWVudCkgdGhlbiBAY2FsbGJhY2sgPSBhcmd1bWVudFxuICAgIHBhcmVudCA9IEBcblxuICAgIGFuaW1hdGlvbk9wdGlvbnMgPz1cbiAgICAgIHRpbWU6IDAuNFxuICAgICAgY3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuICAgIGFuaW1hdGlvbk9wdGlvbnMucHJvcGVydGllcyA9XG4gICAgICB5OiB2XG5cbiAgICBAcHJveHkub24gXCJjaGFuZ2U6eVwiLCAtPlxuICAgICAgcGFyZW50LnZhbHVlID0gVXRpbHMucm91bmQoQC55KVxuXG4gICAgQHByb3h5LnkgPSBwYXJlbnQudmFsdWVcbiAgICBAcHJveHkuYW5pbWF0ZSBhbmltYXRpb25PcHRpb25zXG5cbmV4cG9ydHMuVmFsdWVMYXllciA9IFZhbHVlTGF5ZXJcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
