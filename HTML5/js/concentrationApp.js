/*
 * This application uses easeljs for everything ... http://www.createjs.com/#!/EaselJS
 * note: This is a vetted javascript framework by Adobe and gskinner.com
 * 
 * @author Dennis Biron
 */

// Global Variables
	var canvas;
	var stage;
	var stageWidth;
	var stageHeight;
	var debug = true;
	
	var gamePanel;
	var hudPanel;
	
	var update = true;
	var background;
	
	var startButton;
	
	var canvasRef = document.getElementById('mainView');	// hook to canvas reference
	var game = new ConcentrationGame();
	
//initialize call	
	init(canvasRef);

	function init(canvas){
		// get instance of stage and add listener to Ticker - Provides a centralized tick or heartbeat broadcast at a set interval.
		// Note: The default is 20 FPS.
		stage = new Stage(canvas);
		stage.enableMouseOver();
		stageWidth =  canvas.width; //should be 700;
		stageHeight =  canvas.height; // should be 675;
		
		// build pattern
		game.buildGame();
		
		// create display
		
		createStartButton();
		
		updateHUDPanel();
	 	
	}
	
// handler for browser ticker - animation frame
	function tick(){
		 // handler of Ticker - this logic alone should update the display when needed	 
		 if(update){
			update = false;
			stage.update();
		 }
		
		if(!gamePanel) createPanel(10, 30); // create game panel
		
		//logic for count timer
		if(game.isTimerOn) {
			game.timeSec += 1;
		}else{
			Ticker.removeListener(window); // remove handler for animation / browser ticker
		}
		
		// possible use of resetting game timer
		if(game.resetTimer) {
			game.timeSec = 0;
			game.resetTimer = false;
		}
		
		updateHUDPanel(); // update hud display
		
		// update game panel
		 for(var i = 0; i < gamePanel.children.length; i++){
		 	//console.log("" + checkMatch(gamePanel.children[i].colorType, gamePiecesMatched))
			gamePanel.children[i].children[1].visible = checkMatch(gamePanel.children[i].colorType, game.gamePiecesMatched);
		}
	}
	
	// function for updating div game hud 
	function updateHUDPanel(){
		//console.log("createHUDPanel");
		document.getElementById("hudContainer").innerHTML = game.hudText + " - Time: " + Math.round(game.timeSec*.10);
	}
	
	// create start button
	function createStartButton(){
		startButton = EaselJSUtility.createButton("Start", 10, 5);
		startButton.onPress = onStartButton;
		stage.addChild(startButton);
		stage.update();
	}
	
	// handler for press event of start button
	function onStartButton(){
		stage.removeChild(startButton);
		Ticker.addListener(window); // add handler for animation / browser ticker
		
		game.isTimerOn = true
	} 
	
	// create game panel
	function createPanel(x, y){
		gamePanel = new Container();
		gamePanel.x = x;
		gamePanel.y = y;
		
		var xPos = 0;
		var yPos = 0;
		var offset = 5;
		var widthHeight = 100;
		
		// setup "cards"
		for(var i = 0; i < game.gamePieces.length; i++){
			console.log("i/gamePieces[i] " + i + "/" + game.gamePieces[i])
			if(game.gamePieces[i]){
				gamePanel.addChild(createCard(xPos, yPos, widthHeight, widthHeight, game.gamePieces[i]));
				xPos += widthHeight + offset;
				
				if((i + 1) % 4 == 0){ // set up in rows of four
					yPos += widthHeight + offset;
					xPos = 0; 
				}
			}
		}
		
		stage.addChild(gamePanel);
		update = true;
	}
	
	// create card panels - add onPress handler
	function createCard(x, y, width, height, fillColor){
		var container = new Container();
		container.colorType = fillColor;
		var colorLayer = EaselJSUtility.createSquare(x, y, width, height, fillColor, ConcentrationGame.BLACK_COLOR, 10);
		var blackLayer = EaselJSUtility.createSquare(x, y, width, height, ConcentrationGame.BLACK_COLOR, ConcentrationGame.BLACK_COLOR, 10);
		container.addChild(colorLayer);
		container.addChild(blackLayer);
		container.onPress = function(e){
			selectedCard(e.target);
		}
		return container;
	}
	
	// onPress handler for cards
	function selectedCard(card){
		//console.log("colorType " + e.target.colorType);
		//console.log("colorType " + card.colorType);
		if(game.selectedColorCards.length < 1){
			card.children[1].visible = false;
			game.selectedColorCards.push(card);
		}else{
			card.children[1].visible = false;
			game.selectedColorCards.push(card);
			//console.log("selectedCards " + selectedColorCards[0] + " " + selectedColorCards[1]);
			if(game.getColorType(game.selectedColorCards[0].colorType) === game.getColorType(game.selectedColorCards[1].colorType)){
				console.log("It's a match" );
				var matchedColor = game.selectedColorCards[0].colorType;
				game.gamePiecesMatched.push(matchedColor);
				game.selectedColorCards[0].children[1].visible = false;
				game.selectedColorCards[1].children[1].visible = false;
			}else{
				console.log("It's not a match" );
				//hide color on selected card
				Tween.get(card).wait(500).call(onComplete);
			}
			game.selectedColorCards = [];
		}
		
		// all pieces are matched
		if(game.gamePiecesMatched.length == 6){
			console.log("Game Over");
			game.hudText = game.hudText + " - Game Over ";
			game.isTimerOn = false;
		}
		
		update = true;
		
	}
	
	// handler for displaying card color
	function onComplete(evt){
		//console.log("onComplete called " + evt);
		evt._target.children[1].visible = true;
		update = true;
	}
	
	// function for checking whether selected color card is correct
	function checkMatch(colorType, piecesMatchColor){
		var result = true;
		for(var i = 0; i < piecesMatchColor.length; i++){
			if(colorType == piecesMatchColor[i]){
				result = false;
			}
		}
		
		return result; 
	}