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
      return this.destroy();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycGhpbGxpcHBpL0Rldi9GcmFtZXItVmFsdWVMYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9WYWx1ZUxheWVyLmNvZmZlZSIsIi9Vc2Vycy90cmV2b3JwaGlsbGlwcGkvRGV2L0ZyYW1lci1WYWx1ZUxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0tBLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7O0VBQ1Msb0JBQUMsT0FBRDtBQUNYLFFBQUE7SUFBQSxJQUFDLENBQUEsWUFBRCxnREFBdUMsU0FBQyxDQUFEO2FBQU87SUFBUDtJQUN2QyxJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLFNBQUQsOENBQWdDO0lBRWhDLDRDQUFNLE9BQU47RUFMVzs7RUFPYixVQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLENBQUQ7TUFDSCxJQUFDLENBQUEsTUFBRCxHQUFhLElBQUMsQ0FBQSxTQUFELEtBQWMsS0FBakIsR0FBNEIsQ0FBNUIsR0FBbUMsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsSUFBQyxDQUFBLFNBQWhCO01BQzdDLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFDLENBQUEsTUFBZjthQUNSLElBQUMsQ0FBQSxJQUFELENBQU0sY0FBTixFQUFzQixJQUFDLENBQUEsTUFBdkI7SUFIRyxDQURMO0dBREY7O3VCQU9BLFdBQUEsR0FBYSxTQUFDLENBQUQsRUFBSSxnQkFBSixFQUFzQixRQUF0QjtBQUNYLFFBQUE7SUFBQSxTQUFBLEdBQVk7SUFDWixJQUFHLE1BQUEsQ0FBTyxDQUFQLENBQUEsS0FBYSxJQUFDLENBQUEsTUFBakI7QUFBNkIsYUFBN0I7O0FBQ0EsU0FBQSwyQ0FBQTs7TUFDRSxJQUFHLENBQUMsQ0FBQyxVQUFGLENBQWEsUUFBYixDQUFIO1FBQStCLFNBQUEsR0FBWSxTQUEzQzs7QUFERjtJQUdBLE1BQUEsR0FBUztJQUVULEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDVjtNQUFBLElBQUEsRUFBUyxJQUFDLENBQUEsSUFBRixHQUFPLE9BQWY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLE1BQUEsRUFBUSxDQUZSO01BRVcsS0FBQSxFQUFPLENBRmxCO01BR0EsZUFBQSxFQUFpQixLQUhqQjtNQUlBLE9BQUEsRUFBUyxDQUpUO01BS0EsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUxWO0tBRFU7SUFPWixLQUFLLENBQUMsY0FBTixDQUFxQixTQUFBO01BQ25CLElBQUcsaUJBQUg7UUFBbUIsU0FBQSxDQUFBLEVBQW5COzthQUNBLElBQUMsQ0FBQyxPQUFGLENBQUE7SUFGbUIsQ0FBckI7O01BSUEsbUJBQ0U7UUFBQSxJQUFBLEVBQU0sR0FBTjtRQUNBLEtBQUEsRUFBTyxhQURQOzs7SUFFRixnQkFBZ0IsQ0FBQyxVQUFqQixHQUNFO01BQUEsQ0FBQSxFQUFHLENBQUg7O0lBRUYsS0FBSyxDQUFDLEVBQU4sQ0FBUyxVQUFULEVBQXFCLFNBQUE7YUFDbkIsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUM7SUFERSxDQUFyQjtJQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsTUFBTSxDQUFDO1dBQ2pCLEtBQUssQ0FBQyxPQUFOLENBQWMsZ0JBQWQ7RUE3Qlc7Ozs7R0FmVTs7QUE4Q3pCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCOzs7O0FDL0NyQixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby5cbiMge1ZhbHVlTGF5ZXJ9ID0gcmVxdWlyZSBcIlZhbHVlTGF5ZXJcIlxuIyBpbnN0YW50aWF0ZSBuZXcgaW5zdGFuY2VzIHdpdGg6IG5ldyBWYWx1ZUxheWVyXG5cblxuY2xhc3MgVmFsdWVMYXllciBleHRlbmRzIExheWVyXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cbiAgICBAZm9ybWF0U3RyaW5nID0gb3B0aW9ucy5mb3JtYXRTdHJpbmcgPyAodikgLT4gdlxuICAgIEBfdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gMFxuICAgIEBfcm91bmRpbmcgPSBvcHRpb25zLnJvdW5kaW5nID8gMFxuXG4gICAgc3VwZXIgb3B0aW9uc1xuXG4gIEBkZWZpbmUgXCJ2YWx1ZVwiLFxuICAgIGdldDogLT4gQF92YWx1ZVxuICAgIHNldDogKHYpIC0+XG4gICAgICBAX3ZhbHVlID0gaWYgQF9yb3VuZGluZyA9PSBmYWxzZSB0aGVuIHYgZWxzZSBVdGlscy5yb3VuZCh2LCBAX3JvdW5kaW5nKVxuICAgICAgQGh0bWwgPSBAZm9ybWF0U3RyaW5nKEBfdmFsdWUpXG4gICAgICBAZW1pdChcImNoYW5nZTp2YWx1ZVwiLCBAX3ZhbHVlKVxuXG4gIGludGVycG9sYXRlOiAodiwgYW5pbWF0aW9uT3B0aW9ucywgY2FsbGJhY2spIC0+XG4gICAgX2NhbGxiYWNrID0gbnVsbFxuICAgIGlmIE51bWJlcih2KSA9PSBAX3ZhbHVlIHRoZW4gcmV0dXJuXG4gICAgZm9yIGFyZ3VtZW50IGluIGFyZ3VtZW50c1xuICAgICAgaWYgXy5pc0Z1bmN0aW9uKGFyZ3VtZW50KSB0aGVuIF9jYWxsYmFjayA9IGFyZ3VtZW50XG5cbiAgICBwYXJlbnQgPSBAXG5cbiAgICBwcm94eSA9IG5ldyBMYXllclxuICAgICAgbmFtZTogXCIje0BuYW1lfXByb3h5XCJcbiAgICAgIHBhcmVudDogQFxuICAgICAgaGVpZ2h0OiAxLCB3aWR0aDogMVxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG4gICAgICBvcGFjaXR5OiAwXG4gICAgICB5OiBwYXJlbnQudmFsdWVcbiAgICBwcm94eS5vbkFuaW1hdGlvbkVuZCAtPlxuICAgICAgaWYgX2NhbGxiYWNrPyB0aGVuIF9jYWxsYmFjaygpXG4gICAgICBALmRlc3Ryb3koKVxuXG4gICAgYW5pbWF0aW9uT3B0aW9ucyA/PVxuICAgICAgdGltZTogMC40XG4gICAgICBjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG4gICAgYW5pbWF0aW9uT3B0aW9ucy5wcm9wZXJ0aWVzID1cbiAgICAgIHk6IHZcblxuICAgIHByb3h5Lm9uIFwiY2hhbmdlOnlcIiwgLT5cbiAgICAgIHBhcmVudC52YWx1ZSA9IEAueVxuXG4gICAgcHJveHkueSA9IHBhcmVudC52YWx1ZVxuICAgIHByb3h5LmFuaW1hdGUgYW5pbWF0aW9uT3B0aW9uc1xuXG5leHBvcnRzLlZhbHVlTGF5ZXIgPSBWYWx1ZUxheWVyXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
