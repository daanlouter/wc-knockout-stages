var countryData = {"brazil" : {"teamName" : "Brazil", "teamCode" : "bra"}, "mexico" : {"teamName" : "Mexico", "teamCode" : "mex"}, "croatia" : {"teamName" : "Croatia", "teamCode" : "cro"}, "holland" : {"teamName" : "Holland", "teamCode" : "ned"}, "chile" : {"teamName" : "Chile", "teamCode" : "chi"}, "colombia" : {"teamName" : "Colombia", "teamCode" : "col"}, "ivorycoast" : {"teamName" : "Ivory Coast", "teamCode" : "civ"}, "japan" : {"teamName" : "Japan", "teamCode" : "jpn"}, "greece" : {"teamName" : "Greece", "teamCode" : "gre"}, "costarica" : {"teamName" : "Costa Rica", "teamCode" : "crc"}, "italy" : {"teamName" : "Italy", "teamCode" : "ita"}, "uruguay" : {"teamName" : "Uruguay", "teamCode" : "uru"}, "france" : {"teamName" : "France", "teamCode" : "fra"}, "ecuador" : {"teamName" : "Ecuador", "teamCode" : "ecu"}, "switzerland" : {"teamName" : "Switzerland", "teamCode" : "sui"}, "honduras" : {"teamName" : "Honduras", "teamCode" : "hon"}, "argentina" : {"teamName" : "Argentina", "teamCode" : "arg"}, "nigeria" : {"teamName" : "Nigeria", "teamCode" : "nga"}, "iran" : {"teamName" : "Iran", "teamCode" : "irn"}, "germany" : {"teamName" : "Germany", "teamCode" : "ger"}, "usa" : {"teamName" : "USA", "teamCode" : "usa"}, "ghana" : {"teamName" : "Ghana", "teamCode" : "gha"}, "portugal" : {"teamName" : "Portugal", "teamCode" : "por"}, "belgium" : {"teamName" : "Belgium", "teamCode" : "bel"}, "southkorea" : {"teamName" : "South Korea", "teamCode" : "kor"}, "algeria" : {"teamName" : "Algeria", "teamCode" : "alg"}, "russia" : {"teamName" : "Russia", "teamCode" : "rus"} }
var groups = [
	{"group": "A", "teams": ["brazil","mexico"], "finished" : true }, 
	{"group": "B", "teams": ["holland","chile"], "finished" : true }, 
	{"group": "C", "teams": ["colombia","greece"], "finished" : true }, 
	{"group": "D", "teams": ["costarica","uruguay"], "finished" : true }, 
	{"group": "E", "teams": ["france","switzerland"], "finished" : true }, 
	{"group": "F", "teams": ["argentina","nigeria"], "finished" : true }, 
	{"group": "G", "teams": ["germany","usa"], "finished" : true}, 
	{"group": "H", "teams": ["belgium","algeria" ], "finished" : true } ]; 
var favorite = "";
var scenario;
var selectedCountry;

$(function(){
	var hash = window.location.hash;
	if(hash){
		favorite = hash.replace("#","");
		$('#selectBox').find("[data-name='" + favorite + "']").prop('selected', true);
	}
	selectedCountry = $(this).find("option:selected")[0].value;
	var countryName = $(this).find("option:selected")[0].dataset.name;
	favorite = countryName;
	
	if(favorite){
			calculateRealOpponents();
	}

	$("#selectBox").change(function(){
		selectedCountry = $(this).find("option:selected")[0].value;
		favorite = $(this).find("option:selected")[0].dataset.name;
		if(favorite){
				calculateRealOpponents();
		}
	});

	// $("input.scenario").change(function(){
	// 	scenario = $('input.scenario:checked')[0].value;
	// 	if(favorite){
	// 		if(scenario === "allOpponents"){
	// 			calculateOpponents();
	// 		}else if(scenario === "currentStandings"){
	// 			calculateRealOpponents();
	// 		}
	// 	}
	// });
});

function fillRoundof16(){
	var test16 = [[],[],[],[],[],[],[],[]];
	$.each(groups,function(i,j){
		if(j.group==="A" ){
			if(j.finished){
				test16[0].push(j.teams[0]);
				test16[1].push(j.teams[1]);
			}else{
				test16[0].push(j.teams);
				test16[1].push(j.teams);
			}
		}
		if(j.group==="B" ){
			if(j.finished){
				test16[0].push(j.teams[1]);
				test16[1].push(j.teams[0]);
			}else{
				test16[0].push(j.teams);
				test16[1].push(j.teams);
			}
		}
		if(j.group==="C" ){
			if(j.finished){
				test16[2].push(j.teams[0]);
				test16[3].push(j.teams[1]);
			}else{
				test16[2].push(j.teams);
				test16[3].push(j.teams);
			}
		}
		if(j.group==="D" ){
			if(j.finished){
				test16[2].push(j.teams[1]);
				test16[3].push(j.teams[0]);
			}else{
				test16[2].push(j.teams);
				test16[3].push(j.teams);
			}
		}
		if(j.group==="E" ){
			if(j.finished){
				test16[4].push(j.teams[0]);
				test16[5].push(j.teams[1]);
			}else{
				test16[4].push(j.teams);
				test16[5].push(j.teams);
			}
		}
		if(j.group==="F" ){
			if(j.finished){
				test16[4].push(j.teams[1]);
				test16[5].push(j.teams[0]);
			}else{
				test16[4].push(j.teams);
				test16[5].push(j.teams);
			}
		}
		if(j.group==="G" ){
			if(j.finished){
				test16[6].push(j.teams[0]);
				test16[7].push(j.teams[1]);
			}else{
				test16[6].push(j.teams);
				test16[7].push(j.teams);
			}
		}
		if(j.group==="H" ){
			if(j.finished){
				test16[6].push(j.teams[1]);
				test16[7].push(j.teams[0]);
			}else{
				test16[6].push(j.teams);
				test16[7].push(j.teams);
			}
		}
	});
	return test16;
}


function calculateRealOpponents(){
	var oldroundOf16 = [
		[groups[0].teams[0], groups[1].teams[1]],
		[groups[0].teams[1], groups[1].teams[0]],
		[groups[2].teams[0], groups[3].teams[1]],
		[groups[2].teams[1], groups[3].teams[0]],
		[groups[4].teams[0], groups[5].teams[1]],
		[groups[4].teams[1], groups[5].teams[0]],
		[groups[6].teams[0], groups[7].teams[1]],
		[groups[6].teams[1], groups[7].teams[0]]
	];
	var roundOf16 = [
		[groups[0].teams[0]],
		[groups[1].teams[0]],
		[groups[2].teams[0]],
		[groups[3].teams[0]],
		[groups[4].teams[0]],
		[groups[5].teams[0]],
		[groups[6].teams[0]],
		[groups[7].teams[0]]
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
	// var roundOf16 = [[groups[0].teams, groups[1].teams],[groups[2].teams, groups[3].teams],[groups[4].teams, groups[5].teams],[groups[6].teams, groups[7].teams]];
	var roundOf16 = fillRoundof16();
	var quarterFinals = [[roundOf16[0],roundOf16[2]],[roundOf16[1], roundOf16[3]],[roundOf16[4],roundOf16[6]], [roundOf16[5],roundOf16[7]]];
	var semiFinals = [[quarterFinals[0],quarterFinals[1]],[quarterFinals[2],quarterFinals[3]]];
	var possibleOpponents = {
		roundOne : [],
		roundTwo : [],
		roundThree : [],
		roundFour: "",
	};
	$.each(roundOf16,function(i,j){
		$.each(j, function(k,l){
			if($.inArray(favorite,l) !== -1 || favorite === l){
				var opponents = $.grep(j,function(a){
					return a !== l;
				});
				possibleOpponents.roundOne.push(opponents);
			}
		});
	});
	$.each(quarterFinals,function(i,j){
		
		$.each(j, function(k,l){

			$.each(l, function(m,n){
				if($.inArray(favorite,n) !== -1 || favorite === n){
					var opponents = $.grep(j,function(a){
						return a !== l;
					});
					var otherWinners;
					if(i===0){
						otherWinners = 1;
					}else{
						otherWinners = 0;
					}
					// possibleOpponents.roundThree = quarterFinals[otherWinners];
					possibleOpponents.roundTwo.push(opponents);
				}
			});
		});
	});
	$.each(semiFinals,function(i,j){
		$.each(j, function(k,l){
			$.each(l, function(m,n){
				$.each(n, function(o,p){
					if($.inArray(favorite,p) !== -1 || p === favorite){
						var opponents = $.grep(semiFinals,function(a){
							return a !== j;
						});
						var otherWinners;
						if(i===0){
							otherWinners = 1;
						}else{
							otherWinners = 0;
						}

						
						possibleOpponents.roundThree = semiFinals[otherWinners];
					}
				});
			});
		});
	});
	showResults(possibleOpponents);
}

function showResults(data){ 
	$('.container').html('<h2>Possible opponents for ' + selectedCountry + '</h2>');
	var rounds = ["Round of 16", "Quarter-finals", "Semi-finals", "Final"]
	var n = 0;
	for(var key in data){
		if(data[key].length > 0){
			var $content = $('<div class="round"></div>');
			var roundData = flattenArray(data[key]);
			var title = $('<h3>').html(rounds[n])
			$content.append(title);
			var list = $('<ul>');
			$content.append(list);
			$.each(roundData,function(i,j){
				var listItem = $('<li>').html("<img src='images/" + countryData[j].teamCode + ".png' /><span>" + countryData[j].teamName + "</span>");
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
										if($.inArray(p,flatArray) === -1){
											flatArray.push(p);
										}
									}
								});
							}else{
								if($.inArray(n,flatArray) === -1){
									flatArray.push(n);
								}
							}
						});
					}else{
						if($.inArray(l,flatArray) === -1){
							flatArray.push(l);
						}
					}
				});
			}else{
				if($.inArray(j,flatArray) === -1){
					flatArray.push(j);
				}
			}
		});
	}
	return flatArray;

}