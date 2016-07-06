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
    this._rounding = (ref2 = options.rounding) != null ? ref2 : 0;
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
      this._value = this._rounding === false ? v : Utils.round(v, this._rounding);
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
      return parent.value = this.y;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycGhpbGxpcHBpL0Rldi9GcmFtZXItVmFsdWVMYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9WYWx1ZUxheWVyLmNvZmZlZSIsIi9Vc2Vycy90cmV2b3JwaGlsbGlwcGkvRGV2L0ZyYW1lci1WYWx1ZUxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0tBLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7O0VBQ1Msb0JBQUMsT0FBRDtBQUNYLFFBQUE7SUFBQSxJQUFDLENBQUEsWUFBRCxnREFBdUMsU0FBQyxDQUFEO2FBQU87SUFBUDtJQUN2QyxJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLFNBQUQsOENBQWdDO0lBRWhDLDRDQUFNLE9BQU47SUFFQSxNQUFBLEdBQVM7SUFDVCxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUNYO01BQUEsSUFBQSxFQUFTLElBQUMsQ0FBQSxJQUFGLEdBQU8sT0FBZjtNQUNBLE1BQUEsRUFBUSxJQURSO01BRUEsTUFBQSxFQUFRLENBRlI7TUFFVyxLQUFBLEVBQU8sQ0FGbEI7TUFHQSxlQUFBLEVBQWlCLEtBSGpCO01BSUEsT0FBQSxFQUFTLENBSlQ7TUFLQSxDQUFBLEVBQUcsTUFBTSxDQUFDLEtBTFY7S0FEVztJQU9iLElBQUMsQ0FBQSxLQUFLLENBQUMsY0FBUCxDQUFzQixTQUFBO01BQ3BCLElBQUcsdUJBQUg7ZUFBeUIsTUFBTSxDQUFDLFFBQVAsQ0FBQSxFQUF6Qjs7SUFEb0IsQ0FBdEI7RUFmVzs7RUFrQmIsVUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0U7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxDQUFEO01BQ0gsSUFBQyxDQUFBLE1BQUQsR0FBYSxJQUFDLENBQUEsU0FBRCxLQUFjLEtBQWpCLEdBQTRCLENBQTVCLEdBQW1DLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLElBQUMsQ0FBQSxTQUFoQjtNQUM3QyxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLE1BQWY7YUFDUixJQUFDLENBQUEsSUFBRCxDQUFNLGNBQU4sRUFBc0IsSUFBQyxDQUFBLE1BQXZCO0lBSEcsQ0FETDtHQURGOzt1QkFPQSxXQUFBLEdBQWEsU0FBQyxDQUFELEVBQUksZ0JBQUosRUFBc0IsUUFBdEI7QUFDWCxRQUFBO0lBQUEsSUFBRyxNQUFBLENBQU8sQ0FBUCxDQUFBLEtBQWEsSUFBQyxDQUFBLE1BQWpCO0FBQTZCLGFBQTdCOztBQUNBLFNBQUEsMkNBQUE7O01BQ0UsSUFBRyxDQUFDLENBQUMsVUFBRixDQUFhLFFBQWIsQ0FBSDtRQUErQixJQUFDLENBQUEsUUFBRCxHQUFZLFNBQTNDOztBQURGO0lBRUEsTUFBQSxHQUFTOztNQUVULG1CQUNFO1FBQUEsSUFBQSxFQUFNLEdBQU47UUFDQSxLQUFBLEVBQU8sYUFEUDs7O0lBRUYsZ0JBQWdCLENBQUMsVUFBakIsR0FDRTtNQUFBLENBQUEsRUFBRyxDQUFIOztJQUVGLElBQUMsQ0FBQSxLQUFLLENBQUMsRUFBUCxDQUFVLFVBQVYsRUFBc0IsU0FBQTthQUNwQixNQUFNLENBQUMsS0FBUCxHQUFlLElBQUMsQ0FBQztJQURHLENBQXRCO0lBR0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxDQUFQLEdBQVcsTUFBTSxDQUFDO1dBQ2xCLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlLGdCQUFmO0VBaEJXOzs7O0dBMUJVOztBQTRDekIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7Ozs7QUM3Q3JCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLlxuIyB7VmFsdWVMYXllcn0gPSByZXF1aXJlIFwiVmFsdWVMYXllclwiXG4jIGluc3RhbnRpYXRlIG5ldyBpbnN0YW5jZXMgd2l0aDogbmV3IFZhbHVlTGF5ZXJcblxuXG5jbGFzcyBWYWx1ZUxheWVyIGV4dGVuZHMgTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuICAgIEBmb3JtYXRTdHJpbmcgPSBvcHRpb25zLmZvcm1hdFN0cmluZyA/ICh2KSAtPiB2XG4gICAgQF92YWx1ZSA9IG9wdGlvbnMudmFsdWUgPyAwXG4gICAgQF9yb3VuZGluZyA9IG9wdGlvbnMucm91bmRpbmcgPyAwXG5cbiAgICBzdXBlciBvcHRpb25zXG5cbiAgICBwYXJlbnQgPSBAXG4gICAgQHByb3h5ID0gbmV3IExheWVyXG4gICAgICBuYW1lOiBcIiN7QG5hbWV9cHJveHlcIlxuICAgICAgcGFyZW50OiBAXG4gICAgICBoZWlnaHQ6IDEsIHdpZHRoOiAxXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcbiAgICAgIG9wYWNpdHk6IDBcbiAgICAgIHk6IHBhcmVudC52YWx1ZVxuICAgIEBwcm94eS5vbkFuaW1hdGlvbkVuZCAtPlxuICAgICAgaWYgcGFyZW50LmNhbGxiYWNrPyB0aGVuIHBhcmVudC5jYWxsYmFjaygpXG5cbiAgQGRlZmluZSBcInZhbHVlXCIsXG4gICAgZ2V0OiAtPiBAX3ZhbHVlXG4gICAgc2V0OiAodikgLT5cbiAgICAgIEBfdmFsdWUgPSBpZiBAX3JvdW5kaW5nID09IGZhbHNlIHRoZW4gdiBlbHNlIFV0aWxzLnJvdW5kKHYsIEBfcm91bmRpbmcpXG4gICAgICBAaHRtbCA9IEBmb3JtYXRTdHJpbmcoQF92YWx1ZSlcbiAgICAgIEBlbWl0KFwiY2hhbmdlOnZhbHVlXCIsIEBfdmFsdWUpXG5cbiAgaW50ZXJwb2xhdGU6ICh2LCBhbmltYXRpb25PcHRpb25zLCBjYWxsYmFjaykgLT5cbiAgICBpZiBOdW1iZXIodikgPT0gQF92YWx1ZSB0aGVuIHJldHVyblxuICAgIGZvciBhcmd1bWVudCBpbiBhcmd1bWVudHNcbiAgICAgIGlmIF8uaXNGdW5jdGlvbihhcmd1bWVudCkgdGhlbiBAY2FsbGJhY2sgPSBhcmd1bWVudFxuICAgIHBhcmVudCA9IEBcblxuICAgIGFuaW1hdGlvbk9wdGlvbnMgPz1cbiAgICAgIHRpbWU6IDAuNFxuICAgICAgY3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuICAgIGFuaW1hdGlvbk9wdGlvbnMucHJvcGVydGllcyA9XG4gICAgICB5OiB2XG5cbiAgICBAcHJveHkub24gXCJjaGFuZ2U6eVwiLCAtPlxuICAgICAgcGFyZW50LnZhbHVlID0gQC55XG5cbiAgICBAcHJveHkueSA9IHBhcmVudC52YWx1ZVxuICAgIEBwcm94eS5hbmltYXRlIGFuaW1hdGlvbk9wdGlvbnNcblxuZXhwb3J0cy5WYWx1ZUxheWVyID0gVmFsdWVMYXllclxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
