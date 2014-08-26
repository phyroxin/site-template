$(document).ready ->
	$(document)
		.on 'click', '#id', ->
			alert 1
			return
	
	workspace = new Workspace()
	Backbone.history.start()
	
	setTimeout(->
		console.log 'timeout'
		newBackboneView = new NewBackboneView()
		newBackboneView.render()
		return
	, 3 * 1000)
	
	return