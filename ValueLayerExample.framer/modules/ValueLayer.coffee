# Add the following line to your project in Framer Studio.
# {ValueLayer} = require "ValueLayer"
# instantiate new instances with: new ValueLayer


class ValueLayer extends Layer
  constructor: (options) ->
    @formatString = options.formatString ? (v) -> v
    @_value = options.value ? 0
    @_rounding = options.rounding ? 0

    super options

  @define "value",
    get: -> @_value
    set: (v) ->
      @_value = if @_rounding == false then v else Utils.round(v, @_rounding)
      @html = @formatString(@_value)
      @emit("change:value", @_value)

  interpolate: (v, animationOptions, callback) ->
    _callback = null
    if Number(v) == @_value then return
    for argument in arguments
      if _.isFunction(argument) then _callback = argument

    parent = @

    proxy = new Layer
      name: "#{@name}proxy"
      parent: @
      height: 1, width: 1
      backgroundColor: "red"
      opacity: 0
      y: parent.value

    proxy.onAnimationEnd ->
      if _callback? then _callback()
      @.destroy()
      parent.emit("interpolationFinished", parent._value)

    animationOptions ?=
      time: 0.4
      curve: "ease-in-out"
    animationOptions.properties =
      y: v

    proxy.on "change:y", ->
      parent.value = @.y

    proxy.y = parent.value
    proxy.animate animationOptions

exports.ValueLayer = ValueLayer
