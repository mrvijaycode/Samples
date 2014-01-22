/* Created By : Ravikishore */
/* Created Date :06/17/2013 */

var sourceTable = "";
var clickID;
var srcListName = "SourcingPlan";
var spendPoolListName = "SourcingPlanItems";
var arrayID = new Array();

/*var sourceTable = '<table id="tblSourcePlan" width="100%" class="ms-listviewtable"  border="0" cellSpacing="0" cellPadding="2" >';
sourceTable += '<thead><tr class="ms-vh2" vAlign="top"><th align="center" colspan="2">Sourcing Plan</th><th>Status</th><th>Appr.Date</th><th></th><th></th></tr></thead>';
 */
var sourceTable = '<table id="tblSourcePlan" width="100%" class="tablesorter"  border="0" cellSpacing="0" cellPadding="2" >';
sourceTable += '<thead><tr Align="top"><th align="center" colspan="2">Sourcing Plan</th><th>Status</th><th>Appr.Date</th></tr></thead>';

var loginUser = $().SPServices.SPGetCurrentUser({
		fieldName : "Title",
		debug : false
	});

$(document).ready(function () {

	$('#tdWelcome').text('Welcome ' + loginUser);
	//debugger
	//$('#Image7').append("<IMG src='http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/images/MasterPage Images/my_tasks_hover_btn.jpg'>");

	var query = "<Query><Where><Eq><FieldRef Name='Buyer_SpendPoolOwner'/><Value Type='User'>" + loginUser + "</Value></Eq></Where></Query>";
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : spendPoolListName,
		CAMLQuery : query,
		completefunc : function (xData, Status) {

			$(xData.responseXML).SPFilterNode("z:row").each(function (i) {
				var title = $(this).attr('ows_Title');
				arrayID[i] = title;
			});
		}
	});

	var viewFields = '<ViewFields><FieldRef Name="ID" /><FieldRef Name="Title" /><FieldRef Name="Status" /><FieldRef Name="SourcingPlan" /><FieldRef Name="S_SiteBuyer1_UpManager_ClusterLe0" /></ViewFields>';
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "SourcingPlan",
		CAMLViewFields : viewFields,
		completefunc : function (xData, Status) {
			var resXML = $(xData.responseXML);
			appendSourcingPlans(resXML);
		}
	});
});

function appendSourcingPlans(resXML) {
	var strSourcePlan = "";
	var temp = true;
	$(resXML).SPFilterNode("z:row").each(function () {
		var splID = $(this).attr("ows_ID");
		var ind = $.inArray(splID, arrayID);
		if (ind > -1) {
			//debugger;
			temp = false;
			var sourcePlan = $(this).attr("ows_SourcingPlan");
			if (strSourcePlan.indexOf(sourcePlan) == -1) {
				//var status = $(this).attr("ows_Status");
				var status = $(this).attr("ows_Title");
				if (status == null || status == undefined)
					status = '';
				var date = $(this).attr('ows_S_SiteBuyer1_UpManager_ClusterLe0');
				if (date == null || date == undefined)
					date = '';
				else
					date = reformDate(date);
				strSourcePlan += sourcePlan + "~";
				sourceTable += '<tr><td vAlign="top"><input type="radio" name="dynradio" id="btnRadio" onclick="javascript:getPools(&quot;' + splID + '&quot;)"; /></td><td>' + sourcePlan + '</td><td>' + status + '</td><td>' + date + '</td>';
				sourceTable += '</tr>';
			}
		}
	});
	if (temp) {
		sourceTable += "<tr><td class='ms-vb2' colspan='4'>No tasks are assigned.</td></tr>";
	}

	sourceTable += '</table>';
	$("#mySrcPlanID").html(sourceTable);
	//sort source plan table
	$("#tblSourcePlan").tablesorter();
}

function getPools(id) {
	clickID = id;
	getData(id);
}

function getData(title) {
	var poolTable = "";
	var query = "<Query><Where><And><Eq><FieldRef Name='Title'/><Value Type='Text'>" + title + "</Value></Eq><Eq><FieldRef Name='Buyer_SpendPoolOwner'/><Value Type='User'>" + loginUser + "</Value></Eq></And></Where></Query>";
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : spendPoolListName,
		CAMLQuery : query,
		completefunc : function (xDa, Status) {

			var itemsCount = $(xDa.responseXML).SPFilterNode("rs:data").attr("ItemCount");
			if (itemsCount > 0) {
				$(xDa.responseXML).SPFilterNode("z:row").each(function (i) {
					var spendingPool = $(this).attr("ows_SpendingPool");
					if (spendingPool == "" || spendingPool == 'undefined' || spendingPool == null)
						spendingPool = "";
					var materialCode = $(this).attr("ows_MaterialCode");
					if (materialCode == "" || materialCode == 'undefined' || materialCode == null)
						materialCode = "";
					var buyerSpendPoolOwner = $(this).attr("ows_Buyer_SpendPoolOwner");
					if (buyerSpendPoolOwner == "" || buyerSpendPoolOwner == 'undefined' || buyerSpendPoolOwner == null)
						buyerSpendPoolOwner = "";
					else
						buyerSpendPoolOwner = buyerSpendPoolOwner.split(";#")[1];
					var estimatedSpend = "$" + $(this).attr("ows_EstimatedSpend").split(".")[0];
					if (estimatedSpend == "" || estimatedSpend == 'undefined' || estimatedSpend == null)
						estimatedSpend = "";
					var status = $(this).attr("ows_Status");
					if (status == "" || status == 'undefined' || status == null)
						status = "";
					var curID = $(this).attr("ows_ID");
					var supplier = $(this).attr("ows_Supplier");
					if (supplier == "" || supplier == 'undefined' || supplier == null)
						supplier = "";
					var purchasingProcess = $(this).attr("ows_PurchasingProcess");
					if (purchasingProcess == "" || purchasingProcess == 'undefined' || purchasingProcess == null)
						purchasingProcess = "";
					
					var specAvailableDate = $(this).attr("ows_SpecificationAvailableDate");
					
					if (specAvailableDate == "" || specAvailableDate == 'undefined' || specAvailableDate == null)
						specAvailableDate = "";
					else
						specAvailableDate = reformDate(specAvailableDate);
					
					var comments = $(this).attr("ows_Notes");
					if (comments == "" || comments == 'undefined' || comments == null)
						comments = "";
						
						
						var sourceTime = $(this).attr("ows_SourcingTiming");
					if (sourceTime == "" || sourceTime == 'undefined' || sourceTime == null)
						sourceTime = "";

					poolTable += '<tr>';
					poolTable += '<td  class="ms-vb2"><label id="lblSpPool' + i + '">' + spendingPool + '</label></td>';
					poolTable += '<td class="ms-vb2"><label id="lblmaterialCode' + i + '">' + materialCode + '</label></td>';
					poolTable += '<td class="ms-vb2"><label id="lblbspo' + i + '">' + buyerSpendPoolOwner + '</label></td>';
					poolTable += '<td class="ms-vb2"><label id="lblestimated' + i + '">' + estimatedSpend + '</label></td>';
					poolTable += '<td class="ms-vb2"><label id="lblestimated' + i + '">' + reformDate(sourceTime) + '</label></td>';
					poolTable += '<td class="ms-vb2">';
					poolTable += buildSelectBox(status, i);
					poolTable += '<label id="lblStatus' + i + '">' + status + '</label></td>';
					poolTable += '<td class="ms-vb2"><input type="text" id="txtSupplier' + i + '" value="' + supplier + '" style="display:none"><label id="lblSupplier' + i + '">' + supplier + '</label></td>';
					poolTable += '<td class="ms-vb2">' + buildPurpose(purchasingProcess,i) + '<label id="lblPurProcess' + i + '">' + purchasingProcess + '</label></td>';
					poolTable += '<td class="ms-vb2"><input type="text" id="txtSpecAvaDate' + i + '" value="' + specAvailableDate + '" style="display:none"><label id="lblSpecAvaDate' + i + '">' + specAvailableDate + '</label></td>';
					poolTable += '<td class="ms-vb2"><textarea  rows=3 cols=10 id="txtComments' + i + '"  style="display:none">' + comments + '</textarea><label id="lblComments' + i + '">' + comments + '</label></td>';
					//poolTable += '<td><img src="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site Pages/updatebtn.jpg" onclick="goEdit(' + i + ');" alt="" /></td>';
					poolTable += '<td valign="top"><img alt="Edit" id="editID' + i + '" src="/_layouts/images/edititem.gif" border="0" onclick="goEdit(' + i + ');" alt="" /></td>';
					//poolTable += '<td ><input type="button"  id="btnUpdate' + i + '" disabled="disabled" onclick="updateItem(&quot;' + curID + '&quot;,' + i + ')" value="Update"></td>';
					poolTable += '<td valign="top"><img style="display:none" alt="Update" src="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site Pages/updatebtn.jpg" border="0"  id="btnUpdate' + i + '"   onclick="updateItem(&quot;' + curID + '&quot;,' + i + ')" value="Update"><img style="display:none" alt="Cancel" src="/_layouts/images/delitem.gif" border="0"  id="btnCancel' + i + '" onclick="goEdit(' + i + ');" value="Cancel"></td>';
					//poolTable += '<td><img style="display:none" alt="Cancel" src="/_layouts/images/delitem.gif" border="0"  id="btnCancel' + i + '"   onclick="updateItem(&quot;' + curID + '&quot;,' + i + ')" value="Update"></td>';
					poolTable += '<td class="ms-vb2" valign="top"><a href="http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Lists/SourcingPlanItems/EditSourcingPlanItems.aspx?ID=' + curID + '&Source=http://teamspace.pg.com/sites/sourcingplanmanager/capitalsrc/Site%20Pages/MyTasks.aspx">Edit</a></td></tr>'; // Added 6/18/13 by chinna
				});
			}
		}
	});

	var cols = "";
	cols += '<tr>';
	cols += '<th>Spending Pool</th>';
	cols += '<th>Material Code</th>';
	cols += '<th>Buyer_SpendPoolOwner</th>';
	cols += '<th>Estimated Spend</th>';
	cols += '<th>Status</th>';
	cols += '<th>Supplier</th>';
	cols += '<th>Purchasing process</th>';
	cols += '<th>Spec available date</th>';
	cols += '<th>Comments</th>';
	cols += '<th colspan="3">&nbsp;</th>';
	cols += '</tr>';
	if (poolTable == "")
		poolTable = "<tr><td>No records found.</td></tr>";
	poolTable = "<table id='tblSpendPool' width='100%' cellspacing='0' cellpadding='8' class='tablesorter'><thead>" + cols + "</thead>" + poolTable + "</table>";
	$("#mySrcpoolID").html(poolTable);
	$("#tblSpendPool").tablesorter();
}

function buildSelectBox(status, num) {

	var formOptions = "";
	switch (status) {
	case "Create":
		formOptions += '<select id="selStatus' + num + '" style="display:none"><option selected="selected">Create</option><option>In Process</option><option>Completed</option><option>Awarded<option>Cancelled</option></select>';
		break;
	case "In Process":
		formOptions += '<select id="selStatus' + num + '" style="display:none"><option>Create</option><option selected="selected">In Process</option><option>Completed</option><option>Awarded<option>Cancelled</option></select>';
		break;
	case "Completed":
		formOptions += '<select id="selStatus' + num + '" style="display:none"><option>Create</option><option>In Process</option><option selected="selected">Completed</option><option>Awarded<option>Cancelled</option></select>';
		break;
	case "Awarded":
		formOptions += '<select id="selStatus' + num + '" style="display:none"><option>Create</option><option>In Process</option><option>Completed</option><option selected="selected">Awarded</option><option>Cancelled</option></select>';
		break;
	case "Cancelled":
		formOptions += '<select id="selStatus' + num + '" style="display:none"><option>Create</option><option>In Process</option><option>Completed</option><option>Awarded</option><option selected="selected">Cancelled</option></select>';
		break;
	}
	return formOptions;
}

//for the process
function buildPurpose(strVal, num) {
	var formOptions = "";
	switch (strVal) {
	case "Competitive Inquiry":
		formOptions += '<select id="selPurProcess' + num + '" style="display:none"><option selected="selected">Competitive Inquiry</option><option>Negotiation</option><option>Price List</option></select>';
		break;
	case "Negotiation":
		formOptions += '<select id="selPurProcess' + num + '" style="display:none"><option>Competitive Inquiry</option><option selected="selected">Negotiation</option><option>Price List</option></select>';
		break;
	case "Price List":
		formOptions += '<select id="selPurProcess' + num + '" style="display:none"><option>Competitive Inquiry</option><option>Negotiation</option><option selected="selected">Price List</option></select>';
		break;
	}
	return formOptions;
}

/// updating selected item
function updateItem(idOfItem, num) {
	var status = $("#selStatus" + num + "").val(); //.val();
	var supplier = $("#txtSupplier" + num + "").val();
	var purProcess = $("#selPurProcess" + num + "").val();
	var SpecAvaDate = $("#txtSpecAvaDate" + num + "").val();
	var comments = $("#txtComments" + num + "").val();
	SpecAvaDate = formDate(SpecAvaDate);

	$().SPServices({
		operation : "UpdateListItems",
		listName : spendPoolListName,
		ID : idOfItem,
		valuepairs : [["Notes", comments], ["Status", status], ["Supplier", supplier], ["PurchasingProcess", purProcess], ["SpecificationAvailableDate", SpecAvaDate]],
		completefunc : function (xData, Status) {
			if (Status)
				getPools(clickID);
		}
	});
}

function goEdit(num) {
	//debugger;
	$('#editID' + num + '').hide();
	$('#btnUpdate' + num + '').show();
	$('#btnCancel' + num + '').show(); //added on 18/6/13 by chinna
	var spID = "txtSupplier" + num;
	if ($("#" + spID + "").is(':visible')) {
		$("#selStatus" + num + "").hide();
		$("#txtSupplier" + num + "").hide();
		$("#selPurProcess" + num + "").hide();
		$("#txtSpecAvaDate" + num + "").hide();
		$("#txtComments" + num + "").hide();
		$("#lblStatus" + num + "").show();
		$("#lblPurProcess" + num + "").show();
		$("#lblSupplier" + num + "").show();
		$("#lblComments" + num + "").show();
		$("#lblSpecAvaDate" + num + "").show();
		$("#btnUpdate" + num + "").attr('disabled', true);

		$('#btnUpdate' + num + '').hide();
		$('#btnCancel' + num + '').hide();
		$('#editID' + num + '').show();

	} else {
		$('#btnUpdate' + num + '').show(); //added on 18/6/13 by chinna

		$("#selStatus" + num + "").show();
		$("#txtSupplier" + num + "").show();
		$("#selPurProcess" + num + "").show();
		$("#txtSpecAvaDate" + num + "").show();
		$("#txtComments" + num + "").show();
		$("#lblStatus" + num + "").hide();
		$("#lblPurProcess" + num + "").hide();
		$("#lblSupplier" + num + "").hide();
		$("#lblComments" + num + "").hide();
		$("#lblSpecAvaDate" + num + "").hide();
		$("#btnUpdate" + num + "").attr('disabled', false);
	}
	$("#txtSpecAvaDate" + num + "").datepicker();
}

function formDate(date) {
	var dt = date.split("/");
	var newDate = dt[2] + "-" + dt[0] + "-" + dt[1] + " T00:00:00Z";
	return newDate;

}

function reformDate(date) {
	var curdate = date.split(" ")[0];
	curdate = curdate.split("-");
	curdate = curdate[1] + "/" + curdate[2] + "/" + curdate[0];
	return curdate
}
