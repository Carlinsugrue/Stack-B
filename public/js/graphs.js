queue()
    .defer(d3.json, "/nzcrime2017/victims")
    .defer(d3.json, "static/geojson/nz-first.json")
    .await(makeGraphs);

function makeGraphs(error, victimsJson, areasJson) {
	
	//Clean victimsJson data
	var nzcrimeVictims = victimsJson;
	var dateFormat = d3.time.format("%Y-%m");
	nzcrimeVictims.forEach(function(d) {
		d["Year Month"] = dateFormat.parse(d["Year Month"]);
		d["Year Month"].setDate(1);
		d["Victimisations"] = +d["Victimisations"];
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(nzcrimeVictims);

	//Define Dimensions
	var dateDim = ndx.dimension(function(d) { return d["Year Month"]; });
	var crimeTypeDim = ndx.dimension(function(d) { return d["Crime Type"]; });
	var weaponUsedDim = ndx.dimension(function(d) { return d["Weapon"]; });
	var dayOfWeekDim = ndx.dimension(function(d) { return d["Occurrence Day Of Week"]; });
	var areaDim = ndx.dimension(function(d) { return d["Territorial Authority"]; });
	var totalVictimsDim  = ndx.dimension(function(d) { return d["Victimisations"]; });


	//Calculate metrics
	var numVictimsByDate = dateDim.group(); 
	var numVictimsByCrimeType = crimeTypeDim.group();
	var numVictimsByWeapon = weaponUsedDim.group();
	var numVictimsByDayOfWeek = dayOfWeekDim.group();
	var totalVictimsByArea = areaDim.group().reduceSum(function(d) {
		return d["Victimisations"];
	});

	var all = ndx.groupAll();
	var totalDonations = ndx.groupAll().reduceSum(function(d) {return d["Victimisations"];});

	var max_area = totalVictimsByArea.top(1)[0].value;

	//Define values (to be used in charts)
	var minDate = dateDim.bottom(1)[0]["Year Month"];
	var maxDate = dateDim.top(1)[0]["Year Month"];

    //Charts
	var timeChart = dc.barChart("#time-chart");
	var crimeTypeChart = dc.rowChart("#crime-type-row-chart");
	var weaponUsedChart = dc.rowChart("#weapon-used-pie-chart");
	var dayOfWeekChart = dc.pieChart("#dayOfWeek-pie-chart");
	var nzChart = dc.geoChoroplethChart("#nz-chart");
	var numberVictimsND = dc.numberDisplay("#number-victims-nd");
	var totalVictimsND = dc.numberDisplay("#total-victims-nd");


	//chart size variables
	var mapWidth = $("#home").width();
	var mapHeight = $("#home").height();


	numberVictimsND
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(all);

	totalVictimsND
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(totalDonations)
		.formatNumber(d3.format(".3s"));

	timeChart
		.width(890)
		.height(350)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(dateDim)
		.group(numVictimsByDate)
		.transitionDuration(500)
		.x(d3.time.scale().domain([minDate, maxDate]))
		.elasticY(true)
		.xAxisLabel("Year")
		.yAxis().ticks(10);

	crimeTypeChart
        .width(900)
        .height(250)
        .dimension(crimeTypeDim)
        .group(numVictimsByCrimeType)
        .elasticX(true)
        .xAxis().ticks(10);

	weaponUsedChart
		.width(350)
		.height(350)
        .dimension(weaponUsedDim)
        .group(numVictimsByWeapon)

        .elasticX(true)
        .xAxis().ticks(4);

    dayOfWeekChart
		.width(350)
		.height(350)
		.slicesCap(8)
    	.innerRadius(50)
        .dimension(dayOfWeekDim)
        .group(numVictimsByDayOfWeek)
        .legend(dc.legend())

	nzChart.width(mapWidth)
		.height(mapHeight)
		.dimension(areaDim)
		.group(totalVictimsByArea)
		.colors(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"])
		.colorDomain([0, max_area])
		.overlayGeoJson(areasJson["features"], "area", function (d) {
			return d.properties.name;
		})
		.projection(d3.geo.albers()
    				.center([0, 10 ])
    				.scale(4000)
   				.rotate([-174.7,45]))
		.title(function (p) {
			return "Territorial Authority: " + p["key"]
					+ "\n"
					+ "Total victims: " + Math.round(p["value"]);
		})


    dc.renderAll();

};