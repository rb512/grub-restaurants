# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
$.rails.allowAction = (link) ->
  return true unless link.attr('data-confirm')
  $.rails.showConfirmDialog(link) # look bellow for implementations
  false # always stops the action since code runs asynchronously

$.rails.confirmed = (link) ->
  link.removeAttr('data-confirm')
  link.trigger('click.rails')

$.rails.showConfirmDialog = (link) ->
  message = link.attr 'data-confirm'
  html = """
		 <div class="modal small hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		     <div class="modal-header">
		         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		         <h3 id="myModalLabel">Delete Confirmation</h3>
		     </div>
		     <div class="modal-body">
		         <p class="error-text">Are you sure you want to delete?</p>
		     </div>
		     <div class="modal-footer">
		         <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
		         <button class="btn btn-danger" data-dismiss="modal">Delete</button>
		     </div>
		 </div>
         """
		 
  $(html).modal()
  $('#confirmationDialog .confirm').on 'click', -> $.rails.confirmed(link)