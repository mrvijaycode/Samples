function xlsIE() {
	var ExcelApp = new ActiveXObject("Excel.Application");
	var ExcelSheet = new ActiveXObject("Excel.Sheet");
	
	ExcelSheet.Application.Visible = true;
	
	var columns = -1;
	$('#export tr:nth-child(1) td').each(function () {
		if ($(this).attr('colspan')) {
			columns += +$(this).attr('colspan');
		} else {
			columns++;
		}
	});
	
	var i = 0;
	var j = 0;

	$('#export tr').each(function (i) {
		$(this).find('th,td').each(function (j) {
			ExcelSheet.ActiveSheet.Cells(i + 1,j + 1).Value = $(this).text();
		});
	});
	window.focus();
}
