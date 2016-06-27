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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXIuZnJhbWVyL21vZHVsZXMvVmFsdWVMYXllci5jb2ZmZWUiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXIuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDS0EsSUFBQSxVQUFBO0VBQUE7OztBQUFNOzs7RUFDUyxvQkFBQyxPQUFEO0FBQ1gsUUFBQTtJQUFBLElBQUMsQ0FBQSxZQUFELGdEQUF1QyxTQUFDLENBQUQ7YUFBTztJQUFQO0lBQ3ZDLElBQUMsQ0FBQSxNQUFELDJDQUEwQjtJQUMxQixJQUFDLENBQUEsUUFBRCw2Q0FBOEI7SUFFOUIsNENBQU0sT0FBTjtJQUVBLE1BQUEsR0FBUztJQUNULElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxLQUFBLENBQ1g7TUFBQSxNQUFBLEVBQVEsQ0FBUjtNQUFXLEtBQUEsRUFBTyxDQUFsQjtNQUNBLGVBQUEsRUFBaUIsS0FEakI7TUFFQSxPQUFBLEVBQVMsQ0FGVDtNQUdBLENBQUEsRUFBRyxNQUFNLENBQUMsS0FIVjtLQURXO0lBS2IsSUFBQyxDQUFBLEtBQUssQ0FBQyxjQUFQLENBQXNCLFNBQUE7TUFDcEIsSUFBRyx1QkFBSDtlQUF5QixNQUFNLENBQUMsUUFBUCxDQUFBLEVBQXpCOztJQURvQixDQUF0QjtFQWJXOztFQWdCYixVQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLENBQUQ7TUFDSCxJQUFDLENBQUEsTUFBRCxHQUFVLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLElBQUMsQ0FBQSxRQUFoQjtNQUNWLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsTUFBZjthQUNSLElBQUMsQ0FBQSxJQUFELENBQU0sY0FBTixFQUFzQixJQUFDLENBQUEsTUFBdkI7SUFIRyxDQURMO0dBREY7O3VCQU9BLFdBQUEsR0FBYSxTQUFDLENBQUQsRUFBSSxnQkFBSixFQUFzQixRQUF0QjtBQUNYLFFBQUE7SUFBQSxJQUFHLE1BQUEsQ0FBTyxDQUFQLENBQUEsS0FBYSxJQUFDLENBQUEsTUFBakI7QUFBNkIsYUFBN0I7O0FBQ0EsU0FBQSwyQ0FBQTs7TUFDRSxJQUFHLENBQUMsQ0FBQyxVQUFGLENBQWEsUUFBYixDQUFIO1FBQStCLElBQUMsQ0FBQSxRQUFELEdBQVksU0FBM0M7O0FBREY7SUFFQSxNQUFBLEdBQVM7O01BRVQsbUJBQ0U7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUNBLEtBQUEsRUFBTyxhQURQOzs7SUFFRixnQkFBZ0IsQ0FBQyxVQUFqQixHQUNFO01BQUEsQ0FBQSxFQUFHLENBQUg7O0lBRUYsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsVUFBVixFQUFzQixTQUFBO2FBQ3BCLE1BQU0sQ0FBQyxLQUFQLEdBQWUsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUMsQ0FBZDtJQURLLENBQXRCO0lBR0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxDQUFQLEdBQVcsTUFBTSxDQUFDO1dBQ2xCLElBQUMsQ0FBQSxLQUFLLENBQUMsT0FBUCxDQUFlLGdCQUFmO0VBaEJXOzs7O0dBeEJVOztBQTBDekIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7Ozs7QUMzQ3JCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLlxuIyB7VmFsdWVMYXllcn0gPSByZXF1aXJlIFwiVmFsdWVMYXllclwiXG4jIGluc3RhbnRpYXRlIG5ldyBpbnN0YW5jZXMgd2l0aDogbmV3IFZhbHVlTGF5ZXJcblxuXG5jbGFzcyBWYWx1ZUxheWVyIGV4dGVuZHMgTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuICAgIEBmb3JtYXRTdHJpbmcgPSBvcHRpb25zLmZvcm1hdFN0cmluZyA/ICh2KSAtPiB2XG4gICAgQF92YWx1ZSA9IG9wdGlvbnMudmFsdWUgPyAwXG4gICAgQF9zaWdmaWdzID0gb3B0aW9ucy5zaWdmaWdzID8gMFxuXG4gICAgc3VwZXIgb3B0aW9uc1xuXG4gICAgcGFyZW50ID0gQFxuICAgIEBwcm94eSA9IG5ldyBMYXllclxuICAgICAgaGVpZ2h0OiAxLCB3aWR0aDogMVxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG4gICAgICBvcGFjaXR5OiAwXG4gICAgICB5OiBwYXJlbnQudmFsdWVcbiAgICBAcHJveHkub25BbmltYXRpb25FbmQgLT5cbiAgICAgIGlmIHBhcmVudC5jYWxsYmFjaz8gdGhlbiBwYXJlbnQuY2FsbGJhY2soKVxuXG4gIEBkZWZpbmUgXCJ2YWx1ZVwiLFxuICAgIGdldDogLT4gQF92YWx1ZVxuICAgIHNldDogKHYpIC0+XG4gICAgICBAX3ZhbHVlID0gVXRpbHMucm91bmQodiwgQF9zaWdmaWdzKVxuICAgICAgQGh0bWwgPSBAZm9ybWF0U3RyaW5nKEBfdmFsdWUpXG4gICAgICBAZW1pdChcImNoYW5nZTp2YWx1ZVwiLCBAX3ZhbHVlKVxuXG4gIGludGVycG9sYXRlOiAodiwgYW5pbWF0aW9uT3B0aW9ucywgY2FsbGJhY2spIC0+XG4gICAgaWYgTnVtYmVyKHYpID09IEBfdmFsdWUgdGhlbiByZXR1cm5cbiAgICBmb3IgYXJndW1lbnQgaW4gYXJndW1lbnRzXG4gICAgICBpZiBfLmlzRnVuY3Rpb24oYXJndW1lbnQpIHRoZW4gQGNhbGxiYWNrID0gYXJndW1lbnRcbiAgICBwYXJlbnQgPSBAXG5cbiAgICBhbmltYXRpb25PcHRpb25zID89XG4gICAgICB0aW1lOiAwLjRcbiAgICAgIGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcbiAgICBhbmltYXRpb25PcHRpb25zLnByb3BlcnRpZXMgPVxuICAgICAgeTogdlxuXG4gICAgQHByb3h5Lm9uIFwiY2hhbmdlOnlcIiwgLT5cbiAgICAgIHBhcmVudC52YWx1ZSA9IFV0aWxzLnJvdW5kKEAueSlcblxuICAgIEBwcm94eS55ID0gcGFyZW50LnZhbHVlXG4gICAgQHByb3h5LmFuaW1hdGUgYW5pbWF0aW9uT3B0aW9uc1xuXG5leHBvcnRzLlZhbHVlTGF5ZXIgPSBWYWx1ZUxheWVyXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
