var countryData = {
	"brazil" : {
		"teamName" : "Brazil",
		"teamCode" : "bra"
	},
	"mexico" : {
		"teamName" : "Mexico",
		"teamCode" : "mex"
	},
	"croatia" : {
		"teamName" : "Croatia",
		"teamCode" : "cro"
	},
	"holland" : {
		"teamName" : "Holland",
		"teamCode" : "ned"
	},
	"chile" : {
		"teamName" : "Chile",
		"teamCode" : "chi"
	},
	"colombia" : {
		"teamName" : "Colombia",
		"teamCode" : "col"
	},
	"ivorycoast" : {
		"teamName" : "Ivory Coast",
		"teamCode" : "civ"
	},
	"japan" : {
		"teamName" : "Japan",
		"teamCode" : "jpn"
	},
	"greece" : {
		"teamName" : "Greece",
		"teamCode" : "gre"
	},
	"costarica" : {
		"teamName" : "Costa Rica",
		"teamCode" : "crc"
	},
	"italy" : {
		"teamName" : "Italy",
		"teamCode" : "ita"
	},
	"uruguay" : {
		"teamName" : "Uruguay",
		"teamCode" : "bra"
	},
	"france" : {
		"teamName" : "France",
		"teamCode" : "fra"
	},
	"ecuador" : {
		"teamName" : "Ecuador",
		"teamCode" : "ecu"
	},
	"switzerland" : {
		"teamName" : "Switzerland",
		"teamCode" : "sui"
	},
	"honduras" : {
		"teamName" : "Honduras",
		"teamCode" : "hon"
	},
	"argentina" : {
		"teamName" : "Argentina",
		"teamCode" : "arg"
	},
	"nigeria" : {
		"teamName" : "Nigeria",
		"teamCode" : "nga"
	},
	"iran" : {
		"teamName" : "Iran",
		"teamCode" : "irn"
	},
	"germany" : {
		"teamName" : "Germany",
		"teamCode" : "ger"
	},
	"usa" : {
		"teamName" : "USA",
		"teamCode" : "usa"
	},
	"ghana" : {
		"teamName" : "Ghana",
		"teamCode" : "gha"
	},
	"portugal" : {
		"teamName" : "Portugal",
		"teamCode" : "por"
	},
	"belgium" : {
		"teamName" : "Belgium",
		"teamCode" : "por"
	},
	"southkorea" : {
		"teamName" : "South Korea",
		"teamCode" : "kor"
	},
	"algeria" : {
		"teamName" : "Algeria",
		"teamCode" : "alg"
	},
	"russia" : {
		"teamName" : "Russia",
		"teamCode" : "rus"
	}
}

var groups = [
	{
		"group": "A",
		"teams": ["brazil","mexico","croatia"]
	},
	{
		"group": "B",
		"teams": ["holland","chile"]
	},
	{
		"group": "C",
		"teams": ["colombia","ivorycoast","japan","greece",]
	},
	{
		"group": "D",
		"teams": ["costarica","italy", "uruguay"]
	},
	{
		"group": "E",
		"teams": ["france","ecuador","switzerland","honduras"]
	},
	{
		"group": "F",
		"teams": ["argentina","nigeria","iran"]
	},
	{
		"group": "G",
		"teams": ["germany","usa", "ghana", "portugal"]
	},
	{
		"group": "H",
		"teams": ["belgium","algeria","russia","southkorea" ]
	}
];
var favorite = "";
var scenario;
var selectedCountry;

$(function(){
	var hash = window.location.hash;
	if(hash){
		favorite = hash.replace("#","");
		calculateOpponents();
	}
	selectedCountry = $(this).find("option:selected")[0].value;
	var countryName = $(this).find("option:selected")[0].dataset.name;
	favorite = countryName;
	scenario = $('input.scenario:checked')[0].value;
	if(favorite){
		if(scenario === "allOpponents"){
			calculateOpponents();
		}else if(scenario === "currentStandings"){
			calculateRealOpponents();
		}
	}

	$("#selectBox").change(function(){
		selectedCountry = $(this).find("option:selected")[0].value;
		favorite = $(this).find("option:selected")[0].dataset.name;
		scenario = $('input.scenario:checked')[0].value;
		if(favorite){
			if(scenario === "allOpponents"){
				calculateOpponents();
			}else if(scenario === "currentStandings"){
				calculateRealOpponents();
			}
		}
	});

	$("input.scenario").change(function(){
		scenario = $('input.scenario:checked')[0].value;
		if(favorite){
			if(scenario === "allOpponents"){
				calculateOpponents();
			}else if(scenario === "currentStandings"){
				calculateRealOpponents();
			}
		}
	});
	
});


function calculateRealOpponents(){
	var roundOf16 = [
		[groups[0].teams[0], groups[1].teams[1]],
		[groups[0].teams[1], groups[1].teams[0]],
		[groups[2].teams[0], groups[3].teams[1]],
		[groups[2].teams[1], groups[3].teams[0]],
		[groups[4].teams[0], groups[5].teams[1]],
		[groups[4].teams[1], groups[5].teams[0]],
		[groups[6].teams[0], groups[7].teams[1]],
		[groups[6].teams[1], groups[7].teams[0]]
	];
	var quarterFinals = [
		[roundOf16[0],roundOf16[2]],
		[roundOf16[1],roundOf16[3]],
		[roundOf16[4],roundOf16[6]],
		[roundOf16[5],roundOf16[7]]
	];
	var semiFinals = [
		[quarterFinals[0],quarterFinals[2]],
		[quarterFinals[1],quarterFinals[3]]
	]
	
	var possibleOpponents = {
		roundOne : "",
		roundTwo : "",
		roundThree : "",
		roundFour: "",
	};
	$.each(roundOf16,function(i,j){
		if($.inArray(favorite,j) !== -1){
			var opponent = $.grep(j,function(a){
				return a !== favorite;
			});
			possibleOpponents.roundOne = opponent;
		}
	});
	$.each(quarterFinals,function(i,j){
		$.each(j, function(k,l){
			if($.inArray(favorite,l) !== -1){
				var opponents = $.grep(j,function(a){
					return a !== l;
				});
				possibleOpponents.roundTwo = opponents;
			}
		});
	});
	$.each(semiFinals,function(i,j){
		
		$.each(j, function(k,l){
			$.each(l,function(m,n){
				if($.inArray(favorite,n) !== -1){
					var opponents = $.grep(j,function(a){
						return a !== l;
					});
					possibleOpponents.roundThree = opponents;
					var finalOpponents;
					if(i===1){
						finalOpponents = 0;
					}else{
						finalOpponents = 1;
					}
					possibleOpponents.roundFour = semiFinals[finalOpponents];
				}
			});
			
		});
	});

	showResults(possibleOpponents);
}

function calculateOpponents(){
	var roundOf16 = [[groups[0].teams, groups[1].teams],[groups[2].teams, groups[3].teams],[groups[4].teams, groups[5].teams],[groups[6].teams, groups[7].teams]];
	var quarterFinals = [[roundOf16[0],roundOf16[1]],[roundOf16[2], roundOf16[3]]];
	var semiFinals = [quarterFinals[0],quarterFinals[1]]
	var possibleOpponents = {
		roundOne : "",
		roundTwo : "",
		roundThree : "",
		roundFour: "",
	};
	$.each(roundOf16,function(i,j){
		$.each(j, function(k,l){
			if($.inArray(favorite,l) !== -1){
				var opponents = $.grep(j,function(a){
					return a !== l;
				});
				possibleOpponents.roundOne = opponents;
			}
		});
	});
	$.each(quarterFinals,function(i,j){
		$.each(j, function(k,l){
			$.each(l, function(m,n){
				if($.inArray(favorite,n) !== -1){
					var opponents = $.grep(j,function(a){
						return a !== l;
					});
					var otherWinners;
					if(i===0){
						otherWinners = 1;
					}else{
						otherWinners = 0;
					}
					possibleOpponents.roundThree = quarterFinals[otherWinners];
					possibleOpponents.roundTwo = opponents;
				}
			});
		});
	});
	showResults(possibleOpponents);
}

function showResults(data){ 
	$('.container').html('<h2>Possible opponents for ' + selectedCountry + '</h2>');
	var rounds = ["Round of 16", "Quarter finals", "Semi finals", "Final"]
	var n = 0;
	for(var key in data){
		if(data[key]){
			var $content = $('<div class="round"></div>');
			var roundData = flattenArray(data[key]);
			var title = $('<h3>').html(rounds[n])
			$content.append(title);
			var list = $('<ul>');
			$content.append(list);
			$.each(roundData,function(i,j){
				var listItem = $('<li>').html("<img src='images/" + countryData[j].teamCode + ".png' /> " + countryData[j].teamName);
				list.append(listItem);
			});

			$('.container').append($content);
			n++;
		}
	}
	
}

function flattenArray(array){
	var flatArray=[];
	if(Array.isArray(array)){
		$.each(array,function(i,j){
			if(Array.isArray(j)){
				$.each(j,function(k,l){
					if(Array.isArray(l)){
						$.each(l, function(m,n){
							if(Array.isArray(n)){
								$.each(n, function(o,p){
									if(Array.isArray(p)){
									}else{
										flatArray.push(p);
									}
								});
							}else{
								flatArray.push(n);
							}
						});
					}else{
						flatArray.push(l);
					}
				});
			}else{
				flatArray.push(j);
			}
		});
	}
	return flatArray;

}