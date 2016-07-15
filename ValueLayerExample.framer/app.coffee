################################################################################
# Updated 15 Jul 2016 by Trevor Phillippi || @trevorphillippi
################################################################################

{ValueLayer} = require "ValueLayer"
bg = new BackgroundLayer
	backgroundColor: "#fafafa"

scalingFactors =
	euro: 0.91
	pound: 0.76
	burrito: 0.1333

# Create the ValueLayers
dollars = new ValueLayer
	width: Screen.width, height: 72, x: 100, y: 100
	backgroundColor: "transparent"
	style: fontSize: "48px", color: "black"
	formatString: (v) -> return "Suzie has <span style='color: cornflowerblue; font-weight: bold'>$#{v}</span> USD"
	value: 10
euros = new ValueLayer
	width: Screen.width, height: 72, x: 100, y: dollars.maxY
	backgroundColor: "transparent"
	style: fontSize: "48px", color: "black"
	formatString: (v) -> return "which is <span style='color: red; font-weight: bold'>€#{v}</span> EUR"
	value: dollars.value * scalingFactors.euro
pounds = new ValueLayer
	width: Screen.width, height: 72, x: 100, y: euros.maxY
	backgroundColor: "transparent"
	style: fontSize: "48px", color: "black"
	formatString: (v) -> return "which is <span style='color: purple; font-weight: bold'>£#{v}</span> GBP"
	value: dollars.value * scalingFactors.pound
burritos = new ValueLayer
	width: Screen.width, height: 72, x: 100, y: pounds.maxY
	backgroundColor: "transparent"
	style: fontSize: "48px", color: "black"
	formatString: (v) -> return "which is <span style='color: green; font-weight: bold'>#{v}</span> burritos"
	value: dollars.value * scalingFactors.burrito


# Create/configure the input field and "accept" button
bottomGroup = new Layer
	width: Screen.width

inputField = new Layer
	width: Screen.width, height: 100, y: 0
	parent: bottomGroup
	html: """
		<input id="input" type="number" value ="1120"
			style="height: 100px;
					font-size: 48px;
					padding-left: 10px;
					width: 100%;
					box-sizing: border-box;
					text-align: center;
					border: 1px solid #ccc"
		></input>
	"""
_inputField = document.querySelector("#input")

setValueButton = new Layer
	parent: bottomGroup
	width: Screen.width, height: 100
	backgroundColor: "cornflowerblue"
	style:
		lineHeight: "100px"
		fontSize: "32px"
		textTransform: "uppercase"
		fontWeight: "bold"
		textAlign: "center"
	minY: inputField.maxY
	html: "Set Value"

bottomGroup.height = setValueButton.height + inputField.height

bottomGroup.states.add
	offscreen:
		opacity: 0
		minY: Screen.height
	onscreen:
		opacity: 1
		maxY: Screen.height
bottomGroup.states.switchInstant "offscreen"



# Have the other 3 currencies listen for changes to dollars
dollars.on "change:value", (v) ->
	euros.value = v * scalingFactors.euro
	pounds.value = v * scalingFactors.pound
	burritos.value = v * scalingFactors.burrito

# Hover states for button
setValueButton.onMouseOver ->
	@backgroundColor = new Color(@backgroundColor).darken(5)
setValueButton.onMouseOut ->
	@backgroundColor = new Color(@backgroundColor).lighten(5)

# When button is clicked, get the value attribute of _inputField (a reference to a DOM element)
setValueButton.onClick ->
	dollars.interpolate _inputField.value

# Start the prototype by animating the numbers – show the bottomGroup when it's finished
dollars.interpolate 1120, time: 0.5, curve:"ease-in-out", -> Utils.delay(0.5, -> bottomGroup.states.switch "onscreen", curve: "spring(500, 50, 0)")