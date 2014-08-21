###  Assignment ### # preserve comments
number = 42
opposite = true

### Conditions ###
number = -42 if opposite

### if, else, conditional ###
mood = greatlyImproved if singing

if happy and knowsit
	clapHands()
	chaChaaaa()
else
	showIt()
	
date = if friday then sue else jill

### Modules ###
MODULE = (($, PARENT)->
	config =
		test: 'value'
	add = (x, y) ->
		result = x + y
		result
	PARENT.prototype.ADD = add
	PARENT
)(jQuery, APP || {})

### splats ###
gold = silver = rest = "unknown"

awardMedals = (first, second, others...) ->
	gold = first
	sivler = second
	rest = others
	
contenders = [
	"Michael Phelps"
	"Liu Xiang"
	"Yao Ming"
	"Allyson Felix"
	"Shawn Johnson"
	"Roman Sebrle"
	"Guo Jingjing"
]

awardMedals contenders...

alert "Gold: " + gold
alert "Silver: " + silver
alert "The Fields " + rest

### loops ###
eat food for food in ['toast','cheese','wine']

courses = ['greens','caviar','truffles','roast','cake']
menu i + i, dish for dish, i in courses

foods = ['broccoli','spinach','chocolate']
eat food for food in foods when food isnt 'chocolate'

### comprehensions ###
countdown = (num for num in [10..1])

yearsOld = max: 10, ida: 9, tim: 11

ages = for own child, age of yearsOld
	"#{child} is #{age}"

	
### existentials ### 
solipsism = true if mind? and not world?
speed = 0
speed ?= 15
footprints = yeti ? "bear"
























