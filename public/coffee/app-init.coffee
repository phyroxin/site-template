$(document).ready ->

	$(document)
		.on 'click', '#id', ->
			alert 1
			return
	
	workspace = new Workspace()
	Backbone.history.start()
	setTimeout(->
		newBackboneView = new NewBackboneView()
		return
	, 3 * 1000)