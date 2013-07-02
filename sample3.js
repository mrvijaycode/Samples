function PreSaveAction() {

	//var strUrl = "http://teamspace.pg.com/sites/cppdpolicy";
	//var splists = new SPAPI_Lists(strUrl);

	//var Title = document.getElementById("ctl00_m_g_3d6a33d3_52b2_4197_9a75_cab6fcbabb61_ctl00_ctl04_ctl00_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").value;
	
	var isOKay=false;

	var Title = $("#ctl00_WebPartManager_g_3d6a33d3_52b2_4197_9a75_cab6fcbabb61_ctl00_ctl04_ctl00_ctl00_ctl00_ctl04_ctl00_ctl00_TextField").val();

	if ((Title != '') && (Title != ' ')) {
		Title = CorrectStringAsSPData(Title);
		Title = trim(Title);
		sQuery = "<Query><Where><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" + Title + "</Value></Eq></Where></Query>";
		//var oWs = splists.getListItems("Categories", "", sQuery, "", "", "", "");


		$().SPServices({
			operation : "GetListItems", //Method name
			async : false,
			//webURL : webUrl,//pass webUrl dynamically
			listName : "Categories", // List Name
			//CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
			//CAMLViewFields: "<ViewFields><FieldRef Name='Title' /></ViewFields>",
			CAMLQuery : sQuery,
			//CAMLRowLimit: 1,
			completefunc : function (xData, Status) {

				if (xData.status == 200) {
					//alert(xData.responseText);
					if (($(xData.responseXML).SPFilterNode("z:row").length) > 0) {
						alert('Standard topic name already exists')
						isOKay = false;
					} else {
						alert('Successfully created..');
						isOKay = true;
					}
				} else {
					alert('Connection status is :' + xData.status)
				}
			}
		});

		/*
		if (oWs.status == 200) {
		//alert(oWs.responseText)
		var rows = oWs.responseXML.getElementsByTagName('z:row');

		if (rows.length > 0) {
		alert('Standard topic name already exists')
		return false;

		} else {
		//alert('Successfully created..')
		return true;
		}

		} else {

		alert('Connection status is :' + oWs.status)
		}
		 */
	} else {
		alert('Please enter Standard topic name');
	}
	
	return isOKay;
}
