
//get users from group
function abc() {
	$().SPServices({
		operation : "GetUserCollectionFromGroup",
		async : false,
		groupName : "Clarity Members",
		completefunc : function (xData, Status) {
			
			alert("Status: " + Status);
			alert("Output: " + xData.responseText);
			
			$(xData.responseXML).SPFilterNode("User").each(function () {
				var liHtml = $(this).attr("Name");
				alert(liHtml);
			});
		}
	});
}
