jQuery ->
	$.fn.dataTableExt.oPagination.iFullNumbersShowPages = 3;
	$('#menu-items').dataTable()
		bPagination: true
		sPaginationType: "bootstrap"
		bJQueryUI: true
		bScrollCollapse: true