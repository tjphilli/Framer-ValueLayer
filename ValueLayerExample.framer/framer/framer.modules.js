require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ValueLayer":[function(require,module,exports){
var ValueLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ValueLayer = (function(superClass) {
  extend(ValueLayer, superClass);

  function ValueLayer(options) {
    var ref, ref1, ref2;
    this.formatString = (ref = options.formatString) != null ? ref : function(v) {
      return v;
    };
    this._value = (ref1 = options.value) != null ? ref1 : 0;
    this._rounding = (ref2 = options.rounding) != null ? ref2 : 0;
    ValueLayer.__super__.constructor.call(this, options);
  }

  ValueLayer.define("value", {
    get: function() {
      return this._value;
    },
    set: function(v) {
      this._value = this._rounding === false ? v : Utils.round(v, this._rounding);
      this.emit("change:value", this._value);
      return this.html = this.formatString(this._value);
    }
  });

  ValueLayer.prototype.interpolate = function(v, animationOptions, callback) {
    var _callback, argument, i, len, parent, proxy;
    if (Number(v) === this._value) {
      return;
    }
    _callback = null;
    for (i = 0, len = arguments.length; i < len; i++) {
      argument = arguments[i];
      if (_.isFunction(argument)) {
        _callback = argument;
      }
    }
    parent = this;
    proxy = new Layer({
      name: this.name + "proxy",
      parent: this,
      height: 1,
      width: 1,
      x: -9999,
      opacity: 0,
      y: parent.value
    });
    proxy.onAnimationEnd(function() {
      if (_callback != null) {
        _callback();
      }
      this.destroy();
      return parent.emit("interpolationFinished", parent._value);
    });
    if (animationOptions == null) {
      animationOptions = {
        time: 0.4,
        curve: "ease-in-out"
      };
    }
    animationOptions.properties = {
      y: v
    };
    proxy.on("change:y", function() {
      return parent.value = this.y;
    });
    return proxy.animate(animationOptions);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycGhpbGxpcHBpL0Rldi9GcmFtZXItVmFsdWVMYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9WYWx1ZUxheWVyLmNvZmZlZSIsIi9Vc2Vycy90cmV2b3JwaGlsbGlwcGkvRGV2L0ZyYW1lci1WYWx1ZUxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0tBLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7O0VBQ1Msb0JBQUMsT0FBRDtBQUdYLFFBQUE7SUFBQSxJQUFDLENBQUEsWUFBRCxnREFBdUMsU0FBQyxDQUFEO2FBQU87SUFBUDtJQUN2QyxJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLFNBQUQsOENBQWdDO0lBRWhDLDRDQUFNLE9BQU47RUFQVzs7RUFTYixVQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLENBQUQ7TUFFSCxJQUFDLENBQUEsTUFBRCxHQUFhLElBQUMsQ0FBQSxTQUFELEtBQWMsS0FBakIsR0FBNEIsQ0FBNUIsR0FBbUMsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsSUFBQyxDQUFBLFNBQWhCO01BQzdDLElBQUMsQ0FBQSxJQUFELENBQU0sY0FBTixFQUFzQixJQUFDLENBQUEsTUFBdkI7YUFFQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLE1BQWY7SUFMTCxDQURMO0dBREY7O3VCQVNBLFdBQUEsR0FBYSxTQUFDLENBQUQsRUFBSSxnQkFBSixFQUFzQixRQUF0QjtBQUVYLFFBQUE7SUFBQSxJQUFHLE1BQUEsQ0FBTyxDQUFQLENBQUEsS0FBYSxJQUFDLENBQUEsTUFBakI7QUFBNkIsYUFBN0I7O0lBR0EsU0FBQSxHQUFZO0FBR1osU0FBQSwyQ0FBQTs7TUFFRSxJQUFHLENBQUMsQ0FBQyxVQUFGLENBQWEsUUFBYixDQUFIO1FBQStCLFNBQUEsR0FBWSxTQUEzQzs7QUFGRjtJQU1BLE1BQUEsR0FBUztJQUlULEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDVjtNQUFBLElBQUEsRUFBUyxJQUFDLENBQUEsSUFBRixHQUFPLE9BQWY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLE1BQUEsRUFBUSxDQUZSO01BRVcsS0FBQSxFQUFPLENBRmxCO01BRXFCLENBQUEsRUFBRyxDQUFDLElBRnpCO01BR0EsT0FBQSxFQUFTLENBSFQ7TUFJQSxDQUFBLEVBQUcsTUFBTSxDQUFDLEtBSlY7S0FEVTtJQU9aLEtBQUssQ0FBQyxjQUFOLENBQXFCLFNBQUE7TUFDbkIsSUFBRyxpQkFBSDtRQUFtQixTQUFBLENBQUEsRUFBbkI7O01BQ0EsSUFBQyxDQUFDLE9BQUYsQ0FBQTthQUNBLE1BQU0sQ0FBQyxJQUFQLENBQVksdUJBQVosRUFBcUMsTUFBTSxDQUFDLE1BQTVDO0lBSG1CLENBQXJCOztNQU1BLG1CQUNFO1FBQUEsSUFBQSxFQUFNLEdBQU47UUFDQSxLQUFBLEVBQU8sYUFEUDs7O0lBRUYsZ0JBQWdCLENBQUMsVUFBakIsR0FDRTtNQUFBLENBQUEsRUFBRyxDQUFIOztJQUdGLEtBQUssQ0FBQyxFQUFOLENBQVMsVUFBVCxFQUFxQixTQUFBO2FBQ25CLE1BQU0sQ0FBQyxLQUFQLEdBQWUsSUFBQyxDQUFDO0lBREUsQ0FBckI7V0FJQSxLQUFLLENBQUMsT0FBTixDQUFjLGdCQUFkO0VBMUNXOzs7O0dBbkJVOztBQStEekIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7Ozs7QUNoRXJCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLlxuIyB7VmFsdWVMYXllcn0gPSByZXF1aXJlIFwiVmFsdWVMYXllclwiXG4jIGluc3RhbnRpYXRlIG5ldyBpbnN0YW5jZXMgd2l0aDogbmV3IFZhbHVlTGF5ZXJcblxuXG5jbGFzcyBWYWx1ZUxheWVyIGV4dGVuZHMgTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXG4gICAgIyBDb25maWd1cmUgaW5zdGFuY2UgdmFyaWFibGUgZGVmYXVsdHNcbiAgICBAZm9ybWF0U3RyaW5nID0gb3B0aW9ucy5mb3JtYXRTdHJpbmcgPyAodikgLT4gdlxuICAgIEBfdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gMFxuICAgIEBfcm91bmRpbmcgPSBvcHRpb25zLnJvdW5kaW5nID8gMFxuXG4gICAgc3VwZXIgb3B0aW9uc1xuXG4gIEBkZWZpbmUgXCJ2YWx1ZVwiLFxuICAgIGdldDogLT4gQF92YWx1ZVxuICAgIHNldDogKHYpIC0+XG4gICAgICAjIFJvdW5kIHRoZSB2YWx1ZSBpZiByb3VuZGluZyBpcyBlbmFibGVkXG4gICAgICBAX3ZhbHVlID0gaWYgQF9yb3VuZGluZyA9PSBmYWxzZSB0aGVuIHYgZWxzZSBVdGlscy5yb3VuZCh2LCBAX3JvdW5kaW5nKVxuICAgICAgQGVtaXQoXCJjaGFuZ2U6dmFsdWVcIiwgQF92YWx1ZSlcblxuICAgICAgQGh0bWwgPSBAZm9ybWF0U3RyaW5nKEBfdmFsdWUpXG5cbiAgaW50ZXJwb2xhdGU6ICh2LCBhbmltYXRpb25PcHRpb25zLCBjYWxsYmFjaykgLT5cbiAgICAjIElmIHRoZSBkZXN0aW5hdGlvbiB2YWx1ZSBpcyBjdXJyZW50IHZhbHVlLCBleGl0XG4gICAgaWYgTnVtYmVyKHYpID09IEBfdmFsdWUgdGhlbiByZXR1cm5cblxuICAgICMgQ3JlYXRlIGEgc2VwYXJhdGUgY2FsbGJhY2sgdmFyaWFibGUgc28gd2UgaGF2ZSBmbGV4aWJpbGl0eSBpbiBhcmd1bWVudCBvcmRlclxuICAgIF9jYWxsYmFjayA9IG51bGxcblxuICAgICMgQ2hlY2sgaWYgYSBjYWxsYmFjayBpcyBzdXBwbGllZCBpbiB0aGUgMm5kIG9yIDNyZCBhcmd1bWVudHNcbiAgICBmb3IgYXJndW1lbnQgaW4gYXJndW1lbnRzXG4gICAgICAjIFN0b3JlIHRoZSBhcmd1bWVudCBpZiBpdCdzIGEgZnVuY3Rpb24sIGludGVuZGVkIGFzIGNhbGxiYWNrXG4gICAgICBpZiBfLmlzRnVuY3Rpb24oYXJndW1lbnQpIHRoZW4gX2NhbGxiYWNrID0gYXJndW1lbnRcblxuXG4gICAgIyBTdG9yZSByZWZlcmVuY2UgdG8gaW5zdGFuY2UsIHRvIHJlZmVyZW5jZSB3aGVuIHNjb3BlIGNoYW5nZXNcbiAgICBwYXJlbnQgPSBAXG5cblxuICAgICMgQ3JlYXRlIGEgcHJveHkgbGF5ZXIgdG8gYW5pbWF0ZSBpdHMgeSBwb3NpdGlvblxuICAgIHByb3h5ID0gbmV3IExheWVyXG4gICAgICBuYW1lOiBcIiN7QG5hbWV9cHJveHlcIlxuICAgICAgcGFyZW50OiBAXG4gICAgICBoZWlnaHQ6IDEsIHdpZHRoOiAxLCB4OiAtOTk5OVxuICAgICAgb3BhY2l0eTogMFxuICAgICAgeTogcGFyZW50LnZhbHVlXG5cbiAgICBwcm94eS5vbkFuaW1hdGlvbkVuZCAtPlxuICAgICAgaWYgX2NhbGxiYWNrPyB0aGVuIF9jYWxsYmFjaygpXG4gICAgICBALmRlc3Ryb3koKVxuICAgICAgcGFyZW50LmVtaXQoXCJpbnRlcnBvbGF0aW9uRmluaXNoZWRcIiwgcGFyZW50Ll92YWx1ZSlcblxuICAgICMgSWYgYW5pbWF0aW9uT3B0aW9ucyBhcmVuJ3Qgc3VwcGxpZWQgYXMgYW4gYXJndW1lbnQsIGFwcGx5IHNvbWUgZGVmYXVsdHNcbiAgICBhbmltYXRpb25PcHRpb25zID89XG4gICAgICB0aW1lOiAwLjRcbiAgICAgIGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcbiAgICBhbmltYXRpb25PcHRpb25zLnByb3BlcnRpZXMgPVxuICAgICAgeTogdlxuXG4gICAgIyBFdmVyeSB0aW1lIHRoZSBwcm94eSdzIHkgY2hhbmdlLCB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBpbnN0YW5jZVxuICAgIHByb3h5Lm9uIFwiY2hhbmdlOnlcIiwgLT5cbiAgICAgIHBhcmVudC52YWx1ZSA9IEAueVxuXG4gICAgIyBUcmlnZ2VyIHRoZSBhbmltYXRpb25cbiAgICBwcm94eS5hbmltYXRlIGFuaW1hdGlvbk9wdGlvbnNcblxuZXhwb3J0cy5WYWx1ZUxheWVyID0gVmFsdWVMYXllclxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
