bg = new BackgroundLayer
	backgroundColor: "#fafafa"

class ValueLayer extends Layer
	constructor: (options) ->
		@formatString = if options.formatString then options.formatString else (v) -> v
		@_value = if options.value then options.value else 0
		@_sigfigs = if options.sigfigs then options.sigfigs else 0
		
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
# 		parent.proxy.animate
# 			properties:
# 				y: v
# 			time: 0.4
# 			curve: "ease-in-out"
		parent.proxy.animate animationOptions

		

scalingFactors =
	euro: 0.91
	pound: 0.76
	burrito: 0.1333
	

textStyle =
	fontSize: "48px"


dollars = new ValueLayer
	width: Screen.width
	height: 72
	x: 100, y: 100
	backgroundColor: "transparent"
	style: textStyle
	formatString: (v) -> return "Suzie has <span style='color: red'>#{v}</span> dollars"
	value: 10
euros = new ValueLayer
	width: Screen.width
	height: 72
	x: 100, y: dollars.maxY
	backgroundColor: "transparent"
	style: textStyle
	formatString: (v) -> return "Suzie has <span style='color: blue'>#{v}</span> euro"
	value: dollars.value * scalingFactors.euro
pounds = new ValueLayer
	width: Screen.width
	x: 100, y: euros.maxY
	height: 72
	backgroundColor: "transparent"
	style: textStyle
	formatString: (v) -> return "Suzie has <span style='color: purple'>#{v}</span> euro"
	value: dollars.value * scalingFactors.pound


bottomGroup = new Layer
	width: Screen.width
	
inputField = new Layer
	html: """
		<input id="input" type="number" value ="1120" style="height: 100px; font-size: 48px; padding-left: 10px; width: 100%; box-sizing: border-box; text-align: center; border: 1px solid #ccc"></input>
	"""
	width: Screen.width
	height: 100
	y: 0
	parent: bottomGroup
setValueButton = new Layer
	width: Screen.width
	height: 100
	backgroundColor: "cornflowerblue"
	html: "Set Value"
	style:
		lineHeight: "100px"
		fontSize: "32px"
		textTransform: "uppercase"
		fontWeight: "bold"
		textAlign: "center"
	minY: inputField.maxY
	parent: bottomGroup

bottomGroup.height = setValueButton.height + inputField.height

bottomGroup.states.add
	offscreen:
		opacity: 0
		minY: Screen.height
	onscreen:
		opacity: 1
		maxY: Screen.height
bottomGroup.states.switchInstant "offscreen"

dollars.interpolate 1120, time: 0.5, curve:"ease-in-out", -> Utils.delay(0.5, -> bottomGroup.states.switch "onscreen", time: 0.5, curve: "ease-in-out")
dollars.on "change:value", (v) ->
	euros.value = v * scalingFactors.euro
	pounds.value = v * scalingFactors.pound




_inputField = document.querySelector("#input")
setValueButton.onMouseOver ->
	@backgroundColor = new Color(@backgroundColor).darken(5)
setValueButton.onMouseOut ->
	@backgroundColor = new Color(@backgroundColor).lighten(5)

setValueButton.onClick ->
	dollars.interpolate(_inputField.value)