# Framer ValueLayer

ValueLayer is a Layer subclass dedicated to helping you manage numbers in your prototypes, and animate between them.

![example gif](http://i.giphy.com/l46C6q33wRPvFPFoQ.gif)

## API

### Basic Usage
A ValueLayer has one main responsibility and that is to manage the storage and rendering of formatted values. You can change a value at any time, but should specify formatting and significant figures at initialization.

You have the following options during initialization
- ```value``` - a number to be stored and updated by the layer
- ```formatString(value)``` - a function called every time the value changes, it should return the desired string for your layer
- ```rounding``` - the number of decimal places you want your value to be rounded to, or `false` for no rounding

#### Examples

```coffeescript
moneySaved = new ValueLayer
  value: 100
  formatString: (v) -> "$#{v} USD"

# Layer's html will be "$100 USD"
```
The layer will redraw any time its value has changed. The html string of the layer is what is returned by the `formatString` function. `formatString` will be called with the new value, so you can reference it in the function. This allows us to do more advanced formatting of values.

```coffeescript
movieDuration = new ValueLayer
  value: 135
  formatString: (v) -> "#{Math.floor(v/60)} hours #{v%60} minutes"

# Layer's html will be "2 hours 15 minutes"
```

`formatString`'s responsibility is to return the html string for the layer, so you can write longer blocks as long as you return something. In the duration example above, it would render movies between 60 and 119 minutes as "1 hours" which isn't ideal, so let's fix it.

```coffeescript
movieDurationProperGrammar = new ValueLayer
  value: 95
  formatString: (v) ->
  	hrs = Math.floor(v/60)
  	mins = v % 60
  	"#{hrs} #{if hrs == 1 then "hour" else "hours"} #{mins} #{if mins == 1 then "minute" else "minutes"}"

# Layer's html will be "1 hour 15 minutes"
```

Let's say we want to ensure that the proper number of significant digits are used, whether to treat values as integers, or ensure precision for currency. `rounding` specifies the number of places past the decimal point to round to, or whether to round at all. The default value is `0`, which means values are treated as integers. A value of `false` will ignore rounding altogether.

```coffeescript
interestEarned = new ValueLayer
  value: 92.54679
  rounding: 2
  formatString: (v) -> "$#{v} USD"

# Layer's html will be "$92.55 USD"
```

### Interpolation
Sometimes, it can be nice to show a value changing. This can be a hassle to write every time you need this functionality, so ValueLayer provides a function `interpolate` to animate the formatted value string between its current value and an arbitrary destination value.

The function has a required destination value, and optional animationOptions and callback: `myValueLayer.interpolate(destinationValue, animationOptions, callback)`

```coffeescript
moneySaved = new ValueLayer
  value: 10
  formatString: (v) -> "$#{v}"

moneySaved.interpolate 100
```

You can also specify your own animation options. The default values are `time: 0.4` and `curve: "ease-in-out"`
```coffeescript
moneySaved = new ValueLayer
  value: 10
  formatString: (v) -> "$#{v}"

moneySaved.interpolate 100, time: 1, curve: "linear"
```

You can call a function when the interpolation is finished, that will only be called once
```coffeescript
moneySaved = new ValueLayer
  value: 10
  formatString: (v) -> "$#{v}"

moneySaved.interpolate 100, time: 1, curve: "linear", -> print "I'm finished!"
```

Lastly, you can listen for an event that fires every time interpolation is finished on the layer
```coffeescript
moneySaved = new ValueLayer
  value: 10
  formatString: (v) -> "$#{v}"

moneySaved.on "interpolationFinished", (v) ->
  print "You've saved #{v} this month!"
```


### Change Events

Every time a ValueLayer's value is changed, it will emit a `change:value` event along with the new value.
```coffeescript
dollarsLabel.on "change:value", (v) ->
	eurosLabel.value = v * 0.91
	poundsLabel.value = v * 0.76

```
_____

TODO

- More example gifs
