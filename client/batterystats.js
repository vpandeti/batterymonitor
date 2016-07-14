var caret = "<span class=\"caret\" style=\"margin-left:5px;\"></span>";
var  batteryLevelDischarge, batteryLevelDuration;
var range, rangeValues;
var url = "http://10.11.37.52:3000/";
$(document).ready(function(){
    $("#filter-battery-level-div").hide();
	$("#filter-serial-number-div").hide();
	$("#filter-decommission-div").hide();
	enableSaveButton(false);
	managePills(true);
});

function managePills(isStats) {
	if(isStats) {
		$("#battery-stats-pills").attr('class', 'active');
		$("#application-stats-pills").removeClass('active');
		displayBatteryStats();
	} else {
		$("#battery-stats-pills").removeClass('active');
		$("#application-stats-pills").attr('class', 'active');
		displayApplicationStats();
		startVisualization();
	}	
}

function displayBatteryStats() {
	$("#battery-stats-table").show();
	$("#chart").hide();
	$("#charts-type").hide();
}

function displayApplicationStats() {
	$("#battery-stats-table").hide();
	$("#chart").show();
	$("#charts-type").show();
	enableSaveButton(false);
}

$(function(){

    $("#filters-dropdown-ul li a").click(function(){
		$("#filter-dropdown-button").html($(this).text() + caret);
		enableSaveButton(false);
		if($(this).text() == "Battery Level") {
			$("#filter-battery-level-div").show();
			$("#filter-serial-number-div").hide();
			$("#filter-decommission-div").hide();
		} else if($(this).text() == "Serial Number") {
			$("#filter-serial-number-div").show();
			$("#filter-battery-level-div").hide();
			$("#filter-decommission-div").hide();
		} else {
			$("#filter-decommission-div").show();
			$("#filter-battery-level-div").hide();
			$("#filter-serial-number-div").hide();
		}
   });

});

$(function(){

    $("#filter-battery-level-dropdown-ul-discharge li a").click(function(){
		$("#filter-battery-level-dropdown-button-discharge").html($(this).text() + caret);
		batteryLevelDischarge = $(this).text();
   });

});

$(function(){

    $("#filter-battery-level-dropdown-ul-duration li a").click(function(){
		$("#filter-battery-level-dropdown-button-duration").html($(this).text() + caret);
		batteryLevelDuration = $(this).text();
   });

});

$(function(){
	$("#filter-battery-level-button-submit").click(function(){
		var u = url + "timestamp?drop=" + batteryLevelDischarge + "&duration=" + batteryLevelDuration;
		serverAPICall(u, onSuccess, onFail);
	});

});

$(function(){
	$("#filter-serial-number-button-submit").click(function(){
		var u = url + "serialNumber?searchText=" + $("#filter-serial-number-input").val();
		serverAPICall(u, onSuccess, onFail);
	});

});

$(function(){

    $("#filter-decommission-dropdown-ul-range li a").click(function(){
		$("#filter-decommission-dropdown-button-range").html($(this).text() + caret);
		range = $(this).text();
		if(range == "Greater than")
			range = "G";
		else if(range == "Less than")
			range = "L";
		else
			range = "E";
   });

});

$(function(){

    $("#filter-decommission-dropdown-ul-range-values li a").click(function(){
		$("#filter-decommission-dropdown-button-range-values").html($(this).text() + caret);
		rangeValues = $(this).text();
   });

});

$(function(){
	$("#filter-decommission-button-submit").click(function(){
		var u = url + "batteryListWithDecommission?rangeType=" + range + "&rangeValues=" + rangeValues;
		serverAPICall(u, onSuccess, onFail);
	});

});

function enableSaveButton(enable) {
	if(enable)
		$("#filter-save-reports-button-submit").show();
	else
		$("#filter-save-reports-button-submit").hide();
}

function onSuccess(msg) {
	enableSaveButton(false);
}

function onFail(msg) {
	enableSaveButton(true);
}

function serverAPICall(url, successCallback, errorCallback) {
	$.ajax({
            type: "GET", //REST Type
            dataType: 'jsonp',
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                console.log(msg);
				successCallback.call(msg);
			},
			error: function (msg) {
				console.log(msg);
				errorCallback.call(msg);
			}
	});
}

