################################################################################
# Updated 15 Jun 2016 by Trevor Phillippi || @trevorphillippi
################################################################################
#
# Usage:
#
#   {ValueLayer} = require "ValueLayer"
# 	currencyLayer = new ValueLayer
#      value: 100
#      rounding: 2
#      formatString: (v) -> "$#{v}"
#
# To do:
#   - make values editable in place
#   - make richer animation options
#
################################################################################


class ValueLayer extends Layer
  constructor: (options) ->

    # Configure instance variable defaults
    @_formatString = options.formatString ? (v) -> v
    @_value = options.value ? 0
    @_rounding = options.rounding ? 0

    super options

  @define "value",
    get: -> @_value
    set: (v) ->
      # Round the value if rounding is enabled
      @_value = if @_rounding == false then v else Utils.round(v, @_rounding)
      @emit("change:value", @_value)

      @html = @formatString(@_value)

  @define "rounding",
    get: -> @_rounding
    set: (r) -> @_rounding = r

  @define "formatString",
    get: -> @_formatString
    set: (f) ->
      @_formatString = f
      @html = f(@_value)


  interpolate: (v, animationOptions, callback) ->
    # If the destination value is current value, exit
    if Number(v) == @_value then return

    # Create a separate callback variable so we have flexibility in argument order
    _callback = null

    # Check if a callback is supplied in the 2nd or 3rd arguments
    for argument in arguments
      # Store the argument if it's a function, intended as callback
      if _.isFunction(argument) then _callback = argument


    # Store reference to instance, to reference when scope changes
    parent = @


    # Create a proxy layer to animate its y position
    proxy = new Layer
      name: "#{@name}proxy"
      parent: @
      height: 1, width: 1, x: -9999
      opacity: 0
      y: parent.value

    proxy.onAnimationEnd ->
      if _callback? then _callback()
      @.destroy()
      parent.emit("interpolationFinished", parent._value)

    # If animationOptions aren't supplied as an argument, apply some defaults
    animationOptions ?=
      time: 0.4
      curve: "ease-in-out"
    animationOptions.properties =
      y: v

    # Every time the proxy's y change, update the value of the instance
    proxy.on "change:y", ->
      parent.value = @.y

    # Trigger the animation
    proxy.animate animationOptions

exports.ValueLayer = ValueLayer
