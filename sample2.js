$(document).ready(function () {
	$().SPServices({
		operation : "GetListItems", //Method name
		async : false,
		//webURL : webUrl,//pass webUrl dynamically
		listName : "SCHOOL", // List Name
		//CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		//CAMLViewFields: "<ViewFields><FieldRef Name='Title' /></ViewFields>",
		CAMLQuery:"",
		//CAMLRowLimit: 1,
		completefunc : function (xData, Status) {
		
			alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("z:row").each(function () {
				
				//var keyMeasure = $(this).attr("ows_Key_x0020_Measure");			
				
			});
		}
	});
});
