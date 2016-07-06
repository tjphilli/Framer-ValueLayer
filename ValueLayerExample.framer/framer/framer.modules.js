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
      this.html = this.formatString(this._value);
      return this.emit("change:value", this._value);
    }
  });

  ValueLayer.prototype.interpolate = function(v, animationOptions, callback) {
    var _callback, argument, i, len, parent, proxy;
    _callback = null;
    if (Number(v) === this._value) {
      return;
    }
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
      backgroundColor: "red",
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
    proxy.y = parent.value;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycGhpbGxpcHBpL0Rldi9GcmFtZXItVmFsdWVMYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9WYWx1ZUxheWVyLmNvZmZlZSIsIi9Vc2Vycy90cmV2b3JwaGlsbGlwcGkvRGV2L0ZyYW1lci1WYWx1ZUxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0tBLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7O0VBQ1Msb0JBQUMsT0FBRDtBQUNYLFFBQUE7SUFBQSxJQUFDLENBQUEsWUFBRCxnREFBdUMsU0FBQyxDQUFEO2FBQU87SUFBUDtJQUN2QyxJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLFNBQUQsOENBQWdDO0lBRWhDLDRDQUFNLE9BQU47RUFMVzs7RUFPYixVQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLENBQUQ7TUFDSCxJQUFDLENBQUEsTUFBRCxHQUFhLElBQUMsQ0FBQSxTQUFELEtBQWMsS0FBakIsR0FBNEIsQ0FBNUIsR0FBbUMsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsSUFBQyxDQUFBLFNBQWhCO01BQzdDLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsTUFBZjthQUNSLElBQUMsQ0FBQSxJQUFELENBQU0sY0FBTixFQUFzQixJQUFDLENBQUEsTUFBdkI7SUFIRyxDQURMO0dBREY7O3VCQU9BLFdBQUEsR0FBYSxTQUFDLENBQUQsRUFBSSxnQkFBSixFQUFzQixRQUF0QjtBQUNYLFFBQUE7SUFBQSxTQUFBLEdBQVk7SUFDWixJQUFHLE1BQUEsQ0FBTyxDQUFQLENBQUEsS0FBYSxJQUFDLENBQUEsTUFBakI7QUFBNkIsYUFBN0I7O0FBQ0EsU0FBQSwyQ0FBQTs7TUFDRSxJQUFHLENBQUMsQ0FBQyxVQUFGLENBQWEsUUFBYixDQUFIO1FBQStCLFNBQUEsR0FBWSxTQUEzQzs7QUFERjtJQUdBLE1BQUEsR0FBUztJQUVULEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDVjtNQUFBLElBQUEsRUFBUyxJQUFDLENBQUEsSUFBRixHQUFPLE9BQWY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLE1BQUEsRUFBUSxDQUZSO01BRVcsS0FBQSxFQUFPLENBRmxCO01BR0EsZUFBQSxFQUFpQixLQUhqQjtNQUlBLE9BQUEsRUFBUyxDQUpUO01BS0EsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUxWO0tBRFU7SUFRWixLQUFLLENBQUMsY0FBTixDQUFxQixTQUFBO01BQ25CLElBQUcsaUJBQUg7UUFBbUIsU0FBQSxDQUFBLEVBQW5COztNQUNBLElBQUMsQ0FBQyxPQUFGLENBQUE7YUFDQSxNQUFNLENBQUMsSUFBUCxDQUFZLHVCQUFaLEVBQXFDLE1BQU0sQ0FBQyxNQUE1QztJQUhtQixDQUFyQjs7TUFLQSxtQkFDRTtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQ0EsS0FBQSxFQUFPLGFBRFA7OztJQUVGLGdCQUFnQixDQUFDLFVBQWpCLEdBQ0U7TUFBQSxDQUFBLEVBQUcsQ0FBSDs7SUFFRixLQUFLLENBQUMsRUFBTixDQUFTLFVBQVQsRUFBcUIsU0FBQTthQUNuQixNQUFNLENBQUMsS0FBUCxHQUFlLElBQUMsQ0FBQztJQURFLENBQXJCO0lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxNQUFNLENBQUM7V0FDakIsS0FBSyxDQUFDLE9BQU4sQ0FBYyxnQkFBZDtFQS9CVzs7OztHQWZVOztBQWdEekIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7Ozs7QUNqRHJCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLlxuIyB7VmFsdWVMYXllcn0gPSByZXF1aXJlIFwiVmFsdWVMYXllclwiXG4jIGluc3RhbnRpYXRlIG5ldyBpbnN0YW5jZXMgd2l0aDogbmV3IFZhbHVlTGF5ZXJcblxuXG5jbGFzcyBWYWx1ZUxheWVyIGV4dGVuZHMgTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuICAgIEBmb3JtYXRTdHJpbmcgPSBvcHRpb25zLmZvcm1hdFN0cmluZyA/ICh2KSAtPiB2XG4gICAgQF92YWx1ZSA9IG9wdGlvbnMudmFsdWUgPyAwXG4gICAgQF9yb3VuZGluZyA9IG9wdGlvbnMucm91bmRpbmcgPyAwXG5cbiAgICBzdXBlciBvcHRpb25zXG5cbiAgQGRlZmluZSBcInZhbHVlXCIsXG4gICAgZ2V0OiAtPiBAX3ZhbHVlXG4gICAgc2V0OiAodikgLT5cbiAgICAgIEBfdmFsdWUgPSBpZiBAX3JvdW5kaW5nID09IGZhbHNlIHRoZW4gdiBlbHNlIFV0aWxzLnJvdW5kKHYsIEBfcm91bmRpbmcpXG4gICAgICBAaHRtbCA9IEBmb3JtYXRTdHJpbmcoQF92YWx1ZSlcbiAgICAgIEBlbWl0KFwiY2hhbmdlOnZhbHVlXCIsIEBfdmFsdWUpXG5cbiAgaW50ZXJwb2xhdGU6ICh2LCBhbmltYXRpb25PcHRpb25zLCBjYWxsYmFjaykgLT5cbiAgICBfY2FsbGJhY2sgPSBudWxsXG4gICAgaWYgTnVtYmVyKHYpID09IEBfdmFsdWUgdGhlbiByZXR1cm5cbiAgICBmb3IgYXJndW1lbnQgaW4gYXJndW1lbnRzXG4gICAgICBpZiBfLmlzRnVuY3Rpb24oYXJndW1lbnQpIHRoZW4gX2NhbGxiYWNrID0gYXJndW1lbnRcblxuICAgIHBhcmVudCA9IEBcblxuICAgIHByb3h5ID0gbmV3IExheWVyXG4gICAgICBuYW1lOiBcIiN7QG5hbWV9cHJveHlcIlxuICAgICAgcGFyZW50OiBAXG4gICAgICBoZWlnaHQ6IDEsIHdpZHRoOiAxXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcbiAgICAgIG9wYWNpdHk6IDBcbiAgICAgIHk6IHBhcmVudC52YWx1ZVxuXG4gICAgcHJveHkub25BbmltYXRpb25FbmQgLT5cbiAgICAgIGlmIF9jYWxsYmFjaz8gdGhlbiBfY2FsbGJhY2soKVxuICAgICAgQC5kZXN0cm95KClcbiAgICAgIHBhcmVudC5lbWl0KFwiaW50ZXJwb2xhdGlvbkZpbmlzaGVkXCIsIHBhcmVudC5fdmFsdWUpXG5cbiAgICBhbmltYXRpb25PcHRpb25zID89XG4gICAgICB0aW1lOiAwLjRcbiAgICAgIGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcbiAgICBhbmltYXRpb25PcHRpb25zLnByb3BlcnRpZXMgPVxuICAgICAgeTogdlxuXG4gICAgcHJveHkub24gXCJjaGFuZ2U6eVwiLCAtPlxuICAgICAgcGFyZW50LnZhbHVlID0gQC55XG5cbiAgICBwcm94eS55ID0gcGFyZW50LnZhbHVlXG4gICAgcHJveHkuYW5pbWF0ZSBhbmltYXRpb25PcHRpb25zXG5cbmV4cG9ydHMuVmFsdWVMYXllciA9IFZhbHVlTGF5ZXJcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
