/**
 * @author DennisB
 * @note 
 */

// create scope of Class
(function(window){
	//Static variables
	// colors
	ConcentrationGame.BLACK_COLOR = Graphics.getRGB(0,0,0,1);
	ConcentrationGame.WHITE_COLOR = Graphics.getRGB(255,255,255,1);
	ConcentrationGame.RED_COLOR = Graphics.getRGB(255,0,0,1);
	ConcentrationGame.GREEN_COLOR = Graphics.getRGB(0,255,0,1);
	ConcentrationGame.BLUE_COLOR = Graphics.getRGB(0,0,255,1);
	ConcentrationGame.YELLOW_COLOR = Graphics.getRGB(255,255,0,1);
	ConcentrationGame.CYAN_COLOR = Graphics.getRGB(0,255,255,1);
	ConcentrationGame.PURPLE_COLOR = Graphics.getRGB(255,0,255,1);
	
	//Public Variables
	ConcentrationGame.prototype.gamePiecesMatched = [];
	ConcentrationGame.prototype.hudText = "Concentration Game"; 
	ConcentrationGame.prototype.timeSec = 0;
	ConcentrationGame.prototype.resetTimer = false;
	ConcentrationGame.prototype.isTimerOn = false;
	ConcentrationGame.prototype.selectedColorCards = [];
	
	function ConcentrationGame(){ 
		
		
		this.gamePieces = [ConcentrationGame.RED_COLOR, ConcentrationGame.RED_COLOR, ConcentrationGame.GREEN_COLOR, ConcentrationGame.GREEN_COLOR, 
			ConcentrationGame.BLUE_COLOR, ConcentrationGame.BLUE_COLOR, ConcentrationGame.YELLOW_COLOR, ConcentrationGame.YELLOW_COLOR, 
			ConcentrationGame.CYAN_COLOR, ConcentrationGame.CYAN_COLOR, ConcentrationGame.PURPLE_COLOR, ConcentrationGame.PURPLE_COLOR];
		
		this.buildGame = function(){
			//if(debug) console.log("stageHeight " + canvas.height);
			var zeroBasedCount = 12;
			var randomIndex = Math.round(Math.random() * this.gamePieces.length);
			
			for(var i=0; i<zeroBasedCount; i++){
			 // console.log(randomIndex + " " + gamePieces.length);
			  var orgValue = this.gamePieces[i];
			  this.gamePieces[i] = this.gamePieces[randomIndex];
			  this.gamePieces[randomIndex] = orgValue;
			  console.log("orgValue " + orgValue)
			};
		};
		
		this.getColorType = function(color){
			var selectedColor = "";
			switch(color){
				case ConcentrationGame.RED_COLOR:
					selectedColor = "red";
				break;
				
				case ConcentrationGame.GREEN_COLOR:
					selectedColor = "green";
				break;
				
				case ConcentrationGame.BLUE_COLOR:
					selectedColor = "blue";
				break;
				
				case ConcentrationGame.YELLOW_COLOR:
					selectedColor = "yellow";
				break;
				
				case ConcentrationGame.CYAN_COLOR:
					selectedColor = "cyan";
				break;
				
				case ConcentrationGame.PURPLE_COLOR:
					selectedColor = "purple";
				break;
			}
			console.log("selectedColor " + selectedColor);
			return selectedColor;
		}
			
	}
	
	
	// private functions 
	function logger(message){
		if(console){
			console.log(message);
		}else{
			alert(message);
		}
	}
	
	window.ConcentrationGame = ConcentrationGame;
	
}(window));