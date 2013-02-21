
//***************************************************************
//* Project Name     : GSS
//* Application name :Genomics Experiments
//* Dependencies     :
//* Limitations      :
//* Created Date     :30 Dec 2012
//* Author           :Vijay Bhaskar C
//****************************************************************

var url = window.location.search;
var n = url.indexOf("itmid");

var IshavingItm = false;
var itmid = "";

var GSSID = "";
var StudyObj;
var RemainderIDS = "";

var STEP1 = "Step1";
var STEP2 = "Step2";
var STEP3 = "Step3";
var STEP4 = "Step4";
var STEP5 = "Step5";
var STEP6 = "Step6";
var STEP7 = "Step7";

var HIDE = "hide";
var SHOW = "show";

//keywords for the divs
var DIV_REQUEST_STUDY = "divmain";
var DIV_STUDY_INFORMATION = "div1";
var DIV_MILESTONES = "div5";

//div2(BU/GC Study details) is splitted into 3 parts
var DIV_BU = "divBU";
var DIV_GC = "divGC";
var DIV_BUGC_BUTTONS = "divBtns";

var DIV_STATISTICS = "div3";
var DIV_BIOINFORMATICS = "div4";

//var curUser = $().SPServices.SPGetCurrentUser();
var curUser = "NA\\yeddula.ar";
//var curUser = "CN\\bolla.su";
//var curUser = "EU\\terala.l";
//var curUser = "ap\\thaduri.us";
//var curUser = "AP\\chittavajhula.v";

//onload function
$(document).ready(function () {
    load();
    if (n > -1)
        IshavingItm = true;
    else
        IshavingItm = false;

    //alert(IshavingItm);

    isGc();

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
        submitBioinfo();
    });

    //allow only numbers
    $('#txtSamples').bind('keypress', function (e) {
        return (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) ? false : true;
    });

    getDatePicker();
    fillSelects();

    if (IshavingItm) {
        itmid = window.location.search.split("?itmid=")[1];
        contentLoad(itmid);

        $("#reqStudy").click(function () {
            updatePurpose();
        });

    } else {

        /*
        $("#div1 :input").attr('disabled', true);
        $("#div3 :input").attr('disabled', true);
        $("#div4 :input").attr('disabled', true);
        $("#div5 :input").attr('disabled', true);
		
        $('#div1').find('img:last').hide();
        $('#div2').find('img:last').hide();
        $('#div3').find('img:last').hide();
        $('#div4').find('img:last').hide();
        $('#div5').find('img:last').hide();
		
        $("[id$='Attach']").hide();
        */


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
    }
});

function getDatePicker() {
	$("[id$='Date']").datepicker({
		minDate : '0'
	});
}

var isgcUser = false;

function isGc() {
	$().SPServices({
		operation : "GetGroupCollectionFromUser",
		userLoginName : curUser,
		async : false,
		completefunc : function (xData, Status) {
			if ($(xData.responseXML).find("Group[Name='GC']").length == 1) {
				
				$("#div1 :input").attr('disabled', false);
				isgcUser = true;
			} else {
				isgcUser = false;
				/*
				divToggle('div1','hide');
				divToggle('div2','hide');
				divToggle('div3','hide');
				divToggle('div4','hide');
				divToggle('div5','hide');
				 */
				
				$('#div1').find('img:last').hide();
				$('#div2').find('img:last').hide();
				$('#div3').find('img:last').hide();
				$('#div4').find('img:last').hide();
				$('#div5').find('img:last').hide();
				
				$("[id$='Attach']").hide();
				
				$("#div1 :input").attr('disabled', true);
				$("#div2 :input").attr('disabled', true);
				$("#div3 :input").attr('disabled', true);
				$("#div4 :input").attr('disabled', true);
				$("#div5 :input").attr('disabled', true);
				
			}
		}
	});
}

function divToggle(divId, status) {
	switch (status) {
	case 'hide':
		$("#" + divId + " :input").attr('disabled', true);
		$("#" + divId).find('img:last').hide();
		$("#" + divId + " img[id$='Attach']").hide();
		break;
	case 'show':
		$("#" + divId + " :input").attr('disabled', false);
		$("#" + divId).find('img:last').show();
		$("#" + divId + " img[id$='Attach']").show();
		break;
	}
}

//fill existed item
function contentLoad(itmid) {
	
	//View fields for Study Form
	var viewFlds = "<ViewFields><FieldRef Name='Editor' /><FieldRef Name='Author' /><FieldRef Name='Created' /><FieldRef Name='Modified' /><FieldRef Name='ID' />" +
		"<FieldRef Name='EnableWF' /><FieldRef Name='enableStage' /><FieldRef Name='Reason_for_Delay_4' /><FieldRef Name='M3b_act_Statistics_Report_Date' /><FieldRef Name='M3a_act_Initial_QC_completion_da' />" +
		"<FieldRef Name='Reason_for_Delay_m3b' /><FieldRef Name='Reason_for_Delay_m3a' /><FieldRef Name='Reason_for_Delay_m2d' /><FieldRef Name='Reason_for_Delay_m2c' /><FieldRef Name='Reason_for_Delay_m2b' />" +
		"<FieldRef Name='M2d_act_Data_Posted_date' /><FieldRef Name='M2c_act_Chips_Run_date' /><FieldRef Name='M2b_cRNA_act_Dates_Label' /><FieldRef Name='M2a_act_RNA_Isolation_Date' /><FieldRef Name='cRNA_Protocol' />" +
		"<FieldRef Name='Comments_M2a' /><FieldRef Name='Reason_for_Delay_M2a' /><FieldRef Name='RNA_x0020_Procotol' /><FieldRef Name='Reason_for_Delay_m1' /><FieldRef Name='M1_Actual_Samples_Received_Date' />" +
		"<FieldRef Name='ReminderIds' /><FieldRef Name='M4_BioInformatics_Analysis_date' /><FieldRef Name='M3b_Statistics_Report_Date' /><FieldRef Name='M3a_Initial_QC_completion_date' /><FieldRef Name='M2d_Date_Data_Posted' />" +
		"<FieldRef Name='M2c_Date_Chips_Run' /><FieldRef Name='M2b_cRNA_Dates_Label' /><FieldRef Name='M2a_RNA_Isolation_Date' /><FieldRef Name='M1_Anticipated_Samples' /><FieldRef Name='TissueType' /><FieldRef Name='DescriptionPurpose' />" +
		"<FieldRef Name='Chip_x0020_Type' /><FieldRef Name='GSSID' /><FieldRef Name='Fundamental_questions' /><FieldRef Name='Purpose' /><FieldRef Name='Comments_4' /><FieldRef Name='Comments_m3b' />" +
		"<FieldRef Name='Comments_m2d' /><FieldRef Name='Comments' /><FieldRef Name='Delayed' /><FieldRef Name='Overall_Study_Status' /><FieldRef Name='BioInformatics_Analysis_date_4' /><FieldRef Name='Statistics_Report_Date_M3b' /><FieldRef Name='Initial_QC_completion_date_M3a' />" +
		"<FieldRef Name='Date_Data_Posted_M2d' /><FieldRef Name='Date_Chips_Run_M2c' /><FieldRef Name='cRNA_Dates_Label_M2b' /><FieldRef Name='NA_Isolation_Date_M2a' /><FieldRef Name='Estimated_timing' /><FieldRef Name='ProtocolNumber' /><FieldRef Name='Estimated_x0020_Number_x0020_of_' />" +
		"<FieldRef Name='Study_x0020_Name' /><FieldRef Name='Bio_x0020_Informatics_x0020_Owne' /><FieldRef Name='Statistics_x0020_Owner' /><FieldRef Name='GC_x0020_Analyst' /><FieldRef Name='Title' /></ViewFields>";
	
	//debugger
	$().SPServices({
		operation : "GetListItems",
		async : false,
		listName : "Study",
		CAMLQueryOptions : "<QueryOptions><IncludeAttachmentUrls>TRUE</IncludeAttachmentUrls></QueryOptions>",
		CAMLQuery : "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + itmid + "</Value></Eq></Where></Query>",
		CAMLViewFields : viewFlds,
		completefunc : function (xData, Status) {
			
			//alert(xData.responseText);
			$(xData.responseXML).SPFilterNode("z:row").each(function () {
				var step = $(this).attr("ows_enableStage");
				debugger
				switch (step) {
				case STEP1:
					if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {
						//$("#divmain").attr('disabled', false);
						divToggle('divmain', 'show');
					} else {
						$("#divmain").attr('disabled', true);
						$('#divmain').find('img:last').hide();
						//divToggle('divmain','hide');
					}
					if (isgcUser) {
						$("#divmain").attr('disabled', false);
						$('#divmain').find('img:last').show();
						//divToggle('divmain','show');
					}
					break;
				case STEP2:
					if (!isgcUser) {
						$("#divmain").attr('disabled', true);
						$('#divmain').find('img:last').hide();
						//divToggle('divmain','hide');
					}
					
					if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] != getuserId(curUser)) {
						
						//divToggle('divmain','hide');
						//divToggle('div1','hide');
						
						$("#divmain").attr('disabled', true);
						$('#divmain').find('img:last').hide();
						
						$('#div1').find('img:last').hide();
						$("#div1").attr('disabled', true);
						
						$('#div5').find('img:last').hide();
						$("#div5").attr('disabled', true);
						
					}
					break;
					
				case STEP3:
					
					if (!isgcUser) {
						$("#divmain").attr('disabled', true);
						$('#divmain').find('img:last').hide();
					}
					
					if ($(this).attr("ows_M1_Anticipated_Samples") != null) {
						if ($(this).attr("ows_Author").split(";#")[0] == getuserId(curUser)) {}
					}
					
					if ($(this).attr("ows_GC_x0020_Analyst").split(";#")[0] != getuserId(curUser)) {}
					
					break;
				}
				
				//request study
				if ($(this).attr("ows_Purpose") != null) {
					var purpose = $(this).attr("ows_Purpose").split(";")[0];
					$("#selPurpose").val(purpose);
					/*
					if (!isgcUser && IshavingItm) {
					$('#divmain').find('img:last').hide();
					$("#divmain").attr('disabled', true);
					}*/
				}
				
				if ($(this).attr("ows_Fundamental_questions") != null) {
					var FundamentalQuestion = $(this).attr("ows_Fundamental_questions");
					$("#txtQuestion").val(FundamentalQuestion);
				}
				//request study
				
				//studyInformation
				if ($(this).attr("ows_GSSID") != null) {
					var txtGssId = $(this).attr("ows_GSSID");
					$("#txtGssId").val(txtGssId);
				} else {
					var txtGssId = "GSS" + randomN();
					$("#txtGssId").val(txtGssId);
					$("#div2 :input").attr('disabled', true);
					$("#div3 :input").attr('disabled', true);
					$("#div4 :input").attr('disabled', true);
					$("#div5 :input").attr('disabled', true);
				}
				
				if ($(this).attr("ows_ReminderIds") != null)
					RemainderIDS = $(this).attr("ows_ReminderIds");
				
				if ($(this).attr("ows_GC_x0020_Analyst") != null) {
					var txtGCAnalyst = $(this).attr("ows_GC_x0020_Analyst").split(";#")[1];
					$("#ctl00_PlaceHolderMain_GCAnalyst_upLevelDiv").text(txtGCAnalyst);
					$("#ctl00_PlaceHolderMain_GCAnalyst_checkNames").click();
				}
				
				if ($(this).attr("ows_Statistics_x0020_Owner") != null) {
					var txtStatOwner = $(this).attr("ows_Statistics_x0020_Owner").split(";#")[1];
					$("#ctl00_PlaceHolderMain_statistics_upLevelDiv").text(txtStatOwner);
					$("#ctl00_PlaceHolderMain_statistics_checkNames").click();
					if (getuserId(curUser) == $(this).attr("ows_Statistics_x0020_Owner").split(";#")[0]) {
						$("#div3 :input").attr('disabled', false);
						$('#div3').find('img:last').show();
						$("#statAttach").show();
					} else {
						$("#div3 :input").attr('disabled', true);
						$('#div3').find('img:last').hide();
						$("#statAttach").hide();
					}
				}
				
				if ($(this).attr("ows_Bio_x0020_Informatics_x0020_Owne") != null) {
					var txtBioInforOwner = $(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(";#")[1];
					$("#ctl00_PlaceHolderMain_bolInfo_upLevelDiv").text(txtBioInforOwner);
					$("#ctl00_PlaceHolderMain_bolInfo_checkNames").click();
					if (getuserId(curUser) == $(this).attr("ows_Bio_x0020_Informatics_x0020_Owne").split(";#")[0]) {
						$("#div4 :input").attr('disabled', false);
						$('#div4').find('img:last').show();
						$("#bioAttach").show();
					} else {
						$("#div4 :input").attr('disabled', true);
						$('#div4').find('img:last').hide();
						$("#bioAttach").hide();
					}
				}
				
				if ($(this).attr("ows_Study_x0020_Name") != null) {
					var txtStudyName = $(this).attr("ows_Study_x0020_Name");
					$("#txtStudyName").val(txtStudyName);
				}
				
				if ($(this).attr("ows_DescriptionPurpose") != null) {
					var txtPurpose = $(this).attr("ows_DescriptionPurpose");
					$("#txtPurpose").val(txtPurpose);
				}
				
				if ($(this).attr("ows_Estimated_x0020_Number_x0020_of_") != null) {
					var txtSamples = $(this).attr("ows_Estimated_x0020_Number_x0020_of_");
					$("#txtSamples").val(txtSamples);
				}
				
				if ($(this).attr("ows_Chip_x0020_Type") != null) {
					var selChipType = $(this).attr("ows_Chip_x0020_Type").split(";")[0];
					$("#selChipType").val(selChipType);
				}
				
				if ($(this).attr("ows_ProtocolNumber") != null) {
					var txtProtocol = $(this).attr("ows_ProtocolNumber");
					$("#txtProtocol").val(txtProtocol);
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
				//studyInformation
				
				//Milestones
				if ($(this).attr("ows_M1_Anticipated_Samples") != null) {
					var PlannedSmplDate = $(this).attr("ows_M1_Anticipated_Samples");
					PlannedSmplDate = conDate(PlannedSmplDate);
					$("#PlannedSmplDate").val(PlannedSmplDate);
				} else {
					$("#div2 :input").attr('disabled', true);
					$("#div3 :input").attr('disabled', true);
					$("#div4 :input").attr('disabled', true);
					
					//$("#div2 img[id$='Attach']").hide();
					
					$('#div2').find('img:last').hide();
					$('#div3').find('img:last').hide();
					$('#div4').find('img:last').hide();
					
					$("[id$='Attach']").hide();
				}
				
				if ($(this).attr("ows_M2a_RNA_Isolation_Date") != null) {
					var rna2aDate = $(this).attr("ows_M2a_RNA_Isolation_Date");
					rna2aDate = conDate(rna2aDate);
					$("#rna2aDate").val(rna2aDate);
				}
				
				if ($(this).attr("ows_M2b_cRNA_Dates_Label") != null) {
					var crna2bDate = $(this).attr("ows_M2b_cRNA_Dates_Label");
					crna2bDate = conDate(crna2bDate);
					$("#crna2bDate").val(crna2bDate);
				}
				
				if ($(this).attr("ows_M2c_Date_Chips_Run") != null) {
					var chips2cDate = $(this).attr("ows_M2c_Date_Chips_Run");
					chips2cDate = conDate(chips2cDate);
					$("#chips2cDate").val(chips2cDate);
				}
				
				if ($(this).attr("ows_M2d_Date_Data_Posted") != null) {
					var dataPosted2dDate = $(this).attr("ows_M2d_Date_Data_Posted");
					dataPosted2dDate = conDate(dataPosted2dDate);
					$("#dataPosted2dDate").val(dataPosted2dDate);
				}
				
				if ($(this).attr("ows_M3a_Initial_QC_completion_date") != null) {
					var QC3aDate = $(this).attr("ows_M3a_Initial_QC_completion_date");
					QC3aDate = conDate(QC3aDate);
					$("#QC3aDate").val(QC3aDate);
				}
				
				if ($(this).attr("ows_M3b_Statistics_Report_Date") != null) {
					var statistics3bDate = $(this).attr("ows_M3b_Statistics_Report_Date");
					statistics3bDate = conDate(statistics3bDate);
					$("#statistics3bDate").val(statistics3bDate);
				}
				
				if ($(this).attr("ows_M4_BioInformatics_Analysis_date") != null) {
					var bioInformatics4Date = $(this).attr("ows_M4_BioInformatics_Analysis_date");
					bioInformatics4Date = conDate(bioInformatics4Date);
					$("#bioInformatics4Date").val(bioInformatics4Date);
				}
				
				if ($(this).attr("ows_Overall_Study_Status") != null) {
					var selOverStatus = $(this).attr("ows_Overall_Study_Status");
					$("#selOverStatus").val(selOverStatus);
				}
				
				if ($(this).attr("ows_Delayed") != null) {
					var chkDelay = $(this).attr("ows_Delayed");
					if (chkDelay == 1)
						$('#chkDelay').attr('checked', true);
					else
						$('#chkDelay').attr('checked', false);
				}
				//Milestones
				
				//BU/GC Study Details
				if ($(this).attr("ows_M1_Actual_Samples_Received_Date") != null) {
					var txtM1Date = $(this).attr("ows_M1_Actual_Samples_Received_Date");
					txtM1Date = conDate(txtM1Date);
					$("#txtM1Date").val(txtM1Date);
					$("#PlannedSmplDate").attr('disabled', true);
				} else {
					//$("#PlannedSmplDate").attr('disabled', false);
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
				} else {
					//$("#rna2aDate").attr('disabled', false);
				}
				
				if ($(this).attr("ows_Reason_for_Delay_M2a") != null) {
					var selM2Reason = $(this).attr("ows_Reason_for_Delay_M2a").split(";")[0];
					$("#selM2Reason").val(selM2Reason);
				}
				
				if ($(this).attr("ows_Comments_M2a") != null) {
					var txtCommentsM2a = $(this).attr("ows_Comments_M2a");
					$("#txtCommentsM2a").val(txtCommentsM2a);
					
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
				} else {
					//$("#crna2bDate").attr('disabled', false);
				}
				
				if ($(this).attr("ows_M2c_act_Chips_Run_date") != null) {
					var M2cDate = $(this).attr("ows_M2c_act_Chips_Run_date");
					M2cDate = conDate(M2cDate);
					$("#M2cDate").val(M2cDate);
					$("#chips2cDate").attr('disabled', true);
				} else {
					//$("#chips2cDate").attr('disabled', false);
				}
				
				if ($(this).attr("ows_M2d_act_Data_Posted_date") != null) {
					var M2dDate = $(this).attr("ows_M2d_act_Data_Posted_date");
					M2dDate = conDate(M2dDate);
					$("#M2dDate").val(M2dDate);
					$("#dataPosted2dDate").attr('disabled', true);
				} else {
					//$("#dataPosted2dDate").attr('disabled', false);
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
					$("#txtCommentsM2d").val(txtCommentsM2d);
				}
				//BU/GC Study Details
				
				
				//Statistics
				if ($(this).attr("ows_M3a_act_Initial_QC_completion_da") != null) {
					var M3aDate = $(this).attr("ows_M3a_act_Initial_QC_completion_da");
					M3aDate = conDate(M3aDate);
					$("#M3aDate").val(M3aDate);
					$("#QC3aDate").attr('disabled', true);
				} else {
					//$("#QC3aDate").attr('disabled', false);
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
					$("#txtComments3b").val(txtComments3b);
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
					$("#txtComments4").val(txtComments4);
				}
			});
		}
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
function getMileStoneArray() {
	
	var userGC = $('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val();
	var statisticOwner = $('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val();
	var bioInfoOwner = $('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val();
	var MileStoneArray;
	
	StudyObj.SPFilterNode("z:row").each(function () {
		
		var plannedSamples = ["", $(this).attr("ows_GSSID"), "Planned Samples", SPdate($('#PlannedSmplDate').val()), $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedRNAIsolation = ["", $(this).attr("ows_GSSID"), "Planned RNA Isolation", SPdate($('#rna2aDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedCRNA = ["", $(this).attr("ows_GSSID"), "Planned cRNA Label", SPdate($('#crna2bDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedChipsRun = ["", $(this).attr("ows_GSSID"), "Planned Chips Run", SPdate($('#chips2cDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedDatePosted = ["", $(this).attr("ows_GSSID"), "Planned Data Posted", SPdate($('#dataPosted2dDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedQC = ["", $(this).attr("ows_GSSID"), "Planned Initial QC completion", SPdate($('#QC3aDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedStatsRpt = ["", $(this).attr("ows_GSSID"), "Planned Statistics Report", SPdate($('#statistics3bDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		var plannedAnalysis = ["", $(this).attr("ows_GSSID"), "Planned BioInformatics Analysis", SPdate($('#bioInformatics4Date').val()), getuserId(bioInfoOwner), getuserId(bioInfoOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), "N"];
		MileStoneArray = [plannedSamples, plannedRNAIsolation, plannedCRNA, plannedChipsRun, plannedDatePosted, plannedQC, plannedStatsRpt, plannedAnalysis];
	})
	
	return MileStoneArray;
}

//Updated Get MileStone array to store as remainders
function getChangedMileStone() {
	
	var userGC = $('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val();
	var statisticOwner = $('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val();
	var bioInfoOwner = $('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val();
	var MileStoneArray;
	
	var RIDS = RemainderIDS.split("##")
		
		StudyObj.SPFilterNode("z:row").each(function () {
			
			var plannedSamples = [RIDS[0], $(this).attr("ows_GSSID"), "Planned Samples", SPdate($('#PlannedSmplDate').val()), $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_Author").split(';#')[0], $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M1_Anticipated_Samples"), $('#PlannedSmplDate').val())];
			var plannedRNAIsolation = [RIDS[1], $(this).attr("ows_GSSID"), "Planned RNA Isolation", SPdate($('#rna2aDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2a_RNA_Isolation_Date"), $('#rna2aDate').val())];
			var plannedCRNA = [RIDS[2], $(this).attr("ows_GSSID"), "Planned cRNA Label", SPdate($('#crna2bDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2b_cRNA_Dates_Label"), $('#crna2bDate').val())];
			var plannedChipsRun = [RIDS[3], $(this).attr("ows_GSSID"), "Planned Chips Run", SPdate($('#chips2cDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2c_Date_Chips_Run"), $('#chips2cDate').val())];
			var plannedDatePosted = [RIDS[4], $(this).attr("ows_GSSID"), "Planned Data Posted", SPdate($('#dataPosted2dDate').val()), getuserId(userGC), getuserId(userGC), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M2d_Date_Data_Posted"), $('#dataPosted2dDate').val())];
			var plannedQC = [RIDS[5], $(this).attr("ows_GSSID"), "Planned Initial QC completion", SPdate($('#QC3aDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M3a_Initial_QC_completion_date"), $('#QC3aDate').val())];
			var plannedStatsRpt = [RIDS[6], $(this).attr("ows_GSSID"), "Planned Statistics Report", SPdate($('#statistics3bDate').val()), getuserId(statisticOwner), getuserId(statisticOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M3b_Statistics_Report_Date"), $('#statistics3bDate').val())];
			var plannedAnalysis = [RIDS[7], $(this).attr("ows_GSSID"), "Planned BioInformatics Analysis", SPdate($('#bioInformatics4Date').val()), getuserId(bioInfoOwner), getuserId(bioInfoOwner), $(this).attr("ows_M1_Actual_Samples_Received_Date"), checkMileStoneDates($(this).attr("ows_M4_BioInformatics_Analysis_date"), $('#bioInformatics4Date').val())];
			MileStoneArray = [plannedSamples, plannedRNAIsolation, plannedCRNA, plannedChipsRun, plannedDatePosted, plannedQC, plannedStatsRpt, plannedAnalysis];
		})
		
		return MileStoneArray;
}

function checkMileStoneDates(oldDate2, newDate2) {
	
	var NewPlanDate = Date.parse(newDate2);
	var oldDt = oldDate2.split(" ")[0].split("-")
		var OldPlanDate = Date.parse(oldDt[1] + "/" + oldDt[2] + "/" + oldDt[0]);
	var currDate = new Date();
	if (OldPlanDate - NewPlanDate != 0) {
		if (OldPlanDate - Date.parse(currDate) > 3)
			return "U";
		else if (OldPlanDate - Date.parse(currDate) < 3)
			return "D";
		
	} else
		return "NO";
	
}

//check validations
function chkAllfilled(divID) {
	var status = false;
	$("#" + divID).find("input[type=text]").each(function () {
		//debugger
		if ($(this).val() == "") {
			status = true;
			$(this).focus();
			return false;
		}
	});
	
	$("#" + divID).find("select").each(function () {
		var n = $(this).prop("selectedIndex");
		//alert(n);
		if (n == 0) {
			status = true;
			$(this).focus();
			return false;
		}
	});
	
	$("#" + divID).find("textarea").each(function () {
		if ($(this).val() == "") {
			status = true;
			$(this).focus();
			return false;
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
	var userGC = $('#ctl00_PlaceHolderMain_GCAnalyst_downlevelTextBox').val();
	var statisticOwner = $('#ctl00_PlaceHolderMain_statistics_downlevelTextBox').val();
	var bioInfoOwner = $('#ctl00_PlaceHolderMain_bolInfo_downlevelTextBox').val(); ;
	var studyName = $('#txtStudyName').val();
	var descriptionPurpose = $('#txtPurpose').val();
	var numOfsamples = $('#txtSamples').val();
	var strChipTypeVal = $("select[id='selChipType'] option:selected").val();
	var protocolNumber = $('#txtProtocol').val();
	var timingsOfsample = $('#timingsSampleDate').val();
	var strTissueTypeVal = $("select[id='selTissue'] option:selected").val();
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>" +
		"<Field Name='GSSID'>" + gssCode + "</Field>" +
		"<Field Name='GC_x0020_Analyst'>" + getuserId(userGC) + "</Field>" +
		"<Field Name='Statistics_x0020_Owner'>" + getuserId(statisticOwner) + "</Field>" +
		"<Field Name='Bio_x0020_Informatics_x0020_Owne'>" + getuserId(bioInfoOwner) + "</Field>" +
		"<Field Name='Study_x0020_Name'>" + studyName + "</Field>" +
		"<Field Name='DescriptionPurpose'>" + descriptionPurpose + "</Field>" +
		"<Field Name='Estimated_x0020_Number_x0020_of_'>" + numOfsamples + "</Field>" +
		"<Field Name='Chip_x0020_Type'>" + strChipTypeVal + "</Field>" +
		"<Field Name='ProtocolNumber'>" + protocolNumber + "</Field>" +
		"<Field Name='Estimated_timing'>" + SPdate(timingsOfsample) + "</Field>" +
		"<Field Name='TissueType'>" + strTissueTypeVal + "</Field>" +
		"<Field Name='enableStage'>" + STEP2 + "</Field>" +
		"<Field Name='EnableWF'>2</Field>" +
		"<Field Name='ID'>" + itmid + "</Field>" +
		"</Method>" +
		"</Batch>";
	if (chkAllfilled('div1')) {
		update(strBatch);
	}
}

//create milestones
function submitMilestoneInfo() {
	if (chkAllfilled('div5')) {
		debugger
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
		
		if (RemainderIDS == "") {
			//inform to Rajesh
			SaveRemainders(getMileStoneArray());
			RemainderIDS = reminderIds;
		} else {
			SaveRemainders(getChangedMileStone());
		}
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
			//inform to Rajesh
			"<Field Name='ReminderIds'>" + reminderIds + "</Field>" +
			"<Field Name='enableStage'>" + STEP3 + "</Field>" +
			"<Field Name='EnableWF'>3</Field>" +
			"<Field Name='ID'>" + itmid + "</Field>" +
			"</Method>" +
			"</Batch>";
		
		update(strBatch);
	}
}

//to submit BU & GC Study details
function submitstudyDetails() {
	
	var txtM1Date = SPdate($('#txtM1Date').val());
	var selRNA = $("select[id='selRNA'] option:selected").val();
	var selM1Reason = $("select[id='selM1Reason'] option:selected").val();
	var txtM2aDate = SPdate($('#txtM2aDate').val());
	var selM2Reason = $("select[id='selM2Reason'] option:selected").val();
	var txtCommentsM2a = $('#txtCommentsM2a').val();
	var selcRNAprotocol = $("select[id='selcRNAprotocol'] option:selected").val();
	var M2bDate = SPdate($('#M2bDate').val());
	var M2cDate = SPdate($('#M2cDate').val());
	var M2dDate = SPdate($('#M2dDate').val());
	
	var selM2bReason = $("select[id='selM2bReason'] option:selected").val();
	var selM2cReason = $("select[id='selM2cReason'] option:selected").val();
	var selM2dReason = $("select[id='selM2dReason'] option:selected").val();
	var txtCommentsM2d = $('#txtCommentsM2d').val();
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>" +
		"<Field Name='M1_Actual_Samples_Received_Date'>" + txtM1Date + "</Field>" +
		"<Field Name='Reason_for_Delay_m1'>" + selM1Reason + "</Field>" +
		"<Field Name='RNA_x0020_Procotol'>" + selRNA + "</Field>" +
		"<Field Name='M2a_act_RNA_Isolation_Date'>" + txtM2aDate + "</Field>" +
		"<Field Name='Reason_for_Delay_M2a'>" + selM2Reason + "</Field>" +
		"<Field Name='Comments_M2a'>" + txtCommentsM2a + "</Field>" +
		"<Field Name='cRNA_Protocol'>" + selcRNAprotocol + "</Field>" +
		"<Field Name='M2b_cRNA_act_Dates_Label'>" + M2bDate + "</Field>" +
		
		"<Field Name='Reason_for_Delay_m2b'>" + selM2bReason + "</Field>" +
		"<Field Name='M2c_act_Chips_Run_date'>" + M2cDate + "</Field>" +
		"<Field Name='Reason_for_Delay_m2c'>" + selM2cReason + "</Field>" +
		"<Field Name='M2d_act_Data_Posted_date'>" + M2dDate + "</Field>" +
		"<Field Name='Reason_for_Delay_m2d'>" + selM2dReason + "</Field>" +
		"<Field Name='Comments_m2d'>" + txtCommentsM2d + "</Field>" +
		"<Field Name='enableStage'>" + STEP4 + "</Field>" +
		"<Field Name='EnableWF'>4</Field>" +
		"<Field Name='ID'>" + itmid + "</Field>" +
		"</Method>" +
		"</Batch>";
	//debugger
	if (chkAllfilled('div2')) {
		update(strBatch);
	}
}

function isValid() {
	DateComparison();
}

function submitStatistics() {
	var M3aDate = SPdate($('#M3aDate').val());
	var M3bDate = SPdate($('#M3bDate').val());
	var sel3aReason = $("select[id='sel3aReason'] option:selected").val();
	var sel3bReason = $("select[id='sel3bReason'] option:selected").val();
	var txtComments3b = $('#txtComments3b').val();
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>" +
		"<Field Name='M3a_act_Initial_QC_completion_da'>" + M3aDate + "</Field>" +
		"<Field Name='Reason_for_Delay_m3a'>" + sel3aReason + "</Field>" +
		"<Field Name='M3b_act_Statistics_Report_Date'>" + M3bDate + "</Field>" +
		"<Field Name='Reason_for_Delay_m3b'>" + sel3bReason + "</Field>" +
		"<Field Name='Comments_m3b'>" + txtComments3b + "</Field>" +
		"<Field Name='ID'>" + itmid + "</Field>" +
		"<Field Name='enableStage'>" + STEP6 + "</Field>" +
		"<Field Name='EnableWF'>6</Field>" +
		"</Method>" +
		"</Batch>";
	if (chkAllfilled('div3')) {
		update(strBatch);
	}
}

function submitBioinfo() {
	var M4Date = SPdate($('#M4Date').val());
	var sel4Reason = $("select[id='sel4Reason'] option:selected").val();
	var txtComments4 = $('#txtComments4').val();
	
	var strBatch = "<Batch OnError='Continue' PreCalc='TRUE'>" +
		"<Method ID='1' Cmd='Update'>" +
		"<Field Name='BioInformatics_Analysis_date_4'>" + M4Date + "</Field>" +
		"<Field Name='Reason_for_Delay_4'>" + sel4Reason + "</Field>" +
		"<Field Name='Comments_4'>" + txtComments4 + "</Field>" +
		"<Field Name='enableStage'>" + STEP7 + "</Field>" +
		"<Field Name='EnableWF'>7</Field>" +
		"<Field Name='ID'>" + itmid + "</Field>" +
		"</Method>" +
		"</Batch>";
	if (chkAllfilled('div4')) {
		update(strBatch);
	}
}

function update(strBatch) {
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
				jAlert('Item Submitted', 'Alert Dialog');
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

//fill dropdowns
function fillSelects() {
	addOption(document.getElementById('selPurpose'), 'Purpose');
	addOption(document.getElementById('selChipType'), 'Chip Type');
	addOption(document.getElementById('selTissue'), 'Tissue Type');
	addOption(document.getElementById('selRNA'), 'RNA Procotol');
	addOption(document.getElementById('selcRNAprotocol'), 'cRNA Protocol');
	addOption(document.getElementById('selcRNAprotocol'), 'cRNA Protocol');
	addOption(document.getElementById('selM1Reason'), 'Milestone1 Delay Reason');
	addOption(document.getElementById('selM2Reason'), 'Milestone2a Delay Reason');
	addOption(document.getElementById('selM2bReason'), 'Milestone2b Delay Reason');
	addOption(document.getElementById('selM2cReason'), 'Milestone2c Delay Reason');
	addOption(document.getElementById('selM2dReason'), 'Milestone2d Delay Reason');
	addOption(document.getElementById('sel3aReason'), 'Milestone3a-3b Delay Reason');
	addOption(document.getElementById('sel3bReason'), 'Milestone3a-3b Delay Reason');
	addOption(document.getElementById('sel4Reason'), 'Milestone4 Delay Reason');
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
		CAMLQuery : "<Query><OrderBy><FieldRef Name='Category' /><FieldRef Name='ID' /></OrderBy><Where><Contains><FieldRef Name='Category' /><Value Type='Choice'>" + strCat + "</Value></Contains></Where></Query>",
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
	var errMsgQue = "Please enter Question";
	var errMsgPur = "Please select valid Purpose";
	if (DropdownValidation('selPurpose', '-Select Purpose-', errMsgPur) && TextValidation('txtQuestion', errMsgQue)) {
		var strPurpose = $("select[id='selPurpose'] option:selected").text();
		var strPurposeval = $("select[id='selPurpose'] option:selected").val();
		var strQuestion = $("textarea#txtQuestion").val();
		
		if (strPurpose != '-Select Purpose-') {
			//alert(strPurpose + "," + strQuestion);
			$().SPServices({
				operation : "UpdateListItems",
				async : false,
				batchCmd : "New",
				listName : "Study",
				updates : "<Batch OnError='Continue' PreCalc='TRUE'>" +
				"<Method ID='1' Cmd='New'>" +
				"<Field Name='Fundamental_questions'>" + strQuestion + "</Field>" +
				"<Field Name='Purpose' Type='LookUp' LookUpID='True'>" + strPurposeval + "</Field>" +
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
		} else
			alert('Please select valid item');
	}
}

//generate random number
function randomN() {
	var randomNum = Math.floor((Math.random() * 1000) + 1);
	return randomNum;
}

//to load first div
function load() {
	document.getElementById("divmain").style.display = 'block';
	document.getElementById("div1").style.display = 'none';
	document.getElementById("div2").style.display = 'none';
	document.getElementById("div3").style.display = 'none';
	document.getElementById("div4").style.display = 'none';
	document.getElementById("div5").style.display = 'none';
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
	}
}
