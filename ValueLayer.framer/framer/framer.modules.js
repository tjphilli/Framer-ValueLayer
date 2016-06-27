require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ValueLayer":[function(require,module,exports){
var ValueLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ValueLayer = (function(superClass) {
  extend(ValueLayer, superClass);

  function ValueLayer(options) {
    var parent;
    this.formatString = options.formatString ? options.formatString : function(v) {
      return v;
    };
    this._value = options.value ? options.value : 0;
    this._sigfigs = options.sigfigs ? options.sigfigs : 0;
    ValueLayer.__super__.constructor.call(this, options);
    this.style = {
      color: "black"
    };
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
    var parent;
    parent = this;
    this.callback = callback;
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
    parent.proxy.y = parent.value;
    return parent.proxy.animate(animationOptions);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXIuZnJhbWVyL21vZHVsZXMvVmFsdWVMYXllci5jb2ZmZWUiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXIuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDS0EsSUFBQSxVQUFBO0VBQUE7OztBQUFNOzs7RUFDUSxvQkFBQyxPQUFEO0FBQ1osUUFBQTtJQUFBLElBQUMsQ0FBQSxZQUFELEdBQW1CLE9BQU8sQ0FBQyxZQUFYLEdBQTZCLE9BQU8sQ0FBQyxZQUFyQyxHQUF1RCxTQUFDLENBQUQ7YUFBTztJQUFQO0lBQ3ZFLElBQUMsQ0FBQSxNQUFELEdBQWEsT0FBTyxDQUFDLEtBQVgsR0FBc0IsT0FBTyxDQUFDLEtBQTlCLEdBQXlDO0lBQ25ELElBQUMsQ0FBQSxRQUFELEdBQWUsT0FBTyxDQUFDLE9BQVgsR0FBd0IsT0FBTyxDQUFDLE9BQWhDLEdBQTZDO0lBRXpELDRDQUFNLE9BQU47SUFDQSxJQUFDLENBQUEsS0FBRCxHQUNDO01BQUEsS0FBQSxFQUFPLE9BQVA7O0lBRUQsTUFBQSxHQUFTO0lBQ1QsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FDWjtNQUFBLE1BQUEsRUFBUSxDQUFSO01BQVcsS0FBQSxFQUFPLENBQWxCO01BQ0EsZUFBQSxFQUFpQixLQURqQjtNQUVBLE9BQUEsRUFBUyxDQUZUO01BR0EsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUhWO0tBRFk7SUFLYixJQUFDLENBQUEsS0FBSyxDQUFDLGNBQVAsQ0FBc0IsU0FBQTtNQUNyQixJQUFHLHVCQUFIO2VBQXlCLE1BQU0sQ0FBQyxRQUFQLENBQUEsRUFBekI7O0lBRHFCLENBQXRCO0VBZlk7O0VBa0JiLFVBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsQ0FBRDtNQUNKLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsSUFBQyxDQUFBLFFBQWhCO01BQ1YsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxNQUFmO2FBQ1IsSUFBQyxDQUFBLElBQUQsQ0FBTSxjQUFOLEVBQXNCLElBQUMsQ0FBQSxNQUF2QjtJQUhJLENBREw7R0FERDs7dUJBT0EsV0FBQSxHQUFhLFNBQUMsQ0FBRCxFQUFJLGdCQUFKLEVBQXNCLFFBQXRCO0FBQ1osUUFBQTtJQUFBLE1BQUEsR0FBUztJQUNULElBQUMsQ0FBQSxRQUFELEdBQVk7O01BRVosbUJBQ0M7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUNBLEtBQUEsRUFBTyxhQURQOzs7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFqQixHQUNDO01BQUEsQ0FBQSxFQUFHLENBQUg7O0lBRUQsSUFBQyxDQUFBLEtBQUssQ0FBQyxFQUFQLENBQVUsVUFBVixFQUFzQixTQUFBO2FBQ3JCLE1BQU0sQ0FBQyxLQUFQLEdBQWUsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUMsQ0FBZDtJQURNLENBQXRCO0lBR0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFiLEdBQWlCLE1BQU0sQ0FBQztXQU14QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWIsQ0FBcUIsZ0JBQXJCO0VBbkJZOzs7O0dBMUJXOztBQStDekIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7Ozs7QUNoRHJCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLlxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuXG5jbGFzcyBWYWx1ZUxheWVyIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEBmb3JtYXRTdHJpbmcgPSBpZiBvcHRpb25zLmZvcm1hdFN0cmluZyB0aGVuIG9wdGlvbnMuZm9ybWF0U3RyaW5nIGVsc2UgKHYpIC0+IHZcblx0XHRAX3ZhbHVlID0gaWYgb3B0aW9ucy52YWx1ZSB0aGVuIG9wdGlvbnMudmFsdWUgZWxzZSAwXG5cdFx0QF9zaWdmaWdzID0gaWYgb3B0aW9ucy5zaWdmaWdzIHRoZW4gb3B0aW9ucy5zaWdmaWdzIGVsc2UgMFxuXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBzdHlsZSA9XG5cdFx0XHRjb2xvcjogXCJibGFja1wiXG5cblx0XHRwYXJlbnQgPSBAXG5cdFx0QHByb3h5ID0gbmV3IExheWVyXG5cdFx0XHRoZWlnaHQ6IDEsIHdpZHRoOiAxXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdHk6IHBhcmVudC52YWx1ZVxuXHRcdEBwcm94eS5vbkFuaW1hdGlvbkVuZCAtPlxuXHRcdFx0aWYgcGFyZW50LmNhbGxiYWNrPyB0aGVuIHBhcmVudC5jYWxsYmFjaygpXG5cblx0QGRlZmluZSBcInZhbHVlXCIsXG5cdFx0Z2V0OiAtPiBAX3ZhbHVlXG5cdFx0c2V0OiAodikgLT5cblx0XHRcdEBfdmFsdWUgPSBVdGlscy5yb3VuZCh2LCBAX3NpZ2ZpZ3MpXG5cdFx0XHRAaHRtbCA9IEBmb3JtYXRTdHJpbmcoQF92YWx1ZSlcblx0XHRcdEBlbWl0KFwiY2hhbmdlOnZhbHVlXCIsIEBfdmFsdWUpXG5cblx0aW50ZXJwb2xhdGU6ICh2LCBhbmltYXRpb25PcHRpb25zLCBjYWxsYmFjaykgLT5cblx0XHRwYXJlbnQgPSBAXG5cdFx0QGNhbGxiYWNrID0gY2FsbGJhY2tcblxuXHRcdGFuaW1hdGlvbk9wdGlvbnMgPz1cblx0XHRcdHRpbWU6IDAuNFxuXHRcdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdGFuaW1hdGlvbk9wdGlvbnMucHJvcGVydGllcyA9XG5cdFx0XHR5OiB2XG5cblx0XHRAcHJveHkub24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0cGFyZW50LnZhbHVlID0gVXRpbHMucm91bmQoQC55KVxuXG5cdFx0cGFyZW50LnByb3h5LnkgPSBwYXJlbnQudmFsdWVcbiMgXHRcdHBhcmVudC5wcm94eS5hbmltYXRlXG4jIFx0XHRcdHByb3BlcnRpZXM6XG4jIFx0XHRcdFx0eTogdlxuIyBcdFx0XHR0aW1lOiAwLjRcbiMgXHRcdFx0Y3VydmU6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdHBhcmVudC5wcm94eS5hbmltYXRlIGFuaW1hdGlvbk9wdGlvbnNcblxuZXhwb3J0cy5WYWx1ZUxheWVyID0gVmFsdWVMYXllclxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
