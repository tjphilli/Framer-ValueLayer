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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdHJldm9ycGhpbGxpcHBpL0Rldi9GcmFtZXItVmFsdWVMYXllci9WYWx1ZUxheWVyRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9WYWx1ZUxheWVyLmNvZmZlZSIsIi9Vc2Vycy90cmV2b3JwaGlsbGlwcGkvRGV2L0ZyYW1lci1WYWx1ZUxheWVyL1ZhbHVlTGF5ZXJFeGFtcGxlLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0tBLElBQUEsVUFBQTtFQUFBOzs7QUFBTTs7O0VBQ1Msb0JBQUMsT0FBRDtBQUdYLFFBQUE7SUFBQSxJQUFDLENBQUEsYUFBRCxnREFBd0MsU0FBQyxDQUFEO2FBQU87SUFBUDtJQUN4QyxJQUFDLENBQUEsTUFBRCwyQ0FBMEI7SUFDMUIsSUFBQyxDQUFBLFNBQUQsOENBQWdDO0lBRWhDLDRDQUFNLE9BQU47RUFQVzs7RUFTYixVQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDRTtJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBO0lBQUosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLENBQUQ7TUFFSCxJQUFDLENBQUEsTUFBRCxHQUFhLElBQUMsQ0FBQSxTQUFELEtBQWMsS0FBakIsR0FBNEIsQ0FBNUIsR0FBbUMsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsSUFBQyxDQUFBLFNBQWhCO01BQzdDLElBQUMsQ0FBQSxJQUFELENBQU0sY0FBTixFQUFzQixJQUFDLENBQUEsTUFBdkI7YUFFQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBQyxDQUFBLE1BQWY7SUFMTCxDQURMO0dBREY7O0VBU0EsVUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0U7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxDQUFEO2FBQU8sSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUFwQixDQURMO0dBREY7O0VBSUEsVUFBQyxDQUFBLE1BQUQsQ0FBUSxjQUFSLEVBQ0U7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQTtJQUFKLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxDQUFEO01BQ0gsSUFBQyxDQUFBLGFBQUQsR0FBaUI7YUFDakIsSUFBQyxDQUFBLElBQUQsR0FBUSxDQUFBLENBQUUsSUFBQyxDQUFBLE1BQUg7SUFGTCxDQURMO0dBREY7O3VCQU9BLFdBQUEsR0FBYSxTQUFDLENBQUQsRUFBSSxnQkFBSixFQUFzQixRQUF0QjtBQUVYLFFBQUE7SUFBQSxJQUFHLE1BQUEsQ0FBTyxDQUFQLENBQUEsS0FBYSxJQUFDLENBQUEsTUFBakI7QUFBNkIsYUFBN0I7O0lBR0EsU0FBQSxHQUFZO0FBR1osU0FBQSwyQ0FBQTs7TUFFRSxJQUFHLENBQUMsQ0FBQyxVQUFGLENBQWEsUUFBYixDQUFIO1FBQStCLFNBQUEsR0FBWSxTQUEzQzs7QUFGRjtJQU1BLE1BQUEsR0FBUztJQUlULEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDVjtNQUFBLElBQUEsRUFBUyxJQUFDLENBQUEsSUFBRixHQUFPLE9BQWY7TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUVBLE1BQUEsRUFBUSxDQUZSO01BRVcsS0FBQSxFQUFPLENBRmxCO01BRXFCLENBQUEsRUFBRyxDQUFDLElBRnpCO01BR0EsT0FBQSxFQUFTLENBSFQ7TUFJQSxDQUFBLEVBQUcsTUFBTSxDQUFDLEtBSlY7S0FEVTtJQU9aLEtBQUssQ0FBQyxjQUFOLENBQXFCLFNBQUE7TUFDbkIsSUFBRyxpQkFBSDtRQUFtQixTQUFBLENBQUEsRUFBbkI7O01BQ0EsSUFBQyxDQUFDLE9BQUYsQ0FBQTthQUNBLE1BQU0sQ0FBQyxJQUFQLENBQVksdUJBQVosRUFBcUMsTUFBTSxDQUFDLE1BQTVDO0lBSG1CLENBQXJCOztNQU1BLG1CQUNFO1FBQUEsSUFBQSxFQUFNLEdBQU47UUFDQSxLQUFBLEVBQU8sYUFEUDs7O0lBRUYsZ0JBQWdCLENBQUMsVUFBakIsR0FDRTtNQUFBLENBQUEsRUFBRyxDQUFIOztJQUdGLEtBQUssQ0FBQyxFQUFOLENBQVMsVUFBVCxFQUFxQixTQUFBO2FBQ25CLE1BQU0sQ0FBQyxLQUFQLEdBQWUsSUFBQyxDQUFDO0lBREUsQ0FBckI7V0FJQSxLQUFLLENBQUMsT0FBTixDQUFjLGdCQUFkO0VBMUNXOzs7O0dBOUJVOztBQTBFekIsT0FBTyxDQUFDLFVBQVIsR0FBcUI7Ozs7QUMzRXJCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLlxuIyB7VmFsdWVMYXllcn0gPSByZXF1aXJlIFwiVmFsdWVMYXllclwiXG4jIGluc3RhbnRpYXRlIG5ldyBpbnN0YW5jZXMgd2l0aDogbmV3IFZhbHVlTGF5ZXJcblxuXG5jbGFzcyBWYWx1ZUxheWVyIGV4dGVuZHMgTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXG4gICAgIyBDb25maWd1cmUgaW5zdGFuY2UgdmFyaWFibGUgZGVmYXVsdHNcbiAgICBAX2Zvcm1hdFN0cmluZyA9IG9wdGlvbnMuZm9ybWF0U3RyaW5nID8gKHYpIC0+IHZcbiAgICBAX3ZhbHVlID0gb3B0aW9ucy52YWx1ZSA/IDBcbiAgICBAX3JvdW5kaW5nID0gb3B0aW9ucy5yb3VuZGluZyA/IDBcblxuICAgIHN1cGVyIG9wdGlvbnNcblxuICBAZGVmaW5lIFwidmFsdWVcIixcbiAgICBnZXQ6IC0+IEBfdmFsdWVcbiAgICBzZXQ6ICh2KSAtPlxuICAgICAgIyBSb3VuZCB0aGUgdmFsdWUgaWYgcm91bmRpbmcgaXMgZW5hYmxlZFxuICAgICAgQF92YWx1ZSA9IGlmIEBfcm91bmRpbmcgPT0gZmFsc2UgdGhlbiB2IGVsc2UgVXRpbHMucm91bmQodiwgQF9yb3VuZGluZylcbiAgICAgIEBlbWl0KFwiY2hhbmdlOnZhbHVlXCIsIEBfdmFsdWUpXG5cbiAgICAgIEBodG1sID0gQGZvcm1hdFN0cmluZyhAX3ZhbHVlKVxuXG4gIEBkZWZpbmUgXCJyb3VuZGluZ1wiLFxuICAgIGdldDogLT4gQF9yb3VuZGluZ1xuICAgIHNldDogKHIpIC0+IEBfcm91bmRpbmcgPSByXG5cbiAgQGRlZmluZSBcImZvcm1hdFN0cmluZ1wiLFxuICAgIGdldDogLT4gQF9mb3JtYXRTdHJpbmdcbiAgICBzZXQ6IChmKSAtPlxuICAgICAgQF9mb3JtYXRTdHJpbmcgPSBmXG4gICAgICBAaHRtbCA9IGYoQF92YWx1ZSlcblxuXG4gIGludGVycG9sYXRlOiAodiwgYW5pbWF0aW9uT3B0aW9ucywgY2FsbGJhY2spIC0+XG4gICAgIyBJZiB0aGUgZGVzdGluYXRpb24gdmFsdWUgaXMgY3VycmVudCB2YWx1ZSwgZXhpdFxuICAgIGlmIE51bWJlcih2KSA9PSBAX3ZhbHVlIHRoZW4gcmV0dXJuXG5cbiAgICAjIENyZWF0ZSBhIHNlcGFyYXRlIGNhbGxiYWNrIHZhcmlhYmxlIHNvIHdlIGhhdmUgZmxleGliaWxpdHkgaW4gYXJndW1lbnQgb3JkZXJcbiAgICBfY2FsbGJhY2sgPSBudWxsXG5cbiAgICAjIENoZWNrIGlmIGEgY2FsbGJhY2sgaXMgc3VwcGxpZWQgaW4gdGhlIDJuZCBvciAzcmQgYXJndW1lbnRzXG4gICAgZm9yIGFyZ3VtZW50IGluIGFyZ3VtZW50c1xuICAgICAgIyBTdG9yZSB0aGUgYXJndW1lbnQgaWYgaXQncyBhIGZ1bmN0aW9uLCBpbnRlbmRlZCBhcyBjYWxsYmFja1xuICAgICAgaWYgXy5pc0Z1bmN0aW9uKGFyZ3VtZW50KSB0aGVuIF9jYWxsYmFjayA9IGFyZ3VtZW50XG5cblxuICAgICMgU3RvcmUgcmVmZXJlbmNlIHRvIGluc3RhbmNlLCB0byByZWZlcmVuY2Ugd2hlbiBzY29wZSBjaGFuZ2VzXG4gICAgcGFyZW50ID0gQFxuXG5cbiAgICAjIENyZWF0ZSBhIHByb3h5IGxheWVyIHRvIGFuaW1hdGUgaXRzIHkgcG9zaXRpb25cbiAgICBwcm94eSA9IG5ldyBMYXllclxuICAgICAgbmFtZTogXCIje0BuYW1lfXByb3h5XCJcbiAgICAgIHBhcmVudDogQFxuICAgICAgaGVpZ2h0OiAxLCB3aWR0aDogMSwgeDogLTk5OTlcbiAgICAgIG9wYWNpdHk6IDBcbiAgICAgIHk6IHBhcmVudC52YWx1ZVxuXG4gICAgcHJveHkub25BbmltYXRpb25FbmQgLT5cbiAgICAgIGlmIF9jYWxsYmFjaz8gdGhlbiBfY2FsbGJhY2soKVxuICAgICAgQC5kZXN0cm95KClcbiAgICAgIHBhcmVudC5lbWl0KFwiaW50ZXJwb2xhdGlvbkZpbmlzaGVkXCIsIHBhcmVudC5fdmFsdWUpXG5cbiAgICAjIElmIGFuaW1hdGlvbk9wdGlvbnMgYXJlbid0IHN1cHBsaWVkIGFzIGFuIGFyZ3VtZW50LCBhcHBseSBzb21lIGRlZmF1bHRzXG4gICAgYW5pbWF0aW9uT3B0aW9ucyA/PVxuICAgICAgdGltZTogMC40XG4gICAgICBjdXJ2ZTogXCJlYXNlLWluLW91dFwiXG4gICAgYW5pbWF0aW9uT3B0aW9ucy5wcm9wZXJ0aWVzID1cbiAgICAgIHk6IHZcblxuICAgICMgRXZlcnkgdGltZSB0aGUgcHJveHkncyB5IGNoYW5nZSwgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgaW5zdGFuY2VcbiAgICBwcm94eS5vbiBcImNoYW5nZTp5XCIsIC0+XG4gICAgICBwYXJlbnQudmFsdWUgPSBALnlcblxuICAgICMgVHJpZ2dlciB0aGUgYW5pbWF0aW9uXG4gICAgcHJveHkuYW5pbWF0ZSBhbmltYXRpb25PcHRpb25zXG5cbmV4cG9ydHMuVmFsdWVMYXllciA9IFZhbHVlTGF5ZXJcbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
