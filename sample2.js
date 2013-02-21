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
	var cell = '';
	debugger
	$('#export th,td').each(function () {
		cell = this.innerHTML;
		ExcelSheet.ActiveSheet.Cells(j + 1, i + 1).Value = cell;
		i++;
		if (i > columns) {
			i = 0;
			j++
		}
	});
	window.focus();	
}
