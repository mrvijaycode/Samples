
//***************************************************************
//* Project Name     : GSS
//* Application name :Genomics Experiments
//* Dependencies     :
//* Limitations      :
//* Created Date     :30 Dec 2012
//* Author           :Vijay Bhaskar C
//****************************************************************

var curUser = $().SPServices.SPGetCurrentUser();
var fileAdded = false;
//var curUser = "NA\\yeddula.ar";
//var curUser = "CN\\bolla.su";
//var curUser = "EU\\terala.l";
//var curUser = "ap\\thaduri.us";
//var curUser = "AP\\chittavajhula.v";

function CorrectStringAsSPData(strValue) {
	//Replace & symbol
	var givenString = strValue.replace(/&/g, "&amp;");
	
	//Replace < symbol
	givenString = givenString.replace(/</g, "&lt;");
	
	//Replace > symbol
	givenString = givenString.replace(/>/g, "&gt;");
	
	//alert(givenString)
	return jQuery.trim(givenString);
}

function CorrectSPDataAsString(strValue) {
	//Replace & symbol
	var givenString = strValue.replace(/&amp;/g, "&");
	
	//Replace < symbol
	givenString = givenString.replace(/&lt;/g, "<");
	
	//Replace > symbol
	givenString = givenString.replace(/&gt;/g, ">");
	
	//alert(givenString)
	return jQuery.trim(givenString);
}

var MileIDs = "";
var escOtherUsers = '';
var studyAuthor = "";

var todayDate = today()[0] + "/" + today()[1] + "/" + today()[2];
//var todayDate = "02/03/2013";

var logMilestones = "";

var needReason = false;

var url = window.location.search;
var n = url.indexOf("itmid");

var IshavingItm = false;
var itmid = "";

var GSSID = "";
var StudyObj;
var RemainderIDS = "";
var EscalationIDs = "";

var addEdit = false;
var cancelStudy = false
	var needCommentOnTissueType = false;
var needTabSetup = true; // tab open when refresh..
var needAlert = false;

var step = "";
var STEP1 = "Step1";
var STEP2 = "Step2";
var STEP3 = "Step3";
var STEPM1 = "StepM1";
var STEPM2A = "StepM2a";
var STEPM2B = "StepM2b";
var STEPM2C = "StepM2c";
var STEPM2D = "StepM2d";
var STEPM3A = "StepM3a";
var STEPM3B = "StepM3b";
var STEPM4 = "StepM4";

var HIDE = "hide";
var SHOW = "show";

//keywords for the divs
var DIV_REQUEST_STUDY = "divmain";
var DIV_STUDY_INFORMATION = "div1";
var DIV_MILESTONES = "div5";

var DIV_BUGC = "div2";
//div2(BU/GC Study details) is splitted into 3 parts
var DIV_BU = "divBU";
var DIV_GC = "divGC";
var DIV_BUGC_BUTTONS = "divBtns";

var DIV_STATISTICS = "div3";
var DIV_BIOINFORMATICS = "div4";

var currGroup = "";

var dateM1 = "";
var dateM2a = "";
var dateM2b = "";
var dateM2c = "";
var dateM2d = "";
var dateM3a = "";
var dateM3b = "";
var dateM4 = "";

function getStudyID(itemID) {
	var viewFlds = "<ViewFields><FieldRef Name='ID' /></ViewFields>";
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Study",
		CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		CAMLQuery : "<Query><Where><Eq><FieldRef Name='GSSID' /><Value Type='Text'>" + itemID + "</Value></Eq></Where></Query>",
		CAMLViewFields : viewFlds,
		completefunc : function (xData, Status) {
			
			$(xData.responseXML).SPFilterNode("z:row").each(function () {
				$(location).attr('href', 'http://teamspace.pg.com/sites/genomics/Site%20Assets/Pages/studyForm.aspx?itmid=' + $(this).attr('ows_ID'));
			});
		}
	});
}

//hide load image
$(window).load(function () {
	var AuthorName = $("a[id$='txtTitle']").val();
	$("input[disabled='disabled']").addClass('disabled');
	$("textarea[disabled='disabled']").addClass('disabled');
	$("select[disabled='disabled']").addClass('disabled');
	$("div[title='People Picker']").addClass('disabled');
});

//onload function
$(document).ready(function () {
	$('body').fadeTo("slow", 0.3);
	if ($(location).attr('href').indexOf('?') > 0 && $(location).attr('href').split('?').length > 0) {
		var ItemID = $(location).attr('href').split('?')[1].split("=")[0];
		if (ItemID == "gssid")
			getStudyID($(location).attr('href').split('?')[1].split("=")[1]);
	}
	
	if (n > -1)
		IshavingItm = true;
	else
		IshavingItm = false;
	//alert(IshavingItm);
	
	$("#progressbar").hide();
	
	//submit study information
	$('#studyInfo').click(function () {
		submitStudyInfo();
	});
	
	$('#btnMilestones').click(function () {
		submitMilestoneInfo();
		
	});
	
	$('#btnBuGc').click(function () {
		submitstudyDetails();
	});
	
	$('#btnStatistics').click(function () {
		submitStatistics();
	});
	
	$('#btnBioInfo').click(function () {
		//$('#divLoad').show();
		submitBioinfo();
	});
	
	$("#selRevMStone").change(function () {
		var selMilestone = $(this).val();
		//alert(selMilestone);
		fillReasonforChange(selMilestone);
	});
	
	// cancel study method loading
	$("#chkCancel").click(function () {
		if ($("#chkCancel").prop("checked")) {
			
			jConfirm(' Do you want to Cancel this Study?', 'Confirmation Dialog', function (r) {
				if (r) {
					$("#lblCancel").show();
					$("#selCancelReason").show();
					cancelStudy = true;
				} else {
					$("#chkCancel").attr("checked", false);
					$("#lblCancel").hide();
					$("#selCancelReason").hide();
				}
			});
			
		}
		if (!$("#chkCancel").prop("checked")) {
			$("#lblCancel").hide();
			$("#selCancelReason").hide();
			cancelStudy = false;
		}
	});
	
	$('#btnEdit').click(function () {
		divMileStonesEdit(SHOW);
		addEdit = true;
		
		$("#btnCancel").show();
		
		if ($("#txtM1Date").val() == "")
			$("#PlannedSmplDate").attr("disabled", false);
		else
			$("#PlannedSmplDate").attr("disabled", true);
		
		if ($("#txtM2aDate").val() == "")
			$("#rna2aDate").attr("disabled", false);
		else
			$("#rna2aDate").attr("disabled", true);
		
		if ($("#M2bDate").val() == "")
			$("#crna2bDate").attr("disabled", false);
		else
			$("#crna2bDate").attr("disabled", true);
		
		if ($("#M2cDate").val() == "")
			$("#chips2cDate").attr("disabled", false);
		else
			$("#chips2cDate").attr("disabled", true);
		
		if ($("#M2dDate").val() == "")
			$("#dataPosted2dDate").attr("disabled", false);
		else
			$("#dataPosted2dDate").attr("disabled", true);
		
		if ($("#M3aDate").val() == "")
			$("#QC3aDate").attr("disabled", false);
		else
			$("#QC3aDate").attr("disabled", true);
		
		if ($("#M3bDate").val() == "")
			$("#statistics3bDate").attr("disabled", false);
		else
			$("#statistics3bDate").attr("disabled", true);
		
		if ($("#M4Date").val() == "")
			$("#bioInformatics4Date").attr("disabled", false);
		else
			$("#bioInformatics4Date").attr("disabled", true);
		
		var tx = $("#selRevMStone").width();
		$("#selMilestonesReson").width(tx);
		
		$("#btnEdit").hide();
	});
	
	$("#btnCancel").click(function () {
		divMileStonesEdit(HIDE);
		$("#btnEdit").show();
		addEdit = false;
		
		$("#PlannedSmplDate").attr("disabled", true);
		$("#rna2aDate").attr("disabled", true);
		$("#crna2bDate").attr("disabled", true);
		$("#chips2cDate").attr("disabled", true);
		$("#dataPosted2dDate").attr("disabled", true);
		$("#QC3aDate").attr("disabled", true);
		$("#statistics3bDate").attr("disabled", true);
		$("#bioInformatics4Date").attr("disabled", true);
		$("#btnCancel").hide();
	});
	
	//Tissue comment when selected Other
	$("#lblOther").hide();
	$("#txtOthers").hide();
	
	$("#selTissue").change(function () {
		//alert($("#selTissue option:selected").text());
		if ($("#selTissue option:selected").text() == "Other") {
			$("#lblOther").show();
			$("#txtOthers").show();
			needCommentOnTissueType = true;
		} else {
			$("#lblOther").hide();
			$("#txtOthers").hide();
			needCommentOnTissueType = false;
		}
	});
	
	//allow only numbers
	$('#txtSamples').bind('keypress', function (e) {
		return (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) ? false : true;
	});
	
	$.ajax({
		success : function () {
			isGc();
			fillSelects();
			getDatePicker();
			
			if (IshavingItm) {
				itmid = window.location.search.split("?itmid=")[1];
				contentLoad(itmid);
				$("#reqStudy").click(function () {
					updatePurpose();
				});
			} else {
				//only first section(DIV_REQUEST_STUDY) is allowed
				divToggle(DIV_STUDY_INFORMATION, HIDE);
				divToggle(DIV_STATISTICS, HIDE);
				divToggle(DIV_BIOINFORMATICS, HIDE);
				divToggle(DIV_MILESTONES, HIDE);
				
				divToggle(DIV_BU, HIDE);
				divToggle(DIV_GC, HIDE);
				divToggle(DIV_BUGC_BUTTONS, HIDE);
				
				$("#reqStudy").click(function () {
					addPurpose();
				});
				$('#divLoad').fadeOut(3000);
			}
			
		}
	});
	
	$('body').fadeTo("slow", 1);
	
	$('input[type="text"]').focus(function () {
		$(this).addClass("focus");
	});
	$('input[type="text"]').blur(function () {
		$(this).removeClass("focus");
	});
	
	$('textarea').focus(function () {
		$(this).addClass("focus");
	});
	
	$('textarea').blur(function () {
		$(this).removeClass("focus");
	});
	
	milestonesDates();
	
	//set people picker borders
	$("#ctl00_PlaceHolderMain_bolInfo_upLevelDiv").css("width", "298px");
	$("#ctl00_PlaceHolderMain_bolInfo_upLevelDiv").css("border-width", "1px");
	
	$("#ctl00_PlaceHolderMain_statistics_upLevelDiv").css("width", "298px");
	$("#ctl00_PlaceHolderMain_statistics_upLevelDiv").css("border-width", "1px");
	
	$("#ctl00_PlaceHolderMain_GCAnalyst_upLevelDiv").css("width", "298px");
	$("#ctl00_PlaceHolderMain_GCAnalyst_upLevelDiv").css("border-width", "1px");
	
	$("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").css("width", "342px");
	$("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").css("border-width", "1px");
	
});

function getDatePicker() {
	/*
	$("[id$='Date']").datepicker({
	minDate : '-7'
	});*/
	
	$("[id$='Date']").datepicker();
	$("[id$='Date']").attr('readonly', 'readonly');
}

function fillReasonforChange(selMilestone) {
	$("#selMilestonesReson").html("");
	
	var optn = document.createElement("OPTION");
	optn.text = "-Select-";
	optn.value = "0";
	document.getElementById('selMilestonesReson').options.add(optn);
	
	switch (selMilestone) {
	case "M1:Sample Reception":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone1 Delay Reason');
		break;
		
	case "M2a:RNA Isolation":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone2b Delay Reason');
		break;
		
	case "M2b:cRNA Label":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone2b Delay Reason');
		break;
		
	case "M2c:Chips Run":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone2c Delay Reason');
		break;
		
	case "M2d:Data Posted":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone2d Delay Reason');
		break;
		
	case "M3a:Initial QC Completion":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone3a-3b Delay Reason');
		break;
		
	case "M3b:Statistics Report":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone3a-3b Delay Reason');
		break;
		
	case "M4:BioInformatics Analysis":
		addOption(document.getElementById('selMilestonesReson'), 'Milestone4 Delay Reason');
		break;
	default:
		alert("Please select valid Milestone");
		break;
	}
}

var isgcUser = false;

function isGc() {
	$().SPServices({
		operation : "GetGroupCollectionFromUser",
		userLoginName : curUser,
		async : false,
		completefunc : function (xData, Status) {
			if ($(xData.responseXML).find("Group[Name='GC']").length == 1) {
				divToggle(DIV_STUDY_INFORMATION, SHOW);
				isgcUser = true;
			} else {
				isgcUser = false;
				
				divToggle(DIV_STUDY_INFORMATION, HIDE);
				divToggle(DIV_MILESTONES, HIDE);
				
				divToggle(DIV_BU, HIDE);
				divToggle(DIV_GC, HIDE);
				divToggle(DIV_BUGC_BUTTONS, HIDE);
				
				divToggle(DIV_STATISTICS, HIDE);
				divToggle(DIV_BIOINFORMATICS, HIDE);
			}
		}
	});
}

//to toggle the divs
function divToggle(divId, status) {
	switch (status) {
	case 'hide':
		$("#" + divId + " :input").attr('disabled', true);
		$("#" + divId).find('img:last').hide();
		$("#" + divId + " img[id$='Attach']").hide();
		if (divId == DIV_STUDY_INFORMATION) {
			$("div[title='People Picker']").attr('disabled', true);
		}
		
		if (divId == DIV_MILESTONES) {
			$("#btnMilestones").hide();
		}
		break;
		
	case 'show':
		$("#" + divId + " :input").attr('disabled', false);
		$("#" + divId).find('img:last').show();
		$("#" + divId + " img[id$='Attach']").show();
		if (divId == DIV_STUDY_INFORMATION) {
			$("div[title='People Picker']").attr('disabled', false);
		}
		if (divId == DIV_MILESTONES) {
			$("#btnMilestones").show();
		}
		break;
	}
}

function divMileStonesEdit(strAct) {
	switch (strAct) {
	case HIDE:
		$("#lblMilestoneReason").hide();
		$("#lblMileComments").hide();
		$("#lblRevisedMStone").hide();
		
		$("#selMilestonesReson").hide();
		$("#txtareaMilestones").hide();
		$("#selRevMStone").hide();
		$("#btnEdit").hide();
		break;
		
	case SHOW:
		$("#lblMilestoneReason").show();
		$("#lblMileComments").show();
		$("#lblRevisedMStone").show();
		
		$("#selMilestonesReson").show();
		$("#txtareaMilestones").show();
		$("#selRevMStone").show();
		break;
	}
}

function hideAll() {
	divToggle(DIV_REQUEST_STUDY, HIDE);
	divToggle(DIV_STUDY_INFORMATION, HIDE);
	divToggle(DIV_MILESTONES, HIDE);
	divToggle(DIV_BU, HIDE);
	divToggle(DIV_GC, HIDE);
	divToggle(DIV_BUGC_BUTTONS, HIDE);
	
	divToggle(DIV_STATISTICS, HIDE);
	divToggle(DIV_BIOINFORMATICS, HIDE);
}

//fill existed item
function contentLoad(itmid) {
	
	$("input[disabled='disabled']").removeClass('disabled');
	$("textarea[disabled='disabled']").removeClass('disabled');
	$("select[disabled='disabled']").removeClass('disabled');
	$("div[title='People Picker']").removeClass('disabled');
	
	divMileStonesEdit(HIDE);
	
	//View fields for Study Form
	var viewFlds = "<ViewFields><FieldRef Name='Editor' /><FieldRef Name='EscalationIDs' /><FieldRef Name='Author' /><FieldRef Name='Created' /><FieldRef Name='Modified' /><FieldRef Name='ID' />" +
		"<FieldRef Name='EnableWF' /><FieldRef Name='enableStage' /><FieldRef Name='Reason_for_Delay_4' /><FieldRef Name='M3b_act_Statistics_Report_Date' /><FieldRef Name='M3a_act_Initial_QC_completion_da' />" +
		"<FieldRef Name='Reason_for_Delay_m3b' /><FieldRef Name='Reason_for_Delay_m3a' /><FieldRef Name='Reason_for_Delay_m2d' /><FieldRef Name='Reason_for_Delay_m2c' /><FieldRef Name='Reason_for_Delay_m2b' />" +
		"<FieldRef Name='M2d_act_Data_Posted_date' /><FieldRef Name='M2c_act_Chips_Run_date' /><FieldRef Name='M2b_cRNA_act_Dates_Label' /><FieldRef Name='M2a_act_RNA_Isolation_Date' /><FieldRef Name='cRNA_Protocol' />" +
		"<FieldRef Name='Comments_M2a' /><FieldRef Name='Reason_for_Delay_M2a' /><FieldRef Name='RNA_x0020_Procotol' /><FieldRef Name='Reason_for_Delay_m1' /><FieldRef Name='M1_Actual_Samples_Received_Date' />" +
		"<FieldRef Name='ReminderIds' /><FieldRef Name='M4_BioInformatics_Analysis_date' /><FieldRef Name='M3b_Statistics_Report_Date' /><FieldRef Name='M3a_Initial_QC_completion_date' /><FieldRef Name='M2d_Date_Data_Posted' />" +
		"<FieldRef Name='M2c_Date_Chips_Run' /><FieldRef Name='M2b_cRNA_Dates_Label' /><FieldRef Name='M2a_RNA_Isolation_Date' /><FieldRef Name='M1_Anticipated_Samples' /><FieldRef Name='TissueType' /><FieldRef Name='DescriptionPurpose' />" +
		"<FieldRef Name='Chip_x0020_Type' /><FieldRef Name='GSSID' /><FieldRef Name='Fundamental_questions' /><FieldRef Name='Purpose' /><FieldRef Name='Comments_4' /><FieldRef Name='Comments_m3b' />" +
		"<FieldRef Name='Comments_m2d' /><FieldRef Name='Comments' /><FieldRef Name='Delayed' /><FieldRef Name='Overall_Study_Status' /><FieldRef Name='BioInformatics_Analysis_date_4' /><FieldRef Name='Statistics_Report_Date_M3b' /><FieldRef Name='Initial_QC_completion_date_M3a' />" +
		"<FieldRef Name='Date_Data_Posted_M2d' /><FieldRef Name='Date_Chips_Run_M2c' /><FieldRef Name='cRNA_Dates_Label_M2b' /><FieldRef Name='NA_Isolation_Date_M2a' /><FieldRef Name='Estimated_timing' /><FieldRef Name='ProtocolNumber' /><FieldRef Name='Estimated_x0020_Number_x0020_of_' />" +
		"<FieldRef Name='Study_x0020_Name' /><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /><FieldRef Name='Statistics_x0020_Owner' /><FieldRef Name='OtherTeamUsers' /><FieldRef Name='GC_x0020_Analyst' /><FieldRef Name='Title' /><FieldRef Name='LogMilestones' /><FieldRef Name='RevisedMstone' /><FieldRef Name='ReasonForChange' /><FieldRef Name='MilestoneComments' /><FieldRef Name='Author' /><FieldRef Name='studyCancel' /><FieldRef Name='tissueOtherComments' /></ViewFields>";
	
	$.ajax({
		success : function () {
			
			//debugger
			$().SPServices({
				operation : "GetListItems",
				async : false,
				listName : "Study",
				CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
				CAMLQuery : "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + itmid + "</Value></Eq></Where></Query>",
				CAMLViewFields : viewFlds,
				completefunc : function (xData, Status) {
					StudyObj = $(xData.responseXML);
					
					//alert(xData.responseText);
					$(xData.responseXML).SPFilterNode("z:row").each(function () {
						
						//loading existed data
						GSSID = $(this).attr("ows_GSSID");
						studyAuthor = $(this).attr("ows_Author").split(";#")[1];
						
						escOtherUsers = $(this).attr("ows_OtherTeamUsers")
							step = $(this).attr("ows_enableStage");
						
						if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
							currGroup = "BU"
								$("#crnAttach").attr('ID', 'BUAttach');
							
							$("#BUAttach").click(function () {
								window.open('http://teamspace.pg.com/sites/genomics/Site Assets/Pages/AttachFile.aspx?SubFolder=BU', "mywindow", "width=700,height=500,top=200")
							})
							getMileStoneDocument();
						}
						if ($(this).attr("ows_GC_x0020_Analyst") != null && $(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
							currGroup = "GC"
								$("#crnAttach").attr('ID', 'GCAttach');
							$("#GCAttach").click(function () {
								window.open('http://teamspace.pg.com/sites/genomics/Site Assets/Pages/AttachFile.aspx?SubFolder=GC', "mywindow", "width=700,height=500,top=200")
							})
							getMileStoneDocument();
						}
						if ($(this).attr("ows_Statistics_x0020_Owner") != null && $(this).attr("ows_Statistics_x0020_Owner").split(";#")[0] == getuserId(curUser)) {
							
							currGroup = "Stats"
								$("#StatisticsAttach").click(function () {
									window.open('http://teamspace.pg.com/sites/genomics/Site Assets/Pages/AttachFile.aspx?SubFolder=Statistics', "mywindow", "width=700,height=500,top=200")
								})
								getMileStoneDocument();
							
						}
						if ($(this).attr("ows_Bio_x0020_Informatics_x0020_Owne") != null && $(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(";#")[0] == getuserId(curUser)) {
							
							currGroup = "BioInformatics"
								
								$("#BioinformaticsAttach").click(function () {
									window.open('http://teamspace.pg.com/sites/genomics/Site Assets/Pages/AttachFile.aspx?SubFolder=Bioinformatics', "mywindow", "width=700,height=500,top=200")
								})
								getMileStoneDocument();
							
						}
						
						//request study
						if ($(this).attr("ows_Purpose") != null) {
							var purpose = $(this).attr("ows_Purpose").split(";")[0];
							$("#selPurpose").val(purpose);
						}
						
						if ($(this).attr("ows_Fundamental_questions") != null) {
							var FundamentalQuestion = $(this).attr("ows_Fundamental_questions");
							$("#txtQuestion").val(CorrectSPDataAsString(FundamentalQuestion));
						}
						//request study
						
						//studyInformation
						if ($(this).attr("ows_GSSID") != null) {
							var txtGssId = $(this).attr("ows_GSSID");
							$("#txtGssId").val(txtGssId);
						} else {
							if (step != "") {
								var txtGssId = "GSS" + randomN();
								$("#txtGssId").val(txtGssId);
							}
						}
						
						if ($(this).attr("ows_EscalationIDs") != null)
							EscalationIDs = $(this).attr("ows_EscalationIDs");
						
						if ($(this).attr("ows_ReminderIds") != null)
							RemainderIDS = $(this).attr("ows_ReminderIds");
						
						if ($(this).attr("ows_GC_x0020_Analyst") != null) {
							var txtGCAnalyst = $(this).attr("ows_GC_x0020_Analyst").split(";#")[1];
							$("#ctl00_PlaceHolderMain_GCAnalyst_upLevelDiv").text(txtGCAnalyst);
							$("#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox").val(txtGCAnalyst);
							$("#ctl00_PlaceHolderMain_GCAnalyst_checkNames").click();
						}
						
						if ($(this).attr("ows_Statistics_x0020_Owner") != null) {
							var txtStatOwner = $(this).attr("ows_Statistics_x0020_Owner").split(";#")[1];
							$("#ctl00_PlaceHolderMain_statistics_upLevelDiv").text(txtStatOwner);
							$("#ctl00_PlaceHolderMain_statistics_downlevelTextBox").val(txtStatOwner);
							$("#ctl00_PlaceHolderMain_statistics_checkNames").click();
						}
						
						if ($(this).attr("ows_Bio_x0020_Informatics_x0020_Owne") != null) {
							var txtBioInforOwner = $(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(";#")[1];
							$("#ctl00_PlaceHolderMain_bolInfo_upLevelDiv").text(txtBioInforOwner);
							$("#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox").val(txtBioInforOwner);
							$("#ctl00_PlaceHolderMain_bolInfo_checkNames").click();
						}
						
						//multiple users load
						
						if ($(this).attr("ows_OtherTeamUsers") != null) {
							var otherUsers = $(this).attr("ows_OtherTeamUsers").split(";#");
							var multipleUsers = "";
							$.each(otherUsers, function (i) {
								if ((i + 1) % 2 == 0) {
									multipleUsers += otherUsers[i] + ";";
								}
							});
							
							$("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").text(multipleUsers);
							$("#ctl00_PlaceHolderMain_teamUsers_downlevelTextBox").val(multipleUsers);
							if (multipleUsers != "")
								$("#ctl00_PlaceHolderMain_teamUsers_checkNames").click();
						}
						
						if ($(this).attr("ows_Study_x0020_Name") != null) {
							var txtStudyName = $(this).attr("ows_Study_x0020_Name");
							$("#txtStudyName").val(CorrectSPDataAsString(txtStudyName));
						}
						
						if ($(this).attr("ows_DescriptionPurpose") != null) {
							var txtPurpose = $(this).attr("ows_DescriptionPurpose");
							$("#txtPurpose").val(CorrectSPDataAsString(txtPurpose));
						}
						
						if ($(this).attr("ows_Estimated_x0020_Number_x0020_of_") != null) {
							var txtSamples = $(this).attr("ows_Estimated_x0020_Number_x0020_of_");
							txtSamples = txtSamples.split(".")[0];
							$("#txtSamples").val(txtSamples);
						}
						
						if ($(this).attr("ows_Chip_x0020_Type") != null) {
							var selChipType = $(this).attr("ows_Chip_x0020_Type").split(";")[0];
							$("#selChipType").val(selChipType);
						}
						
						if ($(this).attr("ows_ProtocolNumber") != null) {
							var txtProtocol = $(this).attr("ows_ProtocolNumber");
							$("#txtProtocol").val(CorrectSPDataAsString(txtProtocol));
						}
						
						if ($(this).attr("ows_Estimated_timing") != null) {
							var timingsSampleDate = $(this).attr("ows_Estimated_timing");
							timingsSampleDate = conDate(timingsSampleDate);
							$("#timingsSampleDate").val(timingsSampleDate);
						}
						
						if ($(this).attr("ows_TissueType") != null) {
							var selTissue = $(this).attr("ows_TissueType").split(";")[0];
							$("#selTissue").val(selTissue);
						}
						
						if ($(this).attr("ows_tissueOtherComments") != null) {
							$("#txtOthers").show();
							$("#lblOther").show();
							var tissueOtherComments = $(this).attr("ows_tissueOtherComments");
							$("#txtOthers").val(CorrectSPDataAsString(tissueOtherComments));
						}
						
						//studyInformation
						
						//Milestones
						if ($(this).attr("ows_M1_Anticipated_Samples") != null) {
							var PlannedSmplDate = $(this).attr("ows_M1_Anticipated_Samples");
							PlannedSmplDate = conDate(PlannedSmplDate);
							$("#PlannedSmplDate").val(PlannedSmplDate);
							dateM1 = PlannedSmplDate;
							if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
								$("#btnEdit").show();
							}
						}
						
						if ($(this).attr("ows_M2a_RNA_Isolation_Date") != null) {
							var rna2aDate = $(this).attr("ows_M2a_RNA_Isolation_Date");
							rna2aDate = conDate(rna2aDate);
							$("#rna2aDate").val(rna2aDate);
							dateM2a = rna2aDate;
						}
						
						if ($(this).attr("ows_M2b_cRNA_Dates_Label") != null) {
							var crna2bDate = $(this).attr("ows_M2b_cRNA_Dates_Label");
							crna2bDate = conDate(crna2bDate);
							$("#crna2bDate").val(crna2bDate);
							dateM2b = crna2bDate;
						}
						
						if ($(this).attr("ows_M2c_Date_Chips_Run") != null) {
							var chips2cDate = $(this).attr("ows_M2c_Date_Chips_Run");
							chips2cDate = conDate(chips2cDate);
							$("#chips2cDate").val(chips2cDate);
							dateM2c = chips2cDate;
						}
						
						if ($(this).attr("ows_M2d_Date_Data_Posted") != null) {
							var dataPosted2dDate = $(this).attr("ows_M2d_Date_Data_Posted");
							dataPosted2dDate = conDate(dataPosted2dDate);
							$("#dataPosted2dDate").val(dataPosted2dDate);
							dateM2d = dataPosted2dDate;
						}
						
						if ($(this).attr("ows_M3a_Initial_QC_completion_date") != null) {
							var QC3aDate = $(this).attr("ows_M3a_Initial_QC_completion_date");
							QC3aDate = conDate(QC3aDate);
							$("#QC3aDate").val(QC3aDate);
							dateM3a = QC3aDate;
						}
						
						if ($(this).attr("ows_M3b_Statistics_Report_Date") != null) {
							var statistics3bDate = $(this).attr("ows_M3b_Statistics_Report_Date");
							statistics3bDate = conDate(statistics3bDate);
							$("#statistics3bDate").val(statistics3bDate);
							dateM3b = statistics3bDate;
						}
						
						if ($(this).attr("ows_M4_BioInformatics_Analysis_date") != null) {
							var bioInformatics4Date = $(this).attr("ows_M4_BioInformatics_Analysis_date");
							bioInformatics4Date = conDate(bioInformatics4Date);
							$("#bioInformatics4Date").val(bioInformatics4Date);
							dateM4 = bioInformatics4Date;
						}
						
						if ($(this).attr("ows_Overall_Study_Status") != null) {
							var selOverStatus = $(this).attr("ows_Overall_Study_Status");
							$("#selOverStatus").val(selOverStatus);
						} else {
							$("#selOverStatus").attr('selectedIndex', 0);
						}
						
						if ($(this).attr("ows_LogMilestones") != null) {
							logMilestones = $(this).attr("ows_LogMilestones");
						}
						
						if ($(this).attr("ows_Delayed") != null) {
							var chkDelay = $(this).attr("ows_Delayed");
							if (chkDelay == 1)
								$('#chkDelay').attr('checked', true);
							else
								$('#chkDelay').attr('checked', false);
						}
						
						if ($(this).attr("ows_RevisedMstone") != null) {
							var selRevMStone = $(this).attr("ows_RevisedMstone");
							$("#selRevMStone").val(selRevMStone);
						}
						
						if ($(this).attr("ows_ReasonForChange") != null) {
							var selOverStatus = $(this).attr("ows_ReasonForChange").split(";")[0];
							$("#selMilestonesReson").val(selOverStatus);
						}
						
						if ($(this).attr("ows_MilestoneComments") != null) {
							var txtareaMilestones = $(this).attr("ows_MilestoneComments");
							$("#txtareaMilestones").val(CorrectSPDataAsString(txtareaMilestones));
						}
						
						$("#btnCancel").hide();
						
						$("#lblCancel").hide();
						$("#selCancelReason").hide();
						
						//Milestones
						
						//BU/GC Study Details
						if ($(this).attr("ows_M1_Actual_Samples_Received_Date") != null) {
							var txtM1Date = $(this).attr("ows_M1_Actual_Samples_Received_Date");
							txtM1Date = conDate(txtM1Date);
							$("#txtM1Date").val(txtM1Date);
							$("#PlannedSmplDate").attr('disabled', true);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_m1") != null) {
							var selM1Reason = $(this).attr("ows_Reason_for_Delay_m1").split(";")[0];
							$("#selM1Reason").val(selM1Reason);
						}
						
						if ($(this).attr("ows_RNA_x0020_Procotol") != null) {
							var selRNA = $(this).attr("ows_RNA_x0020_Procotol").split(";")[0];
							$("#selRNA").val(selRNA);
						}
						
						if ($(this).attr("ows_M2a_act_RNA_Isolation_Date") != null) {
							var txtM2aDate = $(this).attr("ows_M2a_act_RNA_Isolation_Date");
							txtM2aDate = conDate(txtM2aDate);
							$("#txtM2aDate").val(txtM2aDate);
							$("#rna2aDate").attr('disabled', true);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_M2a") != null) {
							var selM2Reason = $(this).attr("ows_Reason_for_Delay_M2a").split(";")[0];
							$("#selM2Reason").val(selM2Reason);
						}
						
						if ($(this).attr("ows_Comments_M2a") != null) {
							var txtCommentsM2a = $(this).attr("ows_Comments_M2a");
							$("#txtCommentsM2a").val(CorrectSPDataAsString(txtCommentsM2a));
							
						}
						if ($(this).attr("ows_cRNA_Protocol") != null) {
							var selcRNAprotocol = $(this).attr("ows_cRNA_Protocol").split(";")[0];
							$("#selcRNAprotocol").val(selcRNAprotocol);
						}
						
						if ($(this).attr("ows_M2b_cRNA_act_Dates_Label") != null) {
							var M2bDate = $(this).attr("ows_M2b_cRNA_act_Dates_Label");
							M2bDate = conDate(M2bDate);
							$("#M2bDate").val(M2bDate);
							$("#crna2bDate").attr('disabled', true);
						}
						
						if ($(this).attr("ows_M2c_act_Chips_Run_date") != null) {
							var M2cDate = $(this).attr("ows_M2c_act_Chips_Run_date");
							M2cDate = conDate(M2cDate);
							$("#M2cDate").val(M2cDate);
							$("#chips2cDate").attr('disabled', true);
						}
						
						if ($(this).attr("ows_M2d_act_Data_Posted_date") != null) {
							var M2dDate = $(this).attr("ows_M2d_act_Data_Posted_date");
							M2dDate = conDate(M2dDate);
							$("#M2dDate").val(M2dDate);
							$("#dataPosted2dDate").attr('disabled', true);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_m2b") != null) {
							var selM2bReason = $(this).attr("ows_Reason_for_Delay_m2b").split(";")[0];
							$("#selM2bReason").val(selM2bReason);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_m2c") != null) {
							var selM2cReason = $(this).attr("ows_Reason_for_Delay_m2c").split(";")[0];
							$("#selM2cReason").val(selM2cReason);
						}
						if ($(this).attr("ows_Reason_for_Delay_m2d") != null) {
							var selM2dReason = $(this).attr("ows_Reason_for_Delay_m2d").split(";")[0];
							$("#selM2dReason").val(selM2dReason);
						}
						
						if ($(this).attr("ows_Comments_m2d") != null) {
							var txtCommentsM2d = $(this).attr("ows_Comments_m2d");
							$("#txtCommentsM2d").val(CorrectSPDataAsString(txtCommentsM2d));
						}
						//BU/GC Study Details
						
						
						//Statistics
						if ($(this).attr("ows_M3a_act_Initial_QC_completion_da") != null) {
							var M3aDate = $(this).attr("ows_M3a_act_Initial_QC_completion_da");
							M3aDate = conDate(M3aDate);
							$("#M3aDate").val(M3aDate);
							$("#QC3aDate").attr('disabled', true);
						} else {
							//$("#M3bDate").attr("disabled",true)
						}
						
						if ($(this).attr("ows_M3b_act_Statistics_Report_Date") != null) {
							var M3bDate = $(this).attr("ows_M3b_act_Statistics_Report_Date");
							M3bDate = conDate(M3bDate);
							$("#M3bDate").val(M3bDate);
							$("#statistics3bDate").attr('disabled', true);
						} else {
							//$("#statistics3bDate").attr('disabled', false);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_m3a") != null) {
							var sel3aReason = $(this).attr("ows_Reason_for_Delay_m3a").split(";")[0];
							$("#sel3aReason").val(sel3aReason);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_m3b") != null) {
							var sel3bReason = $(this).attr("ows_Reason_for_Delay_m3b").split(";")[0];
							$("#sel3bReason").val(sel3bReason);
						}
						
						if ($(this).attr("ows_Comments_m3b") != null) {
							var txtComments3b = $(this).attr("ows_Comments_m3b");
							$("#txtComments3b").val(CorrectSPDataAsString(txtComments3b));
						}
						//Statistics
						
						//BioInformatics
						if ($(this).attr("ows_BioInformatics_Analysis_date_4") != null) {
							var M4Date = $(this).attr("ows_BioInformatics_Analysis_date_4");
							M4Date = conDate(M4Date);
							$("#M4Date").val(M4Date);
							$("#bioInformatics4Date").attr('disabled', true);
						} else {
							//$("#bioInformatics4Date").attr('disabled', false);
						}
						
						if ($(this).attr("ows_Reason_for_Delay_4") != null) {
							var sel4Reason = $(this).attr("ows_Reason_for_Delay_4").split(";")[0];
							$("#sel4Reason").val(sel4Reason);
						}
						
						if ($(this).attr("ows_Comments_4") != null) {
							var txtComments4 = $(this).attr("ows_Comments_4");
							$("#txtComments4").val(CorrectSPDataAsString(txtComments4));
						}
						//end of the loading
						
						var chkCancel = 0;
						if ($(this).attr("ows_studyCancel") != null) {
							chkCancel = $(this).attr("ows_studyCancel");
							if (chkCancel == 1)
								$('#chkCancel').attr('checked', true);
							else
								$('#chkCancel').attr('checked', false);
						}
						if (chkCancel == 0) {
							switch (step) {
							case STEP1:
								hideAll();
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (isgcUser) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
								}
								
								$("#ctl00_PlaceHolderMain_GCAnalyst_upLevelDiv").focusout(function () {
									$("#ctl00_PlaceHolderMain_GCAnalyst_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_statistics_upLevelDiv").focusout(function () {
									$("#ctl00_PlaceHolderMain_statistics_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_bolInfo_upLevelDiv").focusout(function () {
									$("#ctl00_PlaceHolderMain_bolInfo_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox").focusout(function () {
									$("#ctl00_PlaceHolderMain_GCAnalyst_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_statistics_downlevelTextBox").focusout(function () {
									$("#ctl00_PlaceHolderMain_statistics_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox").focusout(function () {
									$("#ctl00_PlaceHolderMain_bolInfo_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").focusout(function () {
									$("#ctl00_PlaceHolderMain_teamUsers_checkNames").click();
								});
								
								$("#ctl00_PlaceHolderMain_teamUsers_downlevelTextBox").focusout(function () {
									$("#ctl00_PlaceHolderMain_teamUsers_checkNames").click();
								});
								if (needTabSetup)
									GeneralDiv(1);
								break;
								
							case STEP2:
								
								hideAll();
								
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								
								$("#btnEdit").hide();
								if (needTabSetup)
									GeneralDiv(2);
								break;
								
							case STEP3:
								hideAll();
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
									
									if ($(this).attr("ows_M1_Anticipated_Samples") != null) {
										//if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
										if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
											divToggle(DIV_BU, SHOW);
											divToggle(DIV_BUGC_BUTTONS, SHOW);
											$("#txtCommentsM2a").attr("disabled", false);
										}
									}
								}
								// Changed based on UAT request
								//		if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									
									if ($(this).attr("ows_M1_Anticipated_Samples") != null) {
										var PlannedSmplDate = $(this).attr("ows_M1_Anticipated_Samples");
										PlannedSmplDate = conDate(PlannedSmplDate);
										
										$("#txtM1Date").change(function () {
											ctrlHandle(PlannedSmplDate, $(this).val(), "selM1Reason", "txtM1Date");
										});
										
										var applied = false;
										$("#txtM1Date").focusin(function () {
											if (!applied) {
												$("#txtM1Date").datepicker("option", "minDate", PlannedSmplDate);
												applied = true;
											}
										});
										
									}
								}
								if (needTabSetup)
									GeneralDiv(6);
								reloadValidations();
								break;
								
							case STEPM1:
								hideAll();
								
								$("#divBtns").find('tr').each(function (i) {
									if (i == 0 || i == 1)
										$(this).hide();
									
								})
								
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
									divToggle(DIV_GC, SHOW);
									divToggle(DIV_BUGC_BUTTONS, SHOW);
									
									$("#divBtns").find('tr').each(function (i) {
										$(this).show();
									})
									
									//To show uploaded  milestone docs
									var idsArray = ["selcRNAprotocol", "M2bDate", "M2cDate", "M2dDate", "txtCommentsM2d", "selM2bReason", "selM2cReason", "selM2dReason"];
									//alert(idsArray.length)
									for (var i = 0; i < idsArray.length; i++) {
										$("#" + idsArray[i]).attr("disabled", true);
									}
									
									if ($(this).attr("ows_M2a_RNA_Isolation_Date") != null) {
										
										var rna2aDate = $(this).attr("ows_M2a_RNA_Isolation_Date");
										rna2aDate = conDate(rna2aDate);
										
										$("#txtM2aDate").change(function () {
											ctrlHandle(rna2aDate, $(this).val(), "selM2Reason", "txtM2aDate");
										});
										
										//to give minimum date
										var applied = false;
										$("#txtM2aDate").focusin(function () {
											if (!applied) {
												$("#txtM2aDate").datepicker("option", "minDate", $("#txtM1Date").val());
												applied = true;
											}
										});
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(3);
								reloadValidations();
								break;
								
							case STEPM2A:
								hideAll();
								//debugger
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
									divToggle(DIV_GC, SHOW);
									divToggle(DIV_BUGC_BUTTONS, SHOW);
									
									var idsArray = ["selRNA", "txtM2aDate", "M2cDate", "M2dDate", "txtCommentsM2a", "selM2Reason", "selM2cReason", "selM2dReason"];
									//alert(idsArray.length)
									for (var i = 0; i < idsArray.length; i++) {
										$("#" + idsArray[i]).attr("disabled", true);
									}
									
									if ($(this).attr("ows_M2b_cRNA_Dates_Label") != null) {
										var crna2bDate = $(this).attr("ows_M2b_cRNA_Dates_Label");
										crna2bDate = conDate(crna2bDate);
										
										$("#M2bDate").change(function () {
											ctrlHandle(crna2bDate, $(this).val(), "selM2bReason", "M2bDate");
										});
										
										//to give minimum date
										var applied = false;
										$("#M2bDate").focusin(function () {
											if (!applied) {
												$("#M2bDate").datepicker("option", "minDate", $("#txtM2aDate").val());
												applied = true;
											}
										});
										
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(3);
								reloadValidations();
								break;
								
							case STEPM2B:
								hideAll();
								
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
									divToggle(DIV_GC, SHOW);
									divToggle(DIV_BUGC_BUTTONS, SHOW);
									
									var idsArray = ["selRNA", "txtM2aDate", "M2bDate", "M2dDate", "txtCommentsM2a", "selM2Reason", "selM2bReason", "selM2dReason"];
									//alert(idsArray.length)
									for (var i = 0; i < idsArray.length; i++) {
										$("#" + idsArray[i]).attr("disabled", true);
									}
									
									if ($(this).attr("ows_M2c_Date_Chips_Run") != null) {
										var chips2cDate = $(this).attr("ows_M2c_Date_Chips_Run");
										chips2cDate = conDate(chips2cDate);
										
										$("#M2cDate").change(function () {
											ctrlHandle(chips2cDate, $(this).val(), "selM2cReason", "M2cDate");
										});
										
										//to give minimum date
										var applied = false;
										$("#M2cDate").focusin(function () {
											if (!applied) {
												$("#M2cDate").datepicker("option", "minDate", $("#M2bDate").val());
												applied = true;
											}
										});
										
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(3);
								reloadValidations();
								break;
								
							case STEPM2C:
								hideAll();
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
									divToggle(DIV_GC, SHOW);
									divToggle(DIV_BUGC_BUTTONS, SHOW);
									
									var idsArray = ["selRNA", "txtM2aDate", "M2bDate", "M2cDate", "txtCommentsM2a", "selM2Reason", "selM2bReason", "selM2cReason"];
									//alert(idsArray.length)
									for (var i = 0; i < idsArray.length; i++) {
										$("#" + idsArray[i]).attr("disabled", true);
									}
									
									if ($(this).attr("ows_M2d_Date_Data_Posted") != null) {
										var dataPosted2dDate = $(this).attr("ows_M2d_Date_Data_Posted");
										dataPosted2dDate = conDate(dataPosted2dDate);
										
										$("#M2dDate").change(function () {
											ctrlHandle(dataPosted2dDate, $(this).val(), "selM2dReason", "M2dDate");
										});
										
										//to give minimum date
										var applied = false;
										$("#M2dDate").focusin(function () {
											if (!applied) {
												$("#M2dDate").datepicker("option", "minDate", $("#M2cDate").val());
												applied = true;
											}
										});
										
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(3);
								reloadValidations();
								break;
								
							case STEPM2D:
								hideAll();
								
								$("#divBtns").find('tr').each(function (i) {
									if (i == 0 || i == 1)
										$(this).hide();
									
								})
								
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
								}
								
								if ($(this).attr("ows_Statistics_x0020_Owner").split(";#")[0] == getuserId(curUser)) {
									
									divToggle(DIV_STATISTICS, SHOW);
									
									var idsArray = ["M3bDate", "sel3bReason"];
									for (var i = 0; i < idsArray.length; i++) {
										$("#" + idsArray[i]).attr("disabled", true);
									}
									
									if ($(this).attr("ows_M3a_Initial_QC_completion_date") != null) {
										var QC3aDate = $(this).attr("ows_M3a_Initial_QC_completion_date");
										QC3aDate = conDate(QC3aDate);
										
										$("#M3aDate").change(function () {
											ctrlHandle(QC3aDate, $(this).val(), "sel3aReason", "M3aDate");
										});
										
										//to give minimum date
										var applied = false;
										$("#M3aDate").focusin(function () {
											if (!applied) {
												$("#M3aDate").datepicker("option", "minDate", $("#M2dDate").val());
												applied = true;
											}
										});
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(3);
								reloadValidations();
								break;
							case STEPM3A:
								hideAll();
								
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
								}
								
								if ($(this).attr("ows_Statistics_x0020_Owner").split(";#")[0] == getuserId(curUser)) {
									
									divToggle(DIV_STATISTICS, SHOW);
									
									var idsArray = ["M3aDate", "sel3aReason"];
									//alert(idsArray.length)
									for (var i = 0; i < idsArray.length; i++) {
										$("#" + idsArray[i]).attr("disabled", true);
									}
									
									if ($(this).attr("ows_M3b_Statistics_Report_Date") != null) {
										var statistics3bDate = $(this).attr("ows_M3b_Statistics_Report_Date");
										statistics3bDate = conDate(statistics3bDate);
										
										$("#M3bDate").change(function () {
											ctrlHandle(statistics3bDate, $(this).val(), "sel3bReason", "M3bDate");
										});
										
										//to give minimum date
										var applied = false;
										$("#M3bDate").focusin(function () {
											if (!applied) {
												$("#M3bDate").datepicker("option", "minDate", $("#M3aDate").val());
												applied = true;
											}
										});
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(4);
								reloadValidations();
								break;
								
							case STEPM3B:
								hideAll();
								
								$("#div3").find('img').each(function (i) {
									$(this).hide();
								})
								
								if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
									divToggle(DIV_STUDY_INFORMATION, SHOW);
									divToggle(DIV_MILESTONES, SHOW);
								}
								
								if ($(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_BIOINFORMATICS, SHOW);
									
									if ($(this).attr("ows_M4_BioInformatics_Analysis_date") != null) {
										var bioInformatics4Date = $(this).attr("ows_M4_BioInformatics_Analysis_date");
										bioInformatics4Date = conDate(bioInformatics4Date);
										
										$("#M4Date").change(function () {
											ctrlHandle(bioInformatics4Date, $(this).val(), "sel4Reason", "M4Date");
										});
										
										//to give minimum date
										var applied = false;
										$("#M4Date").focusin(function () {
											if (!applied) {
												$("#M4Date").datepicker("option", "minDate", $("#M3bDate").val());
												applied = true;
											}
										});
										
									}
								}
								
								if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
									divToggle(DIV_REQUEST_STUDY, SHOW);
								}
								if (needTabSetup)
									GeneralDiv(4);
								reloadValidations();
								break;
							case STEPM4:
								hideAll();
								
								$("#div4").find('img').each(function (i) {
									$(this).hide();
								})
								GeneralDiv(5);
								reloadValidations();
								break;
							} //Switch closed
						} else {
							hideAll();
						}
					});
				}
			});
			
			$("input[disabled='disabled']").addClass('disabled');
			$("textarea[disabled='disabled']").addClass('disabled');
			$("select[disabled='disabled']").addClass('disabled');
			$("div[title='People Picker']").addClass('disabled');
			
			if ($("#PlannedSmplDate").val() != "")
				$("#PlannedSmplDate").attr("disabled", true);
			
			if ($("#rna2aDate").val() != "")
				$("#rna2aDate").attr("disabled", true);
			
			if ($("#crna2bDate").val() != "")
				$("#crna2bDate").attr("disabled", true);
			
			if ($("#chips2cDate").val() != "")
				$("#chips2cDate").attr("disabled", true);
			
			if ($("#dataPosted2dDate").val() != "")
				$("#dataPosted2dDate").attr("disabled", true);
			
			if ($("#QC3aDate").val() != "")
				$("#QC3aDate").attr("disabled", true);
			
			if ($("#statistics3bDate").val() != "")
				$("#statistics3bDate").attr("disabled", true);
			
			if ($("#bioInformatics4Date").val() != "")
				$("#bioInformatics4Date").attr("disabled", true);
			
			//Design Start
			
			//Top Study Information
			$("#txtQuestion").width($("#selPurpose").width() - 1);
			//Deisgn End
			if (needAlert)
				jAlert('Study updated.', 'Alert Dialog');
			
			$('#divLoad').fadeOut(3000);
		}
	});
}

function applyWidth(ctrlsArray) {
	var ctrlsArrayWidth = new Array();
	
	$.each(ctrlsArray, function (i) {
		ctrlsArrayWidth.push($("#" + ctrlsArray[i]).width());
	});
	var biggest = Math.max.apply(null, ctrlsArrayWidth);
	
	$.each(ctrlsArray, function (i) {
		$("#" + ctrlsArray[i]).width(biggest);
	});
}

//change date format to jquery calendar
function conDate(date) {
	var ndate = date.split(" ")[0];
	ndate = ndate.split('-')[1] + "/" + ndate.split('-')[2] + "/" + ndate.split('-')[0];
	//alert(ndate);
	return ndate;
}

// Get MileStone array to store as remainders
function getMileStoneArray(option) {
	
	var userGC = $('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val();
	var statisticOwner = $('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val();
	var bioInfoOwner = $('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val();
	var MileStoneArray;
	var otherUser2 = '';
	
	if (option == 'Escalation') {
		otherUser2 = escOtherUsers;
	}
	
	StudyObj.SPFilterNode("z:row").each(function () {
		
		if (option == 'Escalation') {
			
			var allMembers = $(this).attr("ows_Author").split(';')[0] + ";#" + $(this).attr("ows_GC_x0020_Analyst").split(';')[0] + ";#" + $(this).attr("ows_Statistics_x0020_Owner").split(';')[0]
				 + ";#" + $(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(';')[0]
				
				var plannedSamples = ["", $(this).attr("ows_GSSID"), "Samples", SPdate($('#PlannedSmplDate').val()), "", $(this).attr("ows_GC_x0020_Analyst").split(';')[0], $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedRNAIsolation = ["", $(this).attr("ows_GSSID"), "RNA Isolation", SPdate($('#rna2aDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedCRNA = ["", $(this).attr("ows_GSSID"), "cRNA Label", SPdate($('#crna2bDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedChipsRun = ["", $(this).attr("ows_GSSID"), "Chips Run", SPdate($('#chips2cDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedDatePosted = ["", $(this).attr("ows_GSSID"), "Data Posted", SPdate($('#dataPosted2dDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedQC = ["", $(this).attr("ows_GSSID"), "Initial QC completion", SPdate($('#QC3aDate').val()), otherUser2, getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedStatsRpt = ["", $(this).attr("ows_GSSID"), "Statistics Report", SPdate($('#statistics3bDate').val()), otherUser2, getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			var plannedAnalysis = ["", $(this).attr("ows_GSSID"), "BioInformatics Analysis", SPdate($('#bioInformatics4Date').val()), otherUser2, getuserId(bioInfoOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name")];
			MileStoneArray = [plannedSamples, plannedRNAIsolation, plannedCRNA, plannedChipsRun, plannedDatePosted, plannedQC, plannedStatsRpt, plannedAnalysis];
			
		} else {
			
			var plannedSamples = ["", $(this).attr("ows_GSSID"), "Samples", SPdate($('#PlannedSmplDate').val()), $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedRNAIsolation = ["", $(this).attr("ows_GSSID"), "RNA Isolation", SPdate($('#rna2aDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedCRNA = ["", $(this).attr("ows_GSSID"), "cRNA Label", SPdate($('#crna2bDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedChipsRun = ["", $(this).attr("ows_GSSID"), "Chips Run", SPdate($('#chips2cDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedDatePosted = ["", $(this).attr("ows_GSSID"), "Data Posted", SPdate($('#dataPosted2dDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedQC = ["", $(this).attr("ows_GSSID"), "Initial QC completion", SPdate($('#QC3aDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedStatsRpt = ["", $(this).attr("ows_GSSID"), "Statistics Report", SPdate($('#statistics3bDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			var plannedAnalysis = ["", $(this).attr("ows_GSSID"), "BioInformatics Analysis", SPdate($('#bioInformatics4Date').val()), getuserId(bioInfoOwner), getuserId(bioInfoOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N", $(this).attr("ows_Study_x0020_Name"), otherUser2];
			MileStoneArray = [plannedSamples, plannedRNAIsolation, plannedCRNA, plannedChipsRun, plannedDatePosted, plannedQC, plannedStatsRpt, plannedAnalysis];
		}
		
	})
	
	return MileStoneArray;
}

//Updated Get MileStone array to store as remainders
function getChangedMileStone(mileIDs, option) {
	
	var userGC = $('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val();
	var statisticOwner = $('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val();
	var bioInfoOwner = $('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val();
	var MileStoneArray;
	
	var RIDS = mileIDs.split("##")
		
		if (option == 'Escalation') {
			otherUser2 = escOtherUsers;
		}
		
		StudyObj.SPFilterNode("z:row").each(function () {
			
			if (option == 'Escalation') {
				var allMembers = $(this).attr("ows_Author").split(';')[0] + ";#" + $(this).attr("ows_GC_x0020_Analyst").split(';')[0] + ";#" + $(this).attr("ows_Statistics_x0020_Owner").split(';')[0]
					 + ";#" + $(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(';')[0]
					
					var plannedSamples = [RIDS[0], $(this).attr("ows_GSSID"), "Samples", SPdate($('#PlannedSmplDate').val()), "", $(this).attr("ows_GC_x0020_Analyst").split(';')[0], $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M1_Anticipated_Samples"), $('#PlannedSmplDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedRNAIsolation = [RIDS[1], $(this).attr("ows_GSSID"), "RNA Isolation", SPdate($('#rna2aDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M2a_RNA_Isolation_Date"), $('#rna2aDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedCRNA = [RIDS[2], $(this).attr("ows_GSSID"), "cRNA Label", SPdate($('#crna2bDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M2b_cRNA_Dates_Label"), $('#crna2bDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedChipsRun = [RIDS[3], $(this).attr("ows_GSSID"), "Chips Run", SPdate($('#chips2cDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M2c_Date_Chips_Run"), $('#chips2cDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedDatePosted = [RIDS[4], $(this).attr("ows_GSSID"), "Data Posted", SPdate($('#dataPosted2dDate').val()), otherUser2, getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M2d_Date_Data_Posted"), $('#dataPosted2dDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedQC = [RIDS[5], $(this).attr("ows_GSSID"), "Initial QC completion", SPdate($('#QC3aDate').val()), otherUser2, getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M3a_Initial_QC_completion_date"), $('#QC3aDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedStatsRpt = [RIDS[6], $(this).attr("ows_GSSID"), "Statistics Report", SPdate($('#statistics3bDate').val()), otherUser2, getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M3b_Statistics_Report_Date"), $('#statistics3bDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedAnalysis = [RIDS[7], $(this).attr("ows_GSSID"), "BioInformatics Analysis", SPdate($('#bioInformatics4Date').val()), otherUser2, getuserId(bioInfoOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkEscDates($(this).attr("ows_M4_BioInformatics_Analysis_date"), $('#bioInformatics4Date').val()), $(this).attr("ows_Study_x0020_Name")];
				MileStoneArray = [plannedSamples, plannedRNAIsolation, plannedCRNA, plannedChipsRun, plannedDatePosted, plannedQC, plannedStatsRpt, plannedAnalysis];
				
			} else {
				
				var plannedSamples = [RIDS[0], $(this).attr("ows_GSSID"), "Samples", SPdate($('#PlannedSmplDate').val()), $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M1_Anticipated_Samples"), $('#PlannedSmplDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedRNAIsolation = [RIDS[1], $(this).attr("ows_GSSID"), "RNA Isolation", SPdate($('#rna2aDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2a_RNA_Isolation_Date"), $('#rna2aDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedCRNA = [RIDS[2], $(this).attr("ows_GSSID"), "cRNA Label", SPdate($('#crna2bDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2b_cRNA_Dates_Label"), $('#crna2bDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedChipsRun = [RIDS[3], $(this).attr("ows_GSSID"), "Chips Run", SPdate($('#chips2cDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2c_Date_Chips_Run"), $('#chips2cDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedDatePosted = [RIDS[4], $(this).attr("ows_GSSID"), "Data Posted", SPdate($('#dataPosted2dDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2d_Date_Data_Posted"), $('#dataPosted2dDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedQC = [RIDS[5], $(this).attr("ows_GSSID"), "Initial QC completion", SPdate($('#QC3aDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M3a_Initial_QC_completion_date"), $('#QC3aDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedStatsRpt = [RIDS[6], $(this).attr("ows_GSSID"), "Statistics Report", SPdate($('#statistics3bDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M3b_Statistics_Report_Date"), $('#statistics3bDate').val()), $(this).attr("ows_Study_x0020_Name")];
				var plannedAnalysis = [RIDS[7], $(this).attr("ows_GSSID"), "BioInformatics Analysis", SPdate($('#bioInformatics4Date').val()), getuserId(bioInfoOwner), getuserId(bioInfoOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M4_BioInformatics_Analysis_date"), $('#bioInformatics4Date').val()), $(this).attr("ows_Study_x0020_Name")];
				MileStoneArray = [plannedSamples, plannedRNAIsolation, plannedCRNA, plannedChipsRun, plannedDatePosted, plannedQC, plannedStatsRpt, plannedAnalysis];
			}
		})
		
		return MileStoneArray;
}

function checkMileStoneDates(oldDate2, newDate2) {
	
	var NewPlanDate = new Date(newDate2);
	var oldDt = oldDate2.split(" ")[0].split("-")
		var OldPlanDate = new Date(oldDt[1] + "/" + oldDt[2] + "/" + oldDt[0]);
	var currDate = new Date();
	if (OldPlanDate - NewPlanDate != 0) {
		if ((OldPlanDate - currDate) / (1000 * 60 * 60 * 24) > 3)
			return "U";
		else if ((OldPlanDate - currDate) / (1000 * 60 * 60 * 24) < 3)
			return "D";
		
	} else
		return "NO";
	
}

function checkEscDates(oldDate2, newDate2) {
	
	var NewPlanDate = new Date(newDate2);
	var oldDt = oldDate2.split(" ")[0].split("-")
		var OldPlanDate = new Date(oldDt[1] + "/" + oldDt[2] + "/" + oldDt[0]);
	var currDate = new Date();
	if (OldPlanDate - NewPlanDate != 0) {
		
		return "D";
	} else
		return "NO";
	
}

//check validations
function chkAllfilled(divID) {
	var status = false;
	$("#" + divID).find("input[type=text]").each(function () {
		if ($(this).val() == "") {
			status = true;
			$(this).focus();
			return false;
		}
	});
	
	$("#" + divID).find("select").each(function () {
		var n = $(this).prop("selectedIndex");
		//alert(n);
		var ctrlID = $(this).attr("ID");
		
		if (!addEdit) {
			if (ctrlID != "selRevMStone" && ctrlID != "selMilestonesReson" && ctrlID != "selCancelReason") {
				if (n == 0) {
					status = true;
					$(this).focus();
					return false;
				}
			}
		} else {
			if (ctrlID != "selCancelReason") {
				if (n == 0) {
					status = true;
					$(this).focus();
					return false;
				}
			}
		}
		
	});
	
	$("#" + divID).find("textarea").each(function () {
		var ctrlID = $(this).attr("ID");
		if (ctrlID != "ctl00_PlaceHolderMain_teamUsers_downlevelTextBox" && ctrlID != "txtareaMilestones" && ctrlID != "txtOthers") {
			
			if ($(this).val() == "") {
				status = true;
				$(this).focus();
				return false;
			}
		}
	});
	
	if (status == true) {
		alert("Please fill all mandatory fields.");
	} else {
		return true;
	}
}

//submit study info
function submitStudyInfo() {
	var gssCode = $('#txtGssId').val();
	//debugger
	var status = true;
	
	var userGC = "";
	if ($('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val() != "") {
		userGC = $('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val();
	} else {
		status = false;
		$('#ctl00_PlaceHolderMain_GCAnalyst_upLevelDiv').focus();
		$('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').focus();
	}
	
	var statisticOwner = "";
	if ($('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val() != "") {
		statisticOwner = $('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val();
	} else {
		status = false;
		$('#ctl00_PlaceHolderMain_statistics_upLevelDiv').focus();
		$('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').focus();
	}
	
	var bioInfoOwner = "";
	if ($('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val() != "") {
		bioInfoOwner = $('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val();
	} else {
		status = false;
		$('#ctl00_PlaceHolderMain_bolInfo_upLevelDiv').focus();
		$('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').focus();
	}
	
	var OtherUsers = "";
	if (status) {
		$("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").find('span').each(function (i) {
			if ((i + 1) % 2 != 0) {
				var userName = $(this).attr('title');
				if (userName != "undefined") {
					OtherUsers += getuserId(userName) + ";#a;#";
				}
			}
		})
		
		var studyGC = getuserName(userGC);
		var studyStats = getuserName(statisticOwner);
		var studyBio = getuserName(bioInfoOwner);
		
		var studyName = CorrectStringAsSPData($('#txtStudyName').val());
		var descriptionPurpose = CorrectStringAsSPData($('#txtPurpose').val());
		var numOfsamples = CorrectStringAsSPData($('#txtSamples').val());
		var strChipTypeVal = $("select[id='selChipType'] option:selected").val();
		var protocolNumber = CorrectStringAsSPData($('#txtProtocol').val());
		var timingsOfsample = $('#timingsSampleDate').val();
		var strTissueTypeVal = $("select[id='selTissue'] option:selected").val();
		
		if ($('#txtOthers'))
			var tissueOtherComments = CorrectStringAsSPData($('#txtOthers').val());
		
		var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
			"<Method ID='1' Cmd='Update'>" +
			"<Field Name='GSSID'>" + gssCode + "</Field>" +
			
			"<Field Name='GC_x0020_Analyst'>" + getuserId(userGC) + "</Field>" +
			"<Field Name='Statistics_x0020_Owner'>" + getuserId(statisticOwner) + "</Field>" +
			"<Field Name='Bio_x0020_Informatics_x0020_Owne'>" + getuserId(bioInfoOwner) + "</Field>" +
			
			"<Field Name='StudyGC'>" + studyGC.split(", ")[1] + " " + studyGC.split(", ")[0] + "</Field>" +
			"<Field Name='StudyStats'>" + studyStats.split(", ")[1] + " " + studyStats.split(", ")[0] + "</Field>" +
			"<Field Name='StudyBioInformatics'>" + studyBio.split(", ")[1] + " " + studyBio.split(", ")[0] + "</Field>" +
			
			"<Field Name='Study_x0020_Name'>" + studyName + "</Field>" +
			"<Field Name='DescriptionPurpose'>" + descriptionPurpose + "</Field>" +
			"<Field Name='Estimated_x0020_Number_x0020_of_'>" + numOfsamples + "</Field>" +
			"<Field Name='Chip_x0020_Type'>" + strChipTypeVal + "</Field>" +
			"<Field Name='ProtocolNumber'>" + protocolNumber + "</Field>" +
			"<Field Name='Estimated_timing'>" + SPdate(timingsOfsample) + "</Field>" +
			
			"<Field Name='TissueType'>" + strTissueTypeVal + "</Field>";
		
		if (step == STEP1) {
			strBatch += "<Field Name='enableStage'>" + STEP2 + "</Field>";
		}
		
		if (needCommentOnTissueType && tissueOtherComments == "") {
			status = false;
			alert("Please enter Tissue type comments");
			$("#txtOthers").focus();
		} else {
			strBatch += "<Field Name='tissueOtherComments'>" + tissueOtherComments + "</Field>";
		}
		
		escOtherUsers = OtherUsers;
		strBatch += "<Field Name='OtherTeamUsers'>" + OtherUsers + "</Field>" +
		"<Field Name='EnableWF'>2</Field>" +
		"<Field Name='ID'>" + itmid + "</Field>" +
		"</Method>" +
		"</Batch>";
	}
	if (status) {
		if (chkAllfilled('div1')) {
			update(strBatch);
		}
	}
}

//enter milestones
function submitMilestoneInfo() {
	if (!cancelStudy) {
		if (chkAllfilled('div5')) {
			var selOverStatus = $("select[id='selOverStatus'] option:selected").val();
			
			var PlannedSmplDate = $('#PlannedSmplDate').val();
			var rna2aDate = $('#rna2aDate').val();
			var crna2bDate = $('#crna2bDate').val();
			var chips2cDate = $('#chips2cDate').val();
			var dataPosted2dDate = $('#dataPosted2dDate').val();
			var QC3aDate = $('#QC3aDate').val();
			var statistics3bDate = $('#statistics3bDate').val();
			var bioInformatics4Date = $('#bioInformatics4Date').val();
			var chkDelay = $('#chkDelay').attr('checked') ? 1 : 0;
			var workflowHTML = "";
			
			var IsEditedDate = false;
			
			if (addEdit) {
				var selReasonForChangeText = $("select[id='selMilestonesReson'] option:selected").text();
				var selReasonForChange = $("select[id='selMilestonesReson'] option:selected").val();
				var selMilestone = $("select[id='selRevMStone'] option:selected").val();
				var commentsOnEdit = CorrectStringAsSPData($("#txtareaMilestones").val());
				
				workflowHTML += "&lt;table border=&#39;2&#39;&gt;&lt;tr&gt;&lt;td style=&quot;width:50px;background-color:#77BFC7&quot;&gt;Milestone&lt;/td&gt;&lt;td style=&quot;width:50px;background-color:#77BFC7&quot;&gt;Planned Date&lt;/td&gt;&lt;td style=&quot;width:50px;background-color:#77BFC7&quot;&gt;Revised Date&lt;/td&gt;&lt;/tr&gt;";
				
				if (dateM1 != "" && dateM1 != PlannedSmplDate) {
					logMilestones += "M1:" + logDate(PlannedSmplDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;1: Samples Reception:&lt;/td&gt;&lt;td&gt;" + dateM1 + "&lt;/td&gt;&lt;td&gt;" + PlannedSmplDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM2a != "" && dateM2a != rna2aDate) {
					logMilestones += "M2a:" + logDate(rna2aDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;2a: RNA Isolation:&lt;/td&gt;&lt;td&gt;" + dateM2a + "&lt;/td&gt;&lt;td&gt;" + rna2aDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM2b != "" && dateM2b != crna2bDate) {
					logMilestones += "M2b:" + logDate(crna2bDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;2b: cRNA Label:&lt;/td&gt;&lt;td&gt;" + dateM2b + "&lt;/td&gt;&lt;td&gt;" + crna2bDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM2c != "" && dateM2c != chips2cDate) {
					logMilestones += "M2c:" + logDate(chips2cDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;2c: Chips Run:&lt;/td&gt;&lt;td&gt;" + dateM2c + "&lt;/td&gt;&lt;td&gt;" + chips2cDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM2d != "" && dateM2d != dataPosted2dDate) {
					logMilestones += "M2d:" + logDate(dataPosted2dDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;2d: Data Posted :&lt;/td&gt;&lt;td&gt;" + dateM2d + "&lt;/td&gt;&lt;td&gt;" + dataPosted2dDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM3a != "" && dateM3a != QC3aDate) {
					logMilestones += "M3a:" + logDate(QC3aDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;3a: Initial QC Completion :&lt;/td&gt;&lt;td&gt;" + dateM3a + "&lt;/td&gt;&lt;td&gt;" + QC3aDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM3b != "" && dateM3b != statistics3bDate) {
					logMilestones += "M3b:" + logDate(statistics3bDate) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;3b: Statistics Report :&lt;/td&gt;&lt;td&gt;" + dateM3b + "&lt;/td&gt;&lt;td&gt;" + statistics3bDate + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				if (dateM4 != "" && dateM4 != bioInformatics4Date) {
					logMilestones += "M4:" + logDate(bioInformatics4Date) + ";";
					workflowHTML += "&lt;tr&gt;&lt;td&gt;4: BioInformatics Analysis:&lt;/td&gt;&lt;td&gt;" + dateM4 + "&lt;/td&gt;&lt;td&gt;" + bioInformatics4Date + "&lt;/td&gt;&lt;/tr&gt;";
					IsEditedDate = true;
				}
				
				workflowHTML += "&lt;/table&gt;";
				logMilestones += "Reason=" + selReasonForChangeText + ";";
				logMilestones += "RMStone=" + selMilestone + ";";
				logMilestones += "Comments=" + commentsOnEdit + ";";
				logMilestones += "##";
			} else {
				logMilestones += "##";
				logMilestones += "OD1:" + logDate(PlannedSmplDate) + ";";
				logMilestones += "OD2a:" + logDate(rna2aDate) + ";";
				logMilestones += "OD2b:" + logDate(crna2bDate) + ";";
				logMilestones += "OD2c:" + logDate(chips2cDate) + ";";
				logMilestones += "OD2d:" + logDate(dataPosted2dDate) + ";";
				logMilestones += "OD3a:" + logDate(QC3aDate) + ";";
				logMilestones += "OD3b:" + logDate(statistics3bDate) + ";";
				logMilestones += "OD4:" + logDate(bioInformatics4Date) + ";";
				logMilestones += "##";
			}
			
			//debugger
			//add reason to log columns
			
			if (RemainderIDS == "") {
				SaveRemainders(getMileStoneArray('Reminder'));
				SaveEscalations(getMileStoneArray('Escalation'))
				RemainderIDS = reminderIds;
				EscalationIDs = escalationIds;
			} else {
				SaveRemainders(getChangedMileStone(RemainderIDS, 'Reminder'));
				SaveEscalations(getChangedMileStone(EscalationIDs, 'Escalation'))
			}
			//alert(reminderIds )
			//alert(escalationIds)
			var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
				"<Method ID='1' Cmd='Update'>" +
				"<Field Name='M1_Anticipated_Samples'>" + SPdate(PlannedSmplDate) + "</Field>" +
				"<Field Name='M2a_RNA_Isolation_Date'>" + SPdate(rna2aDate) + "</Field>" +
				"<Field Name='M2b_cRNA_Dates_Label'>" + SPdate(crna2bDate) + "</Field>" +
				"<Field Name='M2c_Date_Chips_Run'>" + SPdate(chips2cDate) + "</Field>" +
				"<Field Name='M2d_Date_Data_Posted'>" + SPdate(dataPosted2dDate) + "</Field>" +
				"<Field Name='M3a_Initial_QC_completion_date'>" + SPdate(QC3aDate) + "</Field>" +
				"<Field Name='M3b_Statistics_Report_Date'>" + SPdate(statistics3bDate) + "</Field>" +
				"<Field Name='M4_BioInformatics_Analysis_date'>" + SPdate(bioInformatics4Date) + "</Field>" +
				
				"<Field Name='Overall_Study_Status'>" + selOverStatus + "</Field>" +
				"<Field Name='Delayed'>" + chkDelay + "</Field>" +
				"<Field Name='ReminderIds'>" + reminderIds + "</Field>" +
				"<Field Name='EscalationIDs'>" + escalationIds + "</Field>";
			
			//add reasons to log column
			if (addEdit) {
				strBatch += "<Field Name='ReasonForChange'>" + selReasonForChange + "</Field>" +
				"<Field Name='RevisedMstone'>" + selMilestone + "</Field>" +
				"<Field Name='MilestoneComments'>" + commentsOnEdit + "</Field>" +
				"<Field Name='RevisedStatus'>Yes</Field>" +
				"<Field Name='workflowHTML'>" + workflowHTML + "</Field>";
			}
			
			if (step == STEP2) {
				strBatch += "<Field Name='enableStage'>" + STEP3 + "</Field>";
			}
			
			strBatch += "<Field Name='LogMilestones'>" + logMilestones + "</Field>" +
			"<Field Name='EnableWF'>3</Field>" +
			"<Field Name='ID'>" + itmid + "</Field>" +
			"</Method>" +
			"</Batch>";
			if (addEdit) {
				if (IsEditedDate) {
					if (checkReasonFilled())
						update(strBatch);
				} else {
					alert("Invalid update!, Please change milestone date.");
				}
			} else {
				update(strBatch);
			}
		}
		
	} else {
		if ($("#selCancelReason").prop("selectedIndex") != 0) {
			var selCancelReason = $("select[id='selCancelReason'] option:selected").val();
			var chkCancel = $('#chkCancel').attr('checked') ? 1 : 0;
			
			var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
				"<Method ID='1' Cmd='Update'>" +
				"<Field Name='cancelReason'>" + selCancelReason + "</Field>";
			
			strBatch += "<Field Name='studyCancel'>" + chkCancel + "</Field>" +
			"<Field Name='ID'>" + itmid + "</Field>" +
			"</Method>" +
			"</Batch>";
			
			update(strBatch);
		} else {
			alert("Please select reason");
			$("#selCancelReason").focus();
			return false;
		}
	}
}

function checkReasonFilled() {
	var status = false;
	
	if ($("#selRevMStone").prop("selectedIndex") == 0) {
		status = true;
		$("#selRevMStone").focus();
		return false;
	}
	
	if ($("#selMilestonesReson").prop("selectedIndex") == 0) {
		status = true;
		$("#selMilestonesReson").focus();
		return false;
	}
	
	if ($("#txtareaMilestones").val() == "") {
		status = true;
		alert("Please fill all mandatory fields.");
		$("#txtareaMilestones").focus();
		return false;
	}
	
	if (status == true) {
		alert("Please fill all mandatory fields.");
	} else {
		return true;
	}
}

//to submit BU & GC Study details
function submitstudyDetails() {
	//debugger
	var gohead = true;
	if ($('#txtM1Date').val() != "")
		var txtM1Date = SPdate($('#txtM1Date').val());
	else
		var txtM1Date = "";
	
	var selM1Reason = $("select[id='selM1Reason'] option:selected").val();
	
	var selRNA = $("select[id='selRNA'] option:selected").val();
	
	if ($('#txtM2aDate').val() != "")
		var txtM2aDate = SPdate($('#txtM2aDate').val());
	else
		var txtM2aDate = "";
	
	var selM2Reason = $("select[id='selM2Reason'] option:selected").val();
	var txtCommentsM2a = CorrectStringAsSPData($('#txtCommentsM2a').val());
	var selcRNAprotocol = $("select[id='selcRNAprotocol'] option:selected").val();
	
	if ($('#M2bDate').val() != "")
		var M2bDate = SPdate($('#M2bDate').val());
	else
		var M2bDate = "";
	
	if ($('#M2cDate').val() != "")
		var M2cDate = SPdate($('#M2cDate').val());
	else
		var M2cDate = "";
	
	if ($('#M2dDate').val() != "")
		var M2dDate = SPdate($('#M2dDate').val());
	else
		var M2dDate = "";
	
	var selM2bReason = $("select[id='selM2bReason'] option:selected").val();
	var selM2cReason = $("select[id='selM2cReason'] option:selected").val();
	var selM2dReason = $("select[id='selM2dReason'] option:selected").val();
	var txtCommentsM2d = CorrectStringAsSPData($('#txtCommentsM2d').val());
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>";
	
	var enableStage = "";
	var eanableWF = "";
	
	switch (step) {
	case STEP3:
		enableStage = STEPM1;
		eanableWF = "4";
		
		if (txtM1Date != "") {
			strBatch += "<Field Name='M1_Actual_Samples_Received_Date'>" + txtM1Date + "</Field>";
		} else {
			alert('Please select date.');
			$("#txtM1Date").focus();
			gohead = false;
			break;
		}
		
		if (needReason && selM1Reason == 0) {
			alert('Please select reason');
			$("#selM1Reason").focus();
			gohead = false;
			break;
		}
		
		if (selM1Reason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_m1'>" + selM1Reason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M1</Field>";
		}
		
		strBatch += "<Field Name='Comments_M2a'>" + CorrectStringAsSPData(txtCommentsM2a) + "</Field>";
		break;
		
	case STEPM1:
		enableStage = STEPM2A;
		eanableWF = "5";
		
		if (selRNA != 0) {
			strBatch += "<Field Name='RNA_x0020_Procotol'>" + selRNA + "</Field>";
		} else {
			alert('Please select Protocol.');
			$("#selRNA").focus();
			gohead = false;
			break;
		}
		
		if (txtM2aDate != "") {
			strBatch += "<Field Name='M2a_act_RNA_Isolation_Date'>" + txtM2aDate + "</Field>";
		} else {
			alert('Please select date.');
			$("#txtM2aDate").focus();
			gohead = false;
			break;
		}
		
		strBatch += "<Field Name='Comments_M2a'>" + CorrectStringAsSPData(txtCommentsM2a) + "</Field>";
		
		if (needReason && selM2Reason == 0) {
			alert('Please select reason');
			$("#selM2Reason").focus();
			gohead = false;
			break;
		}
		
		if (selM2Reason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_M2a'>" + selM2Reason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M2a</Field>";
		}
		break;
		
	case STEPM2A:
		enableStage = STEPM2B;
		eanableWF = "6";
		
		if (selcRNAprotocol != 0) {
			strBatch += "<Field Name='cRNA_Protocol'>" + selcRNAprotocol + "</Field>";
		} else {
			alert('Please select cRNA Protocol.');
			$("#selcRNAprotocol").focus();
			gohead = false;
			break;
		}
		
		if (M2bDate != "") {
			strBatch += "<Field Name='M2b_cRNA_act_Dates_Label'>" + M2bDate + "</Field>";
		} else {
			alert('Please select date');
			$("#M2bDate").focus();
			gohead = false;
			break;
		}
		
		strBatch += "<Field Name='Comments_m2d'>" + CorrectStringAsSPData(txtCommentsM2d) + "</Field>";
		
		if (needReason && selM2bReason == 0) {
			alert('Please select reason');
			$("#selM2bReason").focus();
			gohead = false;
			break;
		}
		
		if (selM2bReason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_m2b'>" + selM2bReason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M2b</Field>";
		}
		break;
		
	case STEPM2B:
		enableStage = STEPM2C;
		eanableWF = "7";
		
		if (selcRNAprotocol != 0) {
			strBatch += "<Field Name='cRNA_Protocol'>" + selcRNAprotocol + "</Field>";
		} else {
			alert('Please select cRNA Protocol.');
			$("#selcRNAprotocol").focus();
			gohead = false;
			break;
		}
		
		if (M2cDate != "") {
			strBatch += "<Field Name='M2c_act_Chips_Run_date'>" + M2cDate + "</Field>";
		} else {
			alert('Please select date.');
			$("#M2cDate").focus();
			gohead = false;
			break;
		}
		
		strBatch += "<Field Name='Comments_m2d'>" + CorrectStringAsSPData(txtCommentsM2d) + "</Field>";
		
		if (needReason && selM2cReason == 0) {
			alert('Please select reason');
			$("#selM2cReason").focus();
			gohead = false;
			break;
		}
		
		if (selM2cReason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_m2c'>" + selM2cReason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M2c</Field>";
		}
		break;
		
	case STEPM2C:
		enableStage = STEPM2D;
		eanableWF = "8";
		
		if (selcRNAprotocol != 0) {
			strBatch += "<Field Name='cRNA_Protocol'>" + selcRNAprotocol + "</Field>";
		} else {
			alert('Please select cRNA Protocol.');
			$("#selcRNAprotocol").focus();
			gohead = false;
			break;
		}
		
		if (M2dDate != "") {
			strBatch += "<Field Name='M2d_act_Data_Posted_date'>" + M2dDate + "</Field>";
		} else {
			alert('Plese enter date.');
			$("#M2dDate").focus();
			gohead = false;
			break;
		}
		
		strBatch += "<Field Name='Comments_m2d'>" + CorrectStringAsSPData(txtCommentsM2d) + "</Field>";
		
		if (needReason && selM2dReason == 0) {
			alert('Please select reason');
			$("#selM2dReason").focus();
			gohead = false;
			break;
		}
		
		if (selM2dReason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_m2d'>" + selM2dReason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M2d</Field>";
		}
		break;
	}
	
	strBatch += "<Field Name='enableStage'>" + enableStage + "</Field>" +
	"<Field Name='EnableWF'>" + eanableWF + "</Field>";
	
	strBatch += "<Field Name='ID'>" + itmid + "</Field>" +
	"</Method>" +
	"</Batch>";
	if (gohead) {
		update(strBatch);
		saveMileStone("divBtns");
	}
}

//submit statistics
function submitStatistics() {
	var gohead = true;
	
	if ($('#M3aDate').val() != "")
		var M3aDate = SPdate($('#M3aDate').val());
	else
		var M3aDate = "";
	
	if ($('#M3bDate').val() != "")
		var M3bDate = SPdate($('#M3bDate').val());
	else
		var M3bDate = "";
	
	var sel3aReason = $("select[id='sel3aReason'] option:selected").val();
	var sel3bReason = $("select[id='sel3bReason'] option:selected").val();
	
	var txtComments3b = CorrectStringAsSPData($('#txtComments3b').val());
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>";
	
	var enableStage = "";
	var eanableWF = "";
	
	switch (step) {
		
	case STEPM2D:
		enableStage = STEPM3A;
		eanableWF = "9";
		
		if (M3aDate != "") {
			strBatch += "<Field Name='M3a_act_Initial_QC_completion_da'>" + M3aDate + "</Field>";
		} else {
			alert('Please select date.');
			$("#M3aDate").focus();
			gohead = false;
			break;
		}
		
		strBatch += "<Field Name='Comments_m3b'>" + txtComments3b + "</Field>";
		
		if (needReason && sel3aReason == 0) {
			alert('Please select reason');
			$("#sel3aReason").focus();
			gohead = false;
			break;
		}
		
		if (sel3aReason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_m3a'>" + sel3aReason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M3a</Field>";
		}
		break;
		
	case STEPM3A:
		enableStage = STEPM3B;
		eanableWF = "10";
		
		if (M3bDate != "")
			strBatch += "<Field Name='M3b_act_Statistics_Report_Date'>" + M3bDate + "</Field>";
		else {
			alert('Please select date.');
			$("#M3bDate").focus();
			gohead = false;
			break;
		}
		
		strBatch += "<Field Name='Comments_m3b'>" + txtComments3b + "</Field>";
		
		if (needReason && sel3bReason == 0) {
			alert('Please select reason');
			$("#sel3bReason").focus();
			gohead = false;
			break;
		}
		
		if (sel3bReason != 0) {
			strBatch += "<Field Name='Reason_for_Delay_m3b'>" + sel3bReason + "</Field>";
			strBatch += "<Field Name='ReasonIn'>M3b</Field>";
		}
		break;
	}
	
	strBatch += "<Field Name='enableStage'>" + enableStage + "</Field>" +
	"<Field Name='EnableWF'>" + eanableWF + "</Field>";
	
	strBatch += "<Field Name='ID'>" + itmid + "</Field>" +
	"</Method>" +
	"</Batch>";
	
	if (gohead) {
		update(strBatch);
		saveMileStone("div3");
		
	}
	
}

function submitBioinfo() {
	
	var gohead = true;
	
	if ($('#M4Date').val() != "")
		var M4Date = SPdate($('#M4Date').val());
	else
		var M4Date = "";
	
	var sel4Reason = $("select[id='sel4Reason'] option:selected").val();
	var txtComments4 = CorrectStringAsSPData($('#txtComments4').val());
	
	var enableStage = STEPM4;
	var eanableWF = "11";
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>";
	
	if (M4Date != "") {
		strBatch += "<Field Name='BioInformatics_Analysis_date_4'>" + M4Date + "</Field>";
	} else {
		alert('Please select date.');
		$("#M4Date").focus();
		gohead = false;
	}
	
	strBatch += "<Field Name='Comments_4'>" + txtComments4 + "</Field>";
	
	if (needReason && sel4Reason == 0) {
		alert('Please select reason');
		$("#sel4Reason").focus();
		gohead = false;
	}
	
	if (sel4Reason != 0) {
		strBatch += "<Field Name='Reason_for_Delay_4'>" + sel4Reason + "</Field>";
		strBatch += "<Field Name='ReasonIn'>M4</Field>";
	}
	
	strBatch += "<Field Name='enableStage'>" + enableStage + "</Field>" +
	"<Field Name='EnableWF'>" + eanableWF + "</Field>" +
	"<Field Name='ID'>" + itmid + "</Field>" +
	"</Method>" +
	"</Batch>";
	
	if (gohead) {
		update(strBatch);
		saveMileStone("div4");
		
		//delete Reminders
		if (RemainderIDS != "") {
			deleteReminders(getIdarray(RemainderIDS), "ActualStudyReminders");
		}
		
		if (EscalationIDs != "")
			//delete Escalations
			deleteReminders(getIdarray(EscalationIDs), "ActualEscalations");
		
	}
}

function getIdarray(ids) {
	//var ids = "112##113##114##115##116##117##118##119##";
	var strArr = new Array();
	strArr = ids.split("##");
	
	var strQuery = "<Batch PreCalc='TRUE' OnError='Continue'>";
	
	$.each(strArr, function (i) {
		if (strArr[i] != "") {
			//alert(strArr[i]);
			strQuery += "<Method ID='" + (i + 1) + "' Cmd='Delete'><Field Name='ID'>" + strArr[i] + "</Field></Method>";
		}
	});
	
	strQuery += "</Batch>";
	return strQuery;
}

// Delete Reminders and Escalations
function deleteReminders(strQuery, strList) {
	$().SPServices({
		operation : "UpdateListItems",
		async : false,
		batchCmd : "Update",
		listName : strList,
		updates : strQuery,
		debug : true,
		
		completefunc : function (xData, Status) {
			
			if (Status != 'success')
				alert(Status);
			else {
				//jAlert('Reminders & Escalations are deleted.', 'Alert Dialog');
			}
		}
	});
}

function update(strBatch) {
	$('#divLoad').show();
	//debugger
	$().SPServices({
		operation : "UpdateListItems",
		async : false,
		batchCmd : "Update",
		listName : "Study",
		updates : strBatch,
		debug : true,
		completefunc : function (xData, Status) {
			if (Status != 'success')
				alert(Status);
			else {
				needTabSetup = false;
				needAlert = true;
				contentLoad(itmid);
				//jAlert('Study updated.', 'Alert Dialog');
				//alert("Study updated.");
			}
		}
	});
}

//update purpose
function updatePurpose() {
	var selPurpose = $("select[id='selPurpose'] option:selected").val();
	var txtQuestion = $('#txtQuestion').val();
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>" +
		"<Field Name='Purpose'>" + selPurpose + "</Field>" +
		"<Field Name='Fundamental_questions'>" + txtQuestion + "</Field>" +
		
		"<Field Name='EnableWF'>1</Field>" +
		"<Field Name='ID'>" + itmid + "</Field>" +
		"</Method>" +
		"</Batch>";
	if (chkAllfilled('divmain')) {
		update(strBatch);
	}
}

//convert date to SPDate
function SPdate(strdate) {
	var Gdate = strdate.split('/')[2] + "-" + strdate.split('/')[0] + "-" + strdate.split('/')[1] + "T00:00:00Z";
	//2013-01-28T00:00:00Z
	return Gdate;
}

//convert date into log info
function logDate(strdate) {
	var Gdate = strdate.split('/')[2] + "-" + strdate.split('/')[0] + "-" + strdate.split('/')[1];
	//2013-01-28
	return Gdate;
}

//get user id by passing the login name
function getuserId(userName) {
	var uId = '';
	$().SPServices({
		operation : 'GetUserInfo',
		userLoginName : userName,
		async : false,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("User").each(function () {
				uId = $(this).attr("ID");
			});
		}
	});
	return uId;
}

//get name
function getuserName(userName) {
	var uId = '';
	$().SPServices({
		operation : 'GetUserInfo',
		userLoginName : userName,
		async : false,
		completefunc : function (xData, Status) {
			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("User").each(function () {
				uName = $(this).attr("Name");
			});
		}
	});
	return uName;
}

//fill dropdowns
function fillSelects() {
	addOption(document.getElementById('selPurpose'), 'Purpose');
	
	addOption(document.getElementById('selChipType'), 'Chip Type');
	addOption(document.getElementById('selTissue'), 'Tissue Type');
	addOption(document.getElementById('selRNA'), 'RNA Procotol');
	addOption(document.getElementById('selcRNAprotocol'), 'cRNA Protocol');
	
	addOption(document.getElementById('selM1Reason'), 'Milestone1 Delay Reason');
	addOption(document.getElementById('selM2Reason'), 'Milestone2a Delay Reason');
	addOption(document.getElementById('selM2bReason'), 'Milestone2b Delay Reason');
	addOption(document.getElementById('selM2cReason'), 'Milestone2c Delay Reason');
	addOption(document.getElementById('selM2dReason'), 'Milestone2d Delay Reason');
	addOption(document.getElementById('sel3aReason'), 'Milestone3a-3b Delay Reason');
	addOption(document.getElementById('sel3bReason'), 'Milestone3a-3b Delay Reason');
	addOption(document.getElementById('sel4Reason'), 'Milestone4 Delay Reason');
	addOption(document.getElementById('selCancelReason'), 'Cancel Study');
	
	$("#txtQuestion").width($("#selPurpose").width() - 1);
}

//add options to dropdown controls
function addOption(selectbox, strCat) {
	//debugger
	var options = loadControls(strCat);
	var items = options[0];
	var vals = options[1];
	for (i = 0; i < items.length; i++) {
		var optn = document.createElement("OPTION");
		optn.text = items[i];
		optn.value = vals[i];
		selectbox.options.add(optn);
	}
}

//reset controls
function resetControls() {
	$('input[type="text"]').val('');
	$('select').prop('selectedIndex', 0);
	$('textarea').val('');
}

//load control items from the source list
function loadControls(strCat) {
	var selOptions = new Array();
	var FSObjType = new Array();
	
	var i = 0;
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Keywords",
		CAMLViewFields : "<ViewFields><FieldRef Name='Title' /></ViewFields>",
		CAMLQuery : "<Query><OrderBy><FieldRef Name='Title' /></OrderBy><Where><Contains><FieldRef Name='Category' /><Value Type='Choice'>" + strCat + "</Value></Contains></Where></Query>",
		completefunc : function (xData, Status) {
			if (Status == 'success') {
				$(xData.responseXML).SPFilterNode("z:row").each(function () {
					selOptions[i] = $(this).attr("ows_Title");
					FSObjType[i] = $(this).attr("ows_FSObjType").split(';')[0];
					i++;
				});
			} else {
				alert(Status);
			}
		}
	});
	//debugger
	return [selOptions, FSObjType];
}

//add item when clicked submit button
function addPurpose() {
	var strPurpose = $("select[id='selPurpose'] option:selected").text();
	var strPurposeval = $("select[id='selPurpose'] option:selected").val();
	var strQuestion = $("textarea#txtQuestion").val();
	var studyAuthor = $("a[id$='_Menu']").text().split(' ')
		
		if (chkAllfilled('divmain')) {
			//alert(strPurpose + "," + strQuestion);
			$().SPServices({
				operation : "UpdateListItems",
				async : false,
				batchCmd : "New",
				listName : "Study",
				updates : "<Batch OnError='Continue' PreCalc='TRUE'>" +
				"<Method ID='1' Cmd='New'>" +
				"<Field Name='Fundamental_questions'>" + CorrectStringAsSPData(strQuestion) + "</Field>" +
				"<Field Name='Purpose' Type='LookUp' LookUpID='True'>" + strPurposeval + "</Field>" +
				"<Field Name='StudyAuthor'>" + studyAuthor[2] + " " + studyAuthor[1].split(",")[0] + "</Field>" +
				"<Field Name='enableStage'>Step1</Field>" +
				"<Field Name='EnableWF'>1</Field>" +
				"</Method>" +
				"</Batch>",
				completefunc : function (xData, Status) {
					resetControls();
					jAlert('Successfully added', 'Alert Dialog');
					if (Status != 'success')
						alert(Status);
				}
			});
		}
}

//to generate random GSSD number
function randomN() {
	var randomNum = Math.floor((Math.random() * 100000) + 1);
	return randomNum;
}

//to load other tabs when cliked on the tabs
function GeneralDiv(divs) {
	document.getElementById("tb1").src = '../../images/tb1_nor.jpg';
	document.getElementById("tb2").src = '../../images/tb2_ovr.jpg';
	document.getElementById("tb3").src = '../../images/tb3_ovr.jpg';
	document.getElementById("tb4").src = '../../images/tb4_ovr.jpg';
	document.getElementById("tb5").src = '../../images/tb5_ovr.jpg';
	document.getElementById("tb6").src = '../../images/tb6_ovr.jpg';
	if (divs == 1) {
		document.getElementById("tb1").style.cursor = 'default';
		document.getElementById("tb2").style.cursor = 'pointer';
		document.getElementById("tb3").style.cursor = 'pointer';
		document.getElementById("tb4").style.cursor = 'pointer';
		document.getElementById("tb5").style.cursor = 'pointer';
		document.getElementById("tb6").style.cursor = 'pointer';
		
		document.getElementById("divmain").style.display = 'block';
		document.getElementById("div1").style.display = 'none';
		document.getElementById("div2").style.display = 'none';
		document.getElementById("div3").style.display = 'none';
		document.getElementById("div4").style.display = 'none';
		document.getElementById("div5").style.display = 'none';
		
		document.getElementById("tb1").src = '../../images/tb1_nor.jpg';
		document.getElementById("tb2").src = '../../images/tb2_ovr.jpg';
		document.getElementById("tb3").src = '../../images/tb3_ovr.jpg';
		document.getElementById("tb4").src = '../../images/tb4_ovr.jpg';
		document.getElementById("tb5").src = '../../images/tb5_ovr.jpg';
		document.getElementById("tb6").src = '../../images/tb6_ovr.jpg';
		$("#txtQuestion").width($("#selPurpose").width() - 1);
		
	} else if (divs == 2) {
		document.getElementById("tb1").style.cursor = 'pointer';
		document.getElementById("tb2").style.cursor = 'default';
		document.getElementById("tb3").style.cursor = 'pointer';
		document.getElementById("tb4").style.cursor = 'pointer';
		document.getElementById("tb5").style.cursor = 'pointer';
		document.getElementById("tb6").style.cursor = 'pointer';
		
		document.getElementById("divmain").style.display = 'none';
		document.getElementById("div1").style.display = 'block';
		document.getElementById("div2").style.display = 'none';
		document.getElementById("div3").style.display = 'none';
		document.getElementById("div4").style.display = 'none';
		document.getElementById("div5").style.display = 'none';
		
		document.getElementById("tb1").src = '../../images/tb1_ovr.jpg';
		document.getElementById("tb2").src = '../../images/tb2_nor.jpg';
		document.getElementById("tb3").src = '../../images/tb3_ovr.jpg';
		document.getElementById("tb4").src = '../../images/tb4_ovr.jpg';
		document.getElementById("tb5").src = '../../images/tb5_ovr.jpg';
		document.getElementById("tb6").src = '../../images/tb6_ovr.jpg';
		//Study Information
		var studyInformationArray = ["txtGssId", "txtStudyName", "txtSamples", "selChipType", "timingsSampleDate", "selTissue"]
		applyWidth(studyInformationArray);
		
		var tx = $("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").width();
		//var divW = $("#ctl00_PlaceHolderMain_teamUsers_upLevelDiv").width();
		//var txtW = $("#ctl00_PlaceHolderMain_teamUsers_downlevelTextBox").width();
		//var boxwidths = [txtW, divW]
		//var tx = Math.max.apply(null, boxwidths);
		
		$("#txtPurpose").width(342);
		$("#txtProtocol").width(342);
		
		$("#txtOthers").width(342);
		
	} else if (divs == 3) {
		document.getElementById("tb1").style.cursor = 'pointer';
		document.getElementById("tb2").style.cursor = 'pointer';
		document.getElementById("tb3").style.cursor = 'default';
		document.getElementById("tb4").style.cursor = 'pointer';
		document.getElementById("tb5").style.cursor = 'pointer';
		document.getElementById("tb6").style.cursor = 'pointer';
		
		document.getElementById("divmain").style.display = 'none';
		document.getElementById("div1").style.display = 'none';
		document.getElementById("div2").style.display = 'block';
		document.getElementById("div3").style.display = 'none';
		document.getElementById("div4").style.display = 'none';
		document.getElementById("div5").style.display = 'none';
		
		document.getElementById("tb1").src = '../../images/tb1_ovr.jpg';
		document.getElementById("tb2").src = '../../images/tb2_ovr.jpg';
		document.getElementById("tb3").src = '../../images/tb3_nor.jpg';
		document.getElementById("tb4").src = '../../images/tb4_ovr.jpg';
		document.getElementById("tb5").src = '../../images/tb5_ovr.jpg';
		document.getElementById("tb6").src = '../../images/tb6_ovr.jpg';
		
		//Genomics
		var genomicsLftCtrls = ["txtM1Date", "selRNA", "txtM2aDate", "selcRNAprotocol", "M2bDate", "M2cDate", "M2dDate"];
		applyWidth(genomicsLftCtrls);
		
		var genomicsRtCtrls = ["selM1Reason", "selM2Reason", "selM2bReason", "selM2cReason", "selM2dReason"]
		applyWidth(genomicsRtCtrls);
		
	} else if (divs == 4) {
		document.getElementById("tb1").style.cursor = 'pointer';
		document.getElementById("tb2").style.cursor = 'pointer';
		document.getElementById("tb3").style.cursor = 'pointer';
		document.getElementById("tb4").style.cursor = 'default';
		document.getElementById("tb5").style.cursor = 'pointer';
		document.getElementById("tb6").style.cursor = 'pointer';
		
		document.getElementById("divmain").style.display = 'none';
		document.getElementById("div1").style.display = 'none';
		document.getElementById("div2").style.display = 'none';
		document.getElementById("div3").style.display = 'block';
		document.getElementById("div4").style.display = 'none';
		document.getElementById("div5").style.display = 'none';
		
		document.getElementById("tb1").src = '../../images/tb1_ovr.jpg';
		document.getElementById("tb2").src = '../../images/tb2_ovr.jpg';
		document.getElementById("tb3").src = '../../images/tb3_ovr.jpg';
		document.getElementById("tb4").src = '../../images/tb4_nor.jpg';
		document.getElementById("tb5").src = '../../images/tb5_ovr.jpg';
		document.getElementById("tb6").src = '../../images/tb6_ovr.jpg';
	} else if (divs == 5) {
		document.getElementById("tb1").style.cursor = 'pointer';
		document.getElementById("tb2").style.cursor = 'pointer';
		document.getElementById("tb3").style.cursor = 'pointer';
		document.getElementById("tb4").style.cursor = 'pointer';
		document.getElementById("tb5").style.cursor = 'default';
		document.getElementById("tb6").style.cursor = 'pointer';
		
		document.getElementById("divmain").style.display = 'none';
		document.getElementById("div1").style.display = 'none';
		document.getElementById("div2").style.display = 'none';
		document.getElementById("div3").style.display = 'none';
		document.getElementById("div4").style.display = 'block';
		document.getElementById("div5").style.display = 'none';
		
		document.getElementById("tb1").src = '../../images/tb1_ovr.jpg';
		document.getElementById("tb2").src = '../../images/tb2_ovr.jpg';
		document.getElementById("tb3").src = '../../images/tb3_ovr.jpg';
		document.getElementById("tb4").src = '../../images/tb4_ovr.jpg';
		document.getElementById("tb5").src = '../../images/tb5_nor.jpg';
		document.getElementById("tb6").src = '../../images/tb6_ovr.jpg';
	} else if (divs == 6) {
		document.getElementById("tb1").style.cursor = 'pointer';
		document.getElementById("tb2").style.cursor = 'pointer';
		document.getElementById("tb3").style.cursor = 'pointer';
		document.getElementById("tb4").style.cursor = 'pointer';
		document.getElementById("tb5").style.cursor = 'pointer';
		document.getElementById("tb6").style.cursor = 'default';
		
		document.getElementById("divmain").style.display = 'none';
		document.getElementById("div1").style.display = 'none';
		document.getElementById("div2").style.display = 'none';
		document.getElementById("div3").style.display = 'none';
		document.getElementById("div4").style.display = 'none';
		document.getElementById("div5").style.display = 'block';
		
		document.getElementById("tb1").src = '../../images/tb1_ovr.jpg';
		document.getElementById("tb2").src = '../../images/tb2_ovr.jpg';
		document.getElementById("tb3").src = '../../images/tb3_ovr.jpg';
		document.getElementById("tb4").src = '../../images/tb4_ovr.jpg';
		document.getElementById("tb5").src = '../../images/tb5_ovr.jpg';
		document.getElementById("tb6").src = '../../images/tb6_nor.jpg';
		
		//Milestones
		var milestonesCtrlsArray = ["PlannedSmplDate", "rna2aDate", "crna2bDate", "chips2cDate", "dataPosted2dDate", "QC3aDate", "statistics3bDate", "bioInformatics4Date", "selOverStatus"];
		applyWidth(milestonesCtrlsArray);
		
	}
}

function today() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var today = mm + '/' + dd + '/' + yyyy;
	//document.write(today);
	return [mm, dd, yyyy];
}

function DateComparison(date1, date2) {
	
	if (date1 < date2) {
		return true;
	} else {
		return false;
	}
}

//This function to save Milestone Documents.
function saveMileStone(currdivID) {
	
	var batchupdate = "<Batch OnError='Continue' >";
	
	$("#" + currdivID).find('img').each(function () {
		
		if ($(this).attr('src').indexOf("DeleteRed.png") > 0) {
			batchupdate += "<Method ID='1' Cmd='Update'><Field Name='ID'>" + $(this).parent().next().html() + "</Field><Field Name='Flag'>1</Field></Method>";
		}
	})
	
	batchupdate += "</Batch>";
	
	$().SPServices({
		operation : "UpdateListItems",
		async : false,
		batchCmd : "Update",
		listName : "Milestone_Documents",
		updates : batchupdate,
		completefunc : function (xData, Status) {
			
			if (Status == "success") {}
		}
		
	})
	
}

//To delete milestone Documents
function delMileDoc(mileID, curObj, fileref) {
	
	$().SPServices({
		operation : "UpdateListItems",
		async : false,
		batchCmd : "Delete",
		listName : "Milestone_Documents",
		updates : "<Batch OnError='Continue' ><Method ID='1' Cmd='Delete'><Field Name='ID'>" + mileID + "</Field><Field Name='FileRef'>" + fileref + "</Field></Method></Batch>",
		completefunc : function (xData, Status) {
			
			if (Status == "success") {
				alert('File Deleted Successfully')
				$(curObj).parent().parent().remove();
			}
		}
		
	})
	
}

//enable & disable Reason for delay ctrls
function ctrlHandle(plan, actual, ctrlId, txtId) {
	//debugger
	if (DateComparison(plan, actual)) {
		jConfirm('Selected Actual date:<b style="color:#342D7E">' + actual + '</b> is greater than Planned date:<b style="color:#342D7E">' + plan + '</b>, Do you want to continue?', 'Confirmation Dialog', function (r) {
			if (r) {
				//jAlert('Yes', 'Test');
				$("#" + ctrlId).attr("disabled", false);
				$("#" + ctrlId).removeClass('disabled');
				needReason = true;
			} else {
				jAlert('Please select another date', 'Notification');
				$("#" + ctrlId).attr("disabled", false);
				$("#" + ctrlId).removeClass('disabled');
				needReason = true;
				$("#" + txtId).val("");
				$("#" + txtId).focus();
			}
		});
	} else {
		$("#" + ctrlId).attr("disabled", true);
		$("#" + ctrlId).addClass('disabled');
		$("#" + ctrlId).get(0).selectedIndex = 0;
		needReason = false;
	}
}

//function to fetch all existing document in milestones.
function getMileStoneDocument() {
	
	if (currGroup != "" && fileAdded == false) {
		var UserName = $().SPServices.SPGetCurrentUser({
				fieldName : "Title",
				debug : false
			});
		var userId = getuserId(curUser);
		
		var strHtml = "";
		
		var viewFlds = "<ViewFields><FieldRef Name='ID' /><FieldRef Name='FileRef' /><FieldRef Name='Name' /><FieldRef Name='CreatedBy' /></ViewFields>";
		
		var mileQuery = "<Query><Where><And><And><Eq><FieldRef Name='Title' /><Value Type='Text'>" + GSSID + "</Value></Eq><Eq><FieldRef Name='Flag' /><Value Type='Choice'>1</Value></Eq></And><Eq><FieldRef Name='" + currGroup + "' /><Value Type='User'>" + UserName + "</Value></Eq></And></Where></Query>";
		
		$().SPServices({
			operation : "GetListItems",
			async : false,
			listName : "Milestone_Documents",
			CAMLQueryOptions : "<QueryOptions><ViewAttributes Scope='Recursive'/></QueryOptions>",
			CAMLQuery : mileQuery,
			CAMLViewFields : viewFlds,
			completefunc : function (xData, Status) {
				
				var strFileName = "";
				
				var strFiles = "";
				$(xData.responseXML).SPFilterNode("z:row").each(function () {
					
					var fileName = $(this).attr('ows_FileRef').split('#')[1].split('/');
					MileStoneDocURL = "http://teamspace.pg.com/" + $(this).attr('ows_FileRef').split('#')[1];
					MMilesStoneName = $(this).attr('ows_FileLeafRef').split('#')[1];
					MilestoneDocID = $(this).attr('ows_ID');
					
					if (fileName[3] == "BU" && currGroup == "BU") {
						strFiles += "<tr><td  width='20%' style='padding-left:10px'><a href='" + MileStoneDocURL + "'>" + MMilesStoneName + "</a></td><td  style='display:none'>" + MilestoneDocID + "</td></tr>";
						strFileName = fileName[3];
					} else if (fileName[3] == "GC" && currGroup == "GC") {
						strFiles += "<tr><td  width='20%' style='padding-left:10px'><a href='" + MileStoneDocURL + "'>" + MMilesStoneName + "</a></td><td style='display:none'>" + MilestoneDocID + "</td></tr>";
						strFileName = fileName[3];
					} else if (fileName[3] == "Statistics" && currGroup == "Stats") {
						strFiles += "<tr><td   width='20%' style='padding-left:10px'><a href='" + MileStoneDocURL + "'>" + MMilesStoneName + "</a></td><td  style='display:none'>" + MilestoneDocID + "</td></tr>";
						strFileName = fileName[3];
					} else if (fileName[3] == "Bioinformatics" && currGroup == "BioInformatics") {
						strFiles += "<tr><td  width='20%' style='padding-left:10px'><a href='" + MileStoneDocURL + "'>" + MMilesStoneName + "</a></td ><td style='display:none'>" + MilestoneDocID + "</td></tr>";
						strFileName = fileName[3];
					}
					fileAdded = true;
				})
				
				if (strFiles != "") {
					strHtml = "<table width='300' border='0'  cellpadding='4' cellspacing='1' ><tr>" +
						"<td width='200' colspan=2 height='20' align='left'  style='font-weight:bold'>&nbsp; Attachments</td></tr>";
					
					$("#" + strFileName + "Attach").parent().parent().parent().parent().find('td:last').html(strHtml + strFiles + "</table>");
				}
			}
		});
	}
}

//to validate the milestone dates
function milestonesDates() {
	//alert("Milestones added");
	
	$("#PlannedSmplDate").change(function () {
		datesValidation("PlannedSmplDate", "rna2aDate");
	});
	
	//
	/*
	$("#rna2aDate").focusin(function () {
	datesValidation("PlannedSmplDate", "rna2aDate");
	});
	 */
	$("#rna2aDate").change(function () {
		datesValidation("rna2aDate", "crna2bDate");
	});
	
	//
	/*
	$("#crna2bDate").focusin(function () {
	datesValidation("rna2aDate", "crna2bDate");
	});
	 */
	$("#crna2bDate").change(function () {
		datesValidation("crna2bDate", "chips2cDate");
	});
	
	//
	/*
	$("#chips2cDate").focusin(function () {
	datesValidation("crna2bDate", "chips2cDate");
	});
	 */
	
	$("#chips2cDate").change(function () {
		datesValidation("chips2cDate", "dataPosted2dDate");
	});
	
	//
	/*
	$("#dataPosted2dDate").focusin(function () {
	datesValidation("chips2cDate", "dataPosted2dDate");
	});
	 */
	
	$("#dataPosted2dDate").change(function () {
		datesValidation("dataPosted2dDate", "QC3aDate");
	});
	
	//
	/*
	$("#QC3aDate").focusin(function () {
	datesValidation("dataPosted2dDate", "QC3aDate");
	});
	 */
	$("#QC3aDate").change(function () {
		datesValidation("QC3aDate", "statistics3bDate");
	});
	
	//
	/*
	$("#statistics3bDate").focusin(function () {
	datesValidation("QC3aDate", "statistics3bDate");
	});
	 */
	
	$("#statistics3bDate").change(function () {
		datesValidation("statistics3bDate", "bioInformatics4Date");
	});
}

function datesValidation(ctrl1, ctrl2) {
	test = $("#" + ctrl1).datepicker('getDate');
	testm = new Date(test.getTime());
	//testm.setDate(testm.getDate() + 1);
	testm.setDate(testm.getDate());
	
	$("#" + ctrl2).datepicker("option", {
		minDate : null,
		maxDate : null
	});
	
	var date1 = $("#" + ctrl1).val();
	var date2 = $("#" + ctrl2).val();
	
	if (!DateComparison2(date1, date2)) {
		$("#" + ctrl2).val("");
	}
	$("#" + ctrl2).datepicker("option", "minDate", testm);
}

function DateComparison2(date1, date2) {
	
	if (date1 <= date2) {
		return true;
	} else {
		return false;
	}
}

function reloadValidations() {
	//1
	var applied1 = false;
	$("#rna2aDate").focusin(function () {
		if (!applied1) {
			$("#rna2aDate").datepicker("option", "minDate", $("#PlannedSmplDate").val());
			applied1 = true;
		}
	});
	
	//2
	var applied2 = false;
	$("#crna2bDate").focusin(function () {
		if (!applied2) {
			$("#crna2bDate").datepicker("option", "minDate", $("#rna2aDate").val());
			applied2 = true;
		}
	});
	
	//3
	var applied3 = false;
	$("#chips2cDate").focusin(function () {
		if (!applied3) {
			$("#chips2cDate").datepicker("option", "minDate", $("#crna2bDate").val());
			applied3 = true;
		}
	});
	//4
	var applied4 = false;
	$("#dataPosted2dDate").focusin(function () {
		if (!applied4) {
			$("#dataPosted2dDate").datepicker("option", "minDate", $("#chips2cDate").val());
			applied4 = true;
		}
	});
	//5
	var applied5 = false;
	$("#QC3aDate").focusin(function () {
		if (!applied5) {
			$("#QC3aDate").datepicker("option", "minDate", $("#dataPosted2dDate").val());
			applied5 = true;
		}
	});
	//6
	var applied6 = false;
	$("#statistics3bDate").focusin(function () {
		if (!applied6) {
			$("#statistics3bDate").datepicker("option", "minDate", $("#QC3aDate").val());
			applied6 = true;
		}
	});
	//7
	var applied7 = false;
	$("#bioInformatics4Date").focusin(function () {
		if (!applied7) {
			$("#bioInformatics4Date").datepicker("option", "minDate", $("#statistics3bDate").val());
			applied7 = true;
		}
	});
}
