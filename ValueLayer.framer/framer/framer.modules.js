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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXIuZnJhbWVyL21vZHVsZXMvVmFsdWVMYXllci5jb2ZmZWUiLCIvVXNlcnMvdHJldm9ycC9kZXYvZnJhbWVyLXZhbHVlLWxheWVyL1ZhbHVlTGF5ZXIuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDS0EsSUFBQSxVQUFBO0VBQUE7OztBQUFNOzs7RUFDUyxvQkFBQyxPQUFEO0FBQ1gsUUFBQTtJQUFBLElBQUMsQ0FBQSxZQUFELGdEQUF1QyxTQUFDLENBQUQ7YUFBTztJQUFQO0lBQ3ZDLElBQUMsQ0FBQSxNQUFELDJDQUEwQjtJQUMxQixJQUFDLENBQUEsUUFBRCw2Q0FBOEI7SUFFOUIsNENBQU0sT0FBTjtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQ0U7TUFBQSxLQUFBLEVBQU8sT0FBUDs7SUFFRixNQUFBLEdBQVM7SUFDVCxJQUFDLENBQUEsS0FBRCxHQUFhLElBQUEsS0FBQSxDQUNYO01BQUEsTUFBQSxFQUFRLENBQVI7TUFBVyxLQUFBLEVBQU8sQ0FBbEI7TUFDQSxlQUFBLEVBQWlCLEtBRGpCO01BRUEsT0FBQSxFQUFTLENBRlQ7TUFHQSxDQUFBLEVBQUcsTUFBTSxDQUFDLEtBSFY7S0FEVztJQUtiLElBQUMsQ0FBQSxLQUFLLENBQUMsY0FBUCxDQUFzQixTQUFBO01BQ3BCLElBQUcsdUJBQUg7ZUFBeUIsTUFBTSxDQUFDLFFBQVAsQ0FBQSxFQUF6Qjs7SUFEb0IsQ0FBdEI7RUFmVzs7RUFrQmIsVUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0U7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxDQUFEO01BQ0gsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUFLLENBQUMsS0FBTixDQUFZLENBQVosRUFBZSxJQUFDLENBQUEsUUFBaEI7TUFDVixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLE1BQWY7YUFDUixJQUFDLENBQUEsSUFBRCxDQUFNLGNBQU4sRUFBc0IsSUFBQyxDQUFBLE1BQXZCO0lBSEcsQ0FETDtHQURGOzt1QkFPQSxXQUFBLEdBQWEsU0FBQyxDQUFELEVBQUksZ0JBQUosRUFBc0IsUUFBdEI7QUFDWCxRQUFBO0lBQUEsTUFBQSxHQUFTO0lBQ1QsSUFBQyxDQUFBLFFBQUQsR0FBWTs7TUFFWixtQkFDRTtRQUFBLElBQUEsRUFBTSxHQUFOO1FBQ0EsS0FBQSxFQUFPLGFBRFA7OztJQUVGLGdCQUFnQixDQUFDLFVBQWpCLEdBQ0U7TUFBQSxDQUFBLEVBQUcsQ0FBSDs7SUFFRixJQUFDLENBQUEsS0FBSyxDQUFDLEVBQVAsQ0FBVSxVQUFWLEVBQXNCLFNBQUE7YUFDcEIsTUFBTSxDQUFDLEtBQVAsR0FBZSxLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsQ0FBQyxDQUFkO0lBREssQ0FBdEI7SUFHQSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQWIsR0FBaUIsTUFBTSxDQUFDO1dBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBYixDQUFxQixnQkFBckI7RUFkVzs7OztHQTFCVTs7QUEwQ3pCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCOzs7O0FDM0NyQixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby5cbiMge1ZhbHVlTGF5ZXJ9ID0gcmVxdWlyZSBcIlZhbHVlTGF5ZXJcIlxuIyBpbnN0YW50aWF0ZSBuZXcgaW5zdGFuY2VzIHdpdGg6IG5ldyBWYWx1ZUxheWVyXG5cblxuY2xhc3MgVmFsdWVMYXllciBleHRlbmRzIExheWVyXG4gIGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cbiAgICBAZm9ybWF0U3RyaW5nID0gb3B0aW9ucy5mb3JtYXRTdHJpbmcgPyAodikgLT4gdlxuICAgIEBfdmFsdWUgPSBvcHRpb25zLnZhbHVlID8gMFxuICAgIEBfc2lnZmlncyA9IG9wdGlvbnMuc2lnZmlncyA/IDBcblxuICAgIHN1cGVyIG9wdGlvbnNcbiAgICBAc3R5bGUgPVxuICAgICAgY29sb3I6IFwiYmxhY2tcIlxuXG4gICAgcGFyZW50ID0gQFxuICAgIEBwcm94eSA9IG5ldyBMYXllclxuICAgICAgaGVpZ2h0OiAxLCB3aWR0aDogMVxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG4gICAgICBvcGFjaXR5OiAwXG4gICAgICB5OiBwYXJlbnQudmFsdWVcbiAgICBAcHJveHkub25BbmltYXRpb25FbmQgLT5cbiAgICAgIGlmIHBhcmVudC5jYWxsYmFjaz8gdGhlbiBwYXJlbnQuY2FsbGJhY2soKVxuXG4gIEBkZWZpbmUgXCJ2YWx1ZVwiLFxuICAgIGdldDogLT4gQF92YWx1ZVxuICAgIHNldDogKHYpIC0+XG4gICAgICBAX3ZhbHVlID0gVXRpbHMucm91bmQodiwgQF9zaWdmaWdzKVxuICAgICAgQGh0bWwgPSBAZm9ybWF0U3RyaW5nKEBfdmFsdWUpXG4gICAgICBAZW1pdChcImNoYW5nZTp2YWx1ZVwiLCBAX3ZhbHVlKVxuXG4gIGludGVycG9sYXRlOiAodiwgYW5pbWF0aW9uT3B0aW9ucywgY2FsbGJhY2spIC0+XG4gICAgcGFyZW50ID0gQFxuICAgIEBjYWxsYmFjayA9IGNhbGxiYWNrXG5cbiAgICBhbmltYXRpb25PcHRpb25zID89XG4gICAgICB0aW1lOiAwLjRcbiAgICAgIGN1cnZlOiBcImVhc2UtaW4tb3V0XCJcbiAgICBhbmltYXRpb25PcHRpb25zLnByb3BlcnRpZXMgPVxuICAgICAgeTogdlxuXG4gICAgQHByb3h5Lm9uIFwiY2hhbmdlOnlcIiwgLT5cbiAgICAgIHBhcmVudC52YWx1ZSA9IFV0aWxzLnJvdW5kKEAueSlcblxuICAgIHBhcmVudC5wcm94eS55ID0gcGFyZW50LnZhbHVlXG4gICAgcGFyZW50LnByb3h5LmFuaW1hdGUgYW5pbWF0aW9uT3B0aW9uc1xuXG5leHBvcnRzLlZhbHVlTGF5ZXIgPSBWYWx1ZUxheWVyXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
