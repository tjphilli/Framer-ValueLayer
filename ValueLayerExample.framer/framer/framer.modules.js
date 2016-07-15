require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ValueLayer":[function(require,module,exports){
var ValueLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ValueLayer = (function(superClass) {
  extend(ValueLayer, superClass);

  function ValueLayer(options) {
    var ref, ref1, ref2;
    this._formatString = (ref = options.formatString) != null ? ref : function(v) {
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

  ValueLayer.define("rounding", {
    get: function() {
      return this._rounding;
    },
    set: function(r) {
      return this._rounding = r;
    }
  });

  ValueLayer.define("formatString", {
    get: function() {
      return this._formatString;
    },
    set: function(f) {
      this._formatString = f;
      return this.html = f(this._value);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycGhpbGxpcHBpL0Rldi9GcmFtZXItVmFsdWVMYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9WYWx1ZUxheWVyLmNvZmZlZSIsIi9Vc2Vycy90cmV2b3JwaGlsbGlwcGkvRGV2L0ZyYW1lci1WYWx1ZUxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ21CQSxJQUFBLFVBQUE7RUFBQTs7O0FBQU07OztFQUNTLG9CQUFDLE9BQUQ7QUFHWCxRQUFBO0lBQUEsSUFBQyxDQUFBLGFBQUQsZ0RBQXdDLFNBQUMsQ0FBRDthQUFPO0lBQVA7SUFDeEMsSUFBQyxDQUFBLE1BQUQsMkNBQTBCO0lBQzFCLElBQUMsQ0FBQSxTQUFELDhDQUFnQztJQUVoQyw0Q0FBTSxPQUFOO0VBUFc7O0VBU2IsVUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0U7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxDQUFEO01BRUgsSUFBQyxDQUFBLE1BQUQsR0FBYSxJQUFDLENBQUEsU0FBRCxLQUFjLEtBQWpCLEdBQTRCLENBQTVCLEdBQW1DLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLElBQUMsQ0FBQSxTQUFoQjtNQUM3QyxJQUFDLENBQUEsSUFBRCxDQUFNLGNBQU4sRUFBc0IsSUFBQyxDQUFBLE1BQXZCO2FBRUEsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUFDLENBQUEsWUFBRCxDQUFjLElBQUMsQ0FBQSxNQUFmO0lBTEwsQ0FETDtHQURGOztFQVNBLFVBQUMsQ0FBQSxNQUFELENBQVEsVUFBUixFQUNFO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsQ0FBRDthQUFPLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFBcEIsQ0FETDtHQURGOztFQUlBLFVBQUMsQ0FBQSxNQUFELENBQVEsY0FBUixFQUNFO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUE7SUFBSixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsQ0FBRDtNQUNILElBQUMsQ0FBQSxhQUFELEdBQWlCO2FBQ2pCLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQSxDQUFFLElBQUMsQ0FBQSxNQUFIO0lBRkwsQ0FETDtHQURGOzt1QkFPQSxXQUFBLEdBQWEsU0FBQyxDQUFELEVBQUksZ0JBQUosRUFBc0IsUUFBdEI7QUFFWCxRQUFBO0lBQUEsSUFBRyxNQUFBLENBQU8sQ0FBUCxDQUFBLEtBQWEsSUFBQyxDQUFBLE1BQWpCO0FBQTZCLGFBQTdCOztJQUdBLFNBQUEsR0FBWTtBQUdaLFNBQUEsMkNBQUE7O01BRUUsSUFBRyxDQUFDLENBQUMsVUFBRixDQUFhLFFBQWIsQ0FBSDtRQUErQixTQUFBLEdBQVksU0FBM0M7O0FBRkY7SUFNQSxNQUFBLEdBQVM7SUFJVCxLQUFBLEdBQVksSUFBQSxLQUFBLENBQ1Y7TUFBQSxJQUFBLEVBQVMsSUFBQyxDQUFBLElBQUYsR0FBTyxPQUFmO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFFQSxNQUFBLEVBQVEsQ0FGUjtNQUVXLEtBQUEsRUFBTyxDQUZsQjtNQUVxQixDQUFBLEVBQUcsQ0FBQyxJQUZ6QjtNQUdBLE9BQUEsRUFBUyxDQUhUO01BSUEsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUpWO0tBRFU7SUFPWixLQUFLLENBQUMsY0FBTixDQUFxQixTQUFBO01BQ25CLElBQUcsaUJBQUg7UUFBbUIsU0FBQSxDQUFBLEVBQW5COztNQUNBLElBQUMsQ0FBQyxPQUFGLENBQUE7YUFDQSxNQUFNLENBQUMsSUFBUCxDQUFZLHVCQUFaLEVBQXFDLE1BQU0sQ0FBQyxNQUE1QztJQUhtQixDQUFyQjs7TUFNQSxtQkFDRTtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQ0EsS0FBQSxFQUFPLGFBRFA7OztJQUVGLGdCQUFnQixDQUFDLFVBQWpCLEdBQ0U7TUFBQSxDQUFBLEVBQUcsQ0FBSDs7SUFHRixLQUFLLENBQUMsRUFBTixDQUFTLFVBQVQsRUFBcUIsU0FBQTthQUNuQixNQUFNLENBQUMsS0FBUCxHQUFlLElBQUMsQ0FBQztJQURFLENBQXJCO1dBSUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxnQkFBZDtFQTFDVzs7OztHQTlCVTs7QUEwRXpCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCOzs7O0FDekZyQixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4jIFVwZGF0ZWQgMTUgSnVuIDIwMTYgYnkgVHJldm9yIFBoaWxsaXBwaSB8fCBAdHJldm9ycGhpbGxpcHBpXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuI1xuIyBVc2FnZTpcbiNcbiMgICB7VmFsdWVMYXllcn0gPSByZXF1aXJlIFwiVmFsdWVMYXllclwiXG4jIFx0Y3VycmVuY3lMYXllciA9IG5ldyBWYWx1ZUxheWVyXG4jICAgICAgdmFsdWU6IDEwMFxuIyAgICAgIHJvdW5kaW5nOiAyXG4jICAgICAgZm9ybWF0U3RyaW5nOiAodikgLT4gXCIkI3t2fVwiXG4jXG4jIFRvIGRvOlxuIyAgIC0gbWFrZSB2YWx1ZXMgZWRpdGFibGUgaW4gcGxhY2VcbiMgICAtIG1ha2UgcmljaGVyIGFuaW1hdGlvbiBvcHRpb25zXG4jXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cbmNsYXNzIFZhbHVlTGF5ZXIgZXh0ZW5kcyBMYXllclxuICBjb25zdHJ1Y3RvcjogKG9wdGlvbnMpIC0+XG5cbiAgICAjIENvbmZpZ3VyZSBpbnN0YW5jZSB2YXJpYWJsZSBkZWZhdWx0c1xuICAgIEBfZm9ybWF0U3RyaW5nID0gb3B0aW9ucy5mb3JtYXRTdHJpbmcgPyAodikgLT4gdlxuICAgIEBfdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gMFxuICAgIEBfcm91bmRpbmcgPSBvcHRpb25zLnJvdW5kaW5nID8gMFxuXG4gICAgc3VwZXIgb3B0aW9uc1xuXG4gIEBkZWZpbmUgXCJ2YWx1ZVwiLFxuICAgIGdldDogLT4gQF92YWx1ZVxuICAgIHNldDogKHYpIC0+XG4gICAgICAjIFJvdW5kIHRoZSB2YWx1ZSBpZiByb3VuZGluZyBpcyBlbmFibGVkXG4gICAgICBAX3ZhbHVlID0gaWYgQF9yb3VuZGluZyA9PSBmYWxzZSB0aGVuIHYgZWxzZSBVdGlscy5yb3VuZCh2LCBAX3JvdW5kaW5nKVxuICAgICAgQGVtaXQoXCJjaGFuZ2U6dmFsdWVcIiwgQF92YWx1ZSlcblxuICAgICAgQGh0bWwgPSBAZm9ybWF0U3RyaW5nKEBfdmFsdWUpXG5cbiAgQGRlZmluZSBcInJvdW5kaW5nXCIsXG4gICAgZ2V0OiAtPiBAX3JvdW5kaW5nXG4gICAgc2V0OiAocikgLT4gQF9yb3VuZGluZyA9IHJcblxuICBAZGVmaW5lIFwiZm9ybWF0U3RyaW5nXCIsXG4gICAgZ2V0OiAtPiBAX2Zvcm1hdFN0cmluZ1xuICAgIHNldDogKGYpIC0+XG4gICAgICBAX2Zvcm1hdFN0cmluZyA9IGZcbiAgICAgIEBodG1sID0gZihAX3ZhbHVlKVxuXG5cbiAgaW50ZXJwb2xhdGU6ICh2LCBhbmltYXRpb25PcHRpb25zLCBjYWxsYmFjaykgLT5cbiAgICAjIElmIHRoZSBkZXN0aW5hdGlvbiB2YWx1ZSBpcyBjdXJyZW50IHZhbHVlLCBleGl0XG4gICAgaWYgTnVtYmVyKHYpID09IEBfdmFsdWUgdGhlbiByZXR1cm5cblxuICAgICMgQ3JlYXRlIGEgc2VwYXJhdGUgY2FsbGJhY2sgdmFyaWFibGUgc28gd2UgaGF2ZSBmbGV4aWJpbGl0eSBpbiBhcmd1bWVudCBvcmRlclxuICAgIF9jYWxsYmFjayA9IG51bGxcblxuICAgICMgQ2hlY2sgaWYgYSBjYWxsYmFjayBpcyBzdXBwbGllZCBpbiB0aGUgMm5kIG9yIDNyZCBhcmd1bWVudHNcbiAgICBmb3IgYXJndW1lbnQgaW4gYXJndW1lbnRzXG4gICAgICAjIFN0b3JlIHRoZSBhcmd1bWVudCBpZiBpdCdzIGEgZnVuY3Rpb24sIGludGVuZGVkIGFzIGNhbGxiYWNrXG4gICAgICBpZiBfLmlzRnVuY3Rpb24oYXJndW1lbnQpIHRoZW4gX2NhbGxiYWNrID0gYXJndW1lbnRcblxuXG4gICAgIyBTdG9yZSByZWZlcmVuY2UgdG8gaW5zdGFuY2UsIHRvIHJlZmVyZW5jZSB3aGVuIHNjb3BlIGNoYW5nZXNcbiAgICBwYXJlbnQgPSBAXG5cblxuICAgICMgQ3JlYXRlIGEgcHJveHkgbGF5ZXIgdG8gYW5pbWF0ZSBpdHMgeSBwb3NpdGlvblxuICAgIHByb3h5ID0gbmV3IExheWVyXG4gICAgICBuYW1lOiBcIiN7QG5hbWV9cHJveHlcIlxuICAgICAgcGFyZW50OiBAXG4gICAgICBoZWlnaHQ6IDEsIHdpZHRoOiAxLCB4OiAtOTk5OVxuICAgICAgb3BhY2l0eTogMFxuICAgICAgeTogcGFyZW50LnZhbHVlXG5cbiAgICBwcm94eS5vbkFuaW1hdGlvbkVuZCAtPlxuICAgICAgaWYgX2NhbGxiYWNrPyB0aGVuIF9jYWxsYmFjaygpXG4gICAgICBALmRlc3Ryb3koKVxuICAgICAgcGFyZW50LmVtaXQoXCJpbnRlcnBvbGF0aW9uRmluaXNoZWRcIiwgcGFyZW50Ll92YWx1ZSlcblxuICAgICMgSWYgYW5pbWF0aW9uT3B0aW9ucyBhcmVuJ3Qgc3VwcGxpZWQgYXMgYW4gYXJndW1lbnQsIGFwcGx5IHNvbWUgZGVmYXVsdHNcbiAgICBhbmltYXRpb25PcHRpb25zID89XG4gICAgICB0aW1lOiAwLjRcbiAgICAgIGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcbiAgICBhbmltYXRpb25PcHRpb25zLnByb3BlcnRpZXMgPVxuICAgICAgeTogdlxuXG4gICAgIyBFdmVyeSB0aW1lIHRoZSBwcm94eSdzIHkgY2hhbmdlLCB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBpbnN0YW5jZVxuICAgIHByb3h5Lm9uIFwiY2hhbmdlOnlcIiwgLT5cbiAgICAgIHBhcmVudC52YWx1ZSA9IEAueVxuXG4gICAgIyBUcmlnZ2VyIHRoZSBhbmltYXRpb25cbiAgICBwcm94eS5hbmltYXRlIGFuaW1hdGlvbk9wdGlvbnNcblxuZXhwb3J0cy5WYWx1ZUxheWVyID0gVmFsdWVMYXllclxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
