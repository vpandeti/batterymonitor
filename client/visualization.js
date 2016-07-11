var width = 1000, height = 450, padding = 20;
var fontFamily = 'verdana';
var pieData = [];
var pieDataColor = '#FFF';
var jsonData;

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arc(i(t));
	};
}

function drawBatterySipperPie() {
	var pieTextAlign = 'middle', pieWidth = 350, pieHeight = 350, pieRadius = 175;
	$("#chart").html("");
	$("#chart").attr("class","chart");
	var dataList = [], percentMax = [], sipperList = [];
	var Obj = jsonData.batterySippers;
	for (var i = 0; i < Obj.length; i++) {
		if (i == 1)
			break;
		var sippers = Obj[i].sippers;
		for(var j = 0; j < sippers.length; j++) {
			if(sippers[j].percentOfMax >= 100)
				continue;
			var name = sippers[j].sipper;
			if(name.includes(".")) {
				var nameList = name.split(".");
				name = nameList[nameList.length - 1];
			}
			sipperList.push(name);
			dataList.push(Math.round((sippers[j].percentOfMax * 100)/100));
		}
	}

	var pieColors = d3.scale.ordinal().domain(
			[ 0, 0.25 * pieData.length, 0.5 * pieData.length,
					0.75 * pieData.length, pieData.length ]).range(
			[ '#F58033', '#4FBA6F', '#EF4836', '#F4D03E' ]);

	var data = dataList;
	var arc = d3.svg.arc().outerRadius(pieRadius).innerRadius(
			pieRadius - 50);

	var pieChart = d3.layout.pie().value(function(d) {
		return d;
	});

	var svg = d3.select('#chart').append('svg').attr('id', 'piechart')
			.attr('width', pieWidth + 90).attr('height', pieHeight)
			.style('margin','15px');

	var container = svg.append('g').attr(
			'transform',
			'translate(' + (pieWidth - pieRadius) + ', '
					+ (pieHeight - pieRadius) + ')');

	container.selectAll('path').data(pieChart(data)).enter().append('g')
			.attr('class', 'slice');

	d3.selectAll('g.slice').append('path').attr('d', 0).style('fill',
			function(d, i) {
				return pieColors(i);
			}).style('stroke', '#FFF').transition().duration(300)
			.delay(300).attr('d', arc).ease('bounce');

	d3.selectAll('g.slice').append('text').text(function(d, i) {
		return d.data;
	}).attr('transform', function(d) {
		return 'translate(' + arc.centroid(d) + ')';
	}).style('fill', pieDataColor).style('text-anchor', pieTextAlign)
			.style('font-family', fontFamily);
	var legendRectSize = 18;
	var legendSpacing = 4;
	var legend = svg.selectAll('.legend').data(pieChart(data)).enter()
			.append('g').attr('class', 'legend')
			.attr('transform', function(d, i) {
				var height = legendRectSize + legendSpacing;
				var offset = height * pieColors.domain().length / 2;
				var horz = -2 * legendRectSize;
				var vert = i * height - offset;
				return 'translate(0,0)';
			});
	legend.append('rect').attr('width', legendRectSize).attr('height',
			legendRectSize).style('fill', function(d, i) {
		return pieColors(i);
	}).style('stroke', function(d, i) {
		return pieColors(i);
	}).attr('x', (2 * pieRadius)).attr('y', function(d, i) {
		return legendRectSize - legendSpacing + (i * 21);
	});
	legend.append('text').attr('x',
			(2 * pieRadius) + legendRectSize + legendSpacing).attr('y',
			function(d, i) {
				return legendRectSize + legendSpacing + (i * 21) + 5;
			}).text(function(d, i) {
		return sipperList[i];
	});
}

function showPie() {
	$("#chart").html("");
	drawBatterySipperPie();
}

function showStacks() {
	var dataList = [], percentMax = [], sipperList = [];
	var Obj = jsonData.batterySippers;
	// remove other charts
	$("#chart").html("");
	var html = "";
	for (var i = 0; i < Obj.length; i++) {
		if (i == 1)
			break;
		var sippers = Obj[i].sippers;
		for(var j = 0; j < sippers.length; j++) {
			if(sippers[j].percentOfMax >= 100)
				continue;
			var name = sippers[j].sipper;
			if(name.includes(".")) {
				var nameList = name.split(".");
				name = nameList[nameList.length - 1];
			}
			sipperList.push(name);
			dataList.push(Math.round((sippers[j].percentOfMax * 100)/100));
			html += "<label class=\"chartStacksLabel\">" + name + "</label><div class=\"progress\" style=\"background-color:transparent;\"><div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"70\"" + 
			"aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + parseInt(sippers[j].percentOfMax) + "%\">" + parseInt(sippers[j].percentOfMax) + "%</div></div>";
		}
	}
	$("#chart").html(html);
	$("#chart").attr("class","chartStacks");
}

function startVisualization() {
	$("#chart").attr("class","chart");
	$.getJSON("data.json", function(json) {
	    console.log(json);
	    jsonData = json;
	    drawBatterySipperPie();
	});
}