var caret = "<span class=\"caret\" style=\"margin-left:5px;\"></span>";
var  batteryLevelDischarge, batteryLevelDuration;
var range, rangeValues;
var url = "http://batterymonitor.herokuapp.com/api/";
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
	// $("#battery-stats-filters").show();
	$("#battery-stats-table").show();
	$("#chart").hide();
	$("#charts-type").hide();
	// $("#batteryInput").hide();
}

function displayApplicationStats() {
	// $("#battery-stats-filters").hide();
	$("#battery-stats-table").hide();
	$("#chart").show();
	$("#charts-type").show();
	// $("#batteryInput").show();
	enableSaveButton(false);
}

$(function(){

    $("#filters-dropdown-ul li a").click(function(){
		$("#filter-dropdown-button").html($(this).text() + caret);
		// $("#filter-dropdown-button").val($(this).text());
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
		// $("#filter-battery-level-dropdown-button-from").val($(this).text());
		batteryLevelDischarge = $(this).text();
   });

});

$(function(){

    $("#filter-battery-level-dropdown-ul-duration li a").click(function(){
		$("#filter-battery-level-dropdown-button-duration").html($(this).text() + caret);
		// $("#filter-battery-level-dropdown-button-duration").val($(this).text());
		batteryLevelDuration = $(this).text();
   });

});

$(function(){
	$("#filter-battery-level-button-submit").click(function(){
		var url = url + "batteryListWithDischarge?batteryLevelDischarge=" + batteryLevelDischarge + "&batteryLevelDuration" + batteryLevelDuration;
		$.ajax({
            type: "GET", //REST Type
            dataType: 'jsonp',
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                console.log(msg);
				enableSaveButton(true);				
			},
			error: function (msg) {
				console.log(msg);
				enableSaveButton(false);
			}
		});
	});

});

$(function(){
	$("#filter-serial-number-button-submit").click(function(){
		var url = url + "batteryListWithSerialNumber?serialNumber=" + $("#filter-serial-number-input").val();
		$.ajax({
            type: "GET", //REST Type
            dataType: 'jsonp',
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                console.log(msg);
				enableSaveButton(true);
			},
			error: function (msg) {
				console.log(msg);
				enableSaveButton(false);
			}
		});
	});

});

$(function(){

    $("#filter-decommission-dropdown-ul-range li a").click(function(){
		$("#filter-decommission-dropdown-button-range").html($(this).text() + caret);
		// $("#filter-battery-level-dropdown-button-to").val($(this).text());
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
		// $("#filter-battery-level-dropdown-button-to").val($(this).text());
		rangeValues = $(this).text();
   });

});

$(function(){
	$("#filter-decommission-button-submit").click(function(){
		var url = url + "batteryListWithDecommission?rangeType=" + range + "&rangeValues=" + rangeValues;
		$.ajax({
            type: "GET", //REST Type
            dataType: 'jsonp',
            url: url,
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                console.log(msg);
				enableSaveButton(true);
			},
			error: function (msg) {
				console.log(msg);
				enableSaveButton(false);
			}
		});
	});

});

function enableSaveButton(enable) {
	if(enable)
		$("#filter-save-reports-button-submit").show();
	else
		$("#filter-save-reports-button-submit").hide();
}

