cornFlowerGrey = new Color "#455064"

{ValueLayer} = require "ValueLayer"
bg = new BackgroundLayer
	backgroundColor: cornFlowerGrey
	
currencies = 
	dollar:
		symbol: "$"
		abbrev: "USD"
		scalingFactor: 1
	euro:
		symbol: "€"
		abbrev: "EUR"
		scalingFactor: 0.91
	pound:
		symbol: "£"
		abbrev: "GBP"
		scalingFactor: 0.76
	burrito:
		symbol: ""
		abbrev: "BURRITOS"
		scalingFactor: 0.1333
	

textStyle =
	fontSize: "28px"
	fontWeight: 700
	lineHeight: "36px"
	padding: "16px"

topSection = new Layer
	width: 750
	height: 129
	y: -1
	image: "images/topSection.png"


currencyUnitWidth = Screen.width / 4


currencyDisplayLayers = []

currentCurrencyLayer = null


# Input Field / Button Group
bottomGroup = new Layer
	width: Screen.width - 240
	borderRadius: 10
	height: 414
	backgroundColor: "rgb(230, 230, 230)"
	shadowSpread: 3
	shadowColor: "rgba(0,0,0,0.32)"
	shadowBlur: 15

setValueButton = new Layer
	parent: bottomGroup
	width: bottomGroup.width, height: 128
	backgroundColor: "cornflowerblue"
	style:
		lineHeight: "128px"
		fontSize: "36px"
		textTransform: "uppercase"
		fontWeight: "bold"
		textAlign: "center"
		borderRadius: "0 0 6px 6px"
	maxY: bottomGroup.height
	html: "Set Value"

inputField = new Layer
	width: bottomGroup.width, height: 140
	maxY: setValueButton.minY - 40
	backgroundColor: "transparent"
	parent: bottomGroup
	html: """
		<input id="input" type="number" value="1120" pattern="[0-9]*" inputmode="numeric"
			style="height: 140px;
					font-size: 128px;
					padding-left: 20px;
					width: 100%;
					box-sizing: border-box;
					text-align: center;
					font-family: Helvetica;
					font-weight: 100;
					color: #{cornFlowerGrey};
					background-color: transparent;
					outline: none;
					"
		/>
	"""
_inputField = document.querySelector("#input")
currentCurrencyLabel = new Layer
	parent: bottomGroup
	width: bottomGroup.width
	y: 28
	backgroundColor: "transparent"
	style:
		color: cornFlowerGrey
		fontWeight: "bold"
		fontSize: "32px"
		textAlign: "center"




setCurrency = (layer, currency) ->
	currentCurrencyLayer?.backgroundColor = "#3B475B"
	currentCurrencyLayer?.borderColor = "transparent"
	currentCurrencyLayer = layer
	currentCurrencyLayer.backgroundColor = cornFlowerGrey
	currentCurrencyLayer.style =
		borderBottom: "2px solid cornflowerblue"
	currentCurrencyLabel.html = currency.abbrev
	_inputField.value  = layer.value

for key, obj of currencies
	do(obj) ->
		c = new ValueLayer
			name: key
			width: currencyUnitWidth, height: 108,
			x: if currencyDisplayLayers.length is 0 then 0 else currencyDisplayLayers[currencyDisplayLayers.length - 1].maxX
			y: topSection.maxY
			backgroundColor: "#3B475B"
			style: textStyle
			formatString: (v) -> return "#{obj.abbrev} <br> <span style='font-size: 32px; font-weight: 500;'>#{obj.symbol} #{v}</span>"
			value: if currencyDisplayLayers.length is 0 then 10 else currentCurrencyLayer.value * obj.scalingFactor
		if key is "dollar" then setCurrency c, obj
		currencyDisplayLayers.push c
		c.onClick ->
			setCurrency c, obj

currentCurrencyLayer.on "change:value", (v) ->
	for currencyDisplayLayer in currencyDisplayLayers
		unless currencyDisplayLayer.name is "dollar"
			currencyDisplayLayer.value = v * currencies[currencyDisplayLayer.name].scalingFactor

bottomGroup.center()

bottomGroup.states.add
	offscreen:
		opacity: 0
		scale: 0.8
	onscreen:
		opacity: 1
		scale: 1
bottomGroup.states.switchInstant "offscreen"

currentCurrencyLayer.interpolate 1120, time: 0.5, curve:"ease-in-out", ->
	Utils.delay(0.5, -> bottomGroup.states.switch "onscreen", curve: "spring(450, 25, 0)")
	_inputField.value = 1120

_inputField.onfocus = =>
	bottomGroup.animate
		properties: 
			backgroundColor: "white"
		time: 0.2
_inputField.onblur = =>
	bottomGroup.animate
		properties: 
			backgroundColor: "rgb(230, 230, 230)"
		time: 0.2


setValueButton.onMouseOver ->
	@backgroundColor = new Color(@backgroundColor).darken(5)
setValueButton.onMouseOut ->
	@backgroundColor = new Color(@backgroundColor).lighten(5)

setValueButton.onClick ->
	currencyDisplayLayers[0].interpolate _inputField.value * (1 / currencies[currentCurrencyLayer.name].scalingFactor)



