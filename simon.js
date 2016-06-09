$(document).ready(function(){
	
	$('#top-left').on("click",function(){
		alert("left");
	});
		$('#top-right').on("click",function(){
		alert("right");
	});
			$('#bottom-left').on("click",function(){
		alert("bottom-left");
	});
				$('#bottom-right').on("click",function(){
		alert("bottom-right");
	});
	
	
$('#start').on("click",game);

});

function game(){
	var round,rand,sequence,copy;
	gameInit();
	$('.roundNum').html(round);

	function gameInit(){
		round=0;
		rand=0;
		sequence=[];
		copy=[];
	}

	function setSequence(){
		rand = randomize;
		sequence.push(rand);
		for(var i=0;i<sequence.length;i++){
			setInterval(function(){
				lightUp()
			},600);
		}

	}

	function randomize(){
		return Math.floor(Math.random()*4)+1;
	}
}




