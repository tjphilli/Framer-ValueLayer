# Add the following line to your project in Framer Studio.
# {ValueLayer} = require "ValueLayer"
# instantiate new instances with: new ValueLayer


class ValueLayer extends Layer
  constructor: (options) ->
    @formatString = options.formatString ? (v) -> v
    @_value = options.value ? 0
    @_sigfigs = options.sigfigs ? 0

    super options
    @style =
      color: "black"

    parent = @
    @proxy = new Layer
      height: 1, width: 1
      backgroundColor: "red"
      opacity: 0
      y: parent.value
    @proxy.onAnimationEnd ->
      if parent.callback? then parent.callback()

  @define "value",
    get: -> @_value
    set: (v) ->
      @_value = Utils.round(v, @_sigfigs)
      @html = @formatString(@_value)
      @emit("change:value", @_value)

  interpolate: (v, animationOptions, callback) ->
    parent = @
    @callback = callback

    animationOptions ?=
      time: 0.4
      curve: "ease-in-out"
    animationOptions.properties =
      y: v

    @proxy.on "change:y", ->
      parent.value = Utils.round(@.y)

    parent.proxy.y = parent.value
    parent.proxy.animate animationOptions

exports.ValueLayer = ValueLayer
