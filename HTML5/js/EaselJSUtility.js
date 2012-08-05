/**
 * @author DennisB
 */

// create scope of Class
(function(window){
	
	// colors
	EaselJSUtility.BLACK_COLOR = Graphics.getRGB(0,0,0,1);
	EaselJSUtility.WHITE_COLOR = Graphics.getRGB(255,255,255,1);
	EaselJSUtility.RED_COLOR = Graphics.getRGB(255,0,0,1);
	EaselJSUtility.GREEN_COLOR = Graphics.getRGB(0,255,0,1);
	EaselJSUtility.BLUE_COLOR = Graphics.getRGB(0,0,255,1);
	EaselJSUtility.YELLOW_COLOR = Graphics.getRGB(255,255,0,1);
	EaselJSUtility.CYAN_COLOR = Graphics.getRGB(0,255,255,1);
	EaselJSUtility.PURPLE_COLOR = Graphics.getRGB(255,0,255,1);
	
	// utility function for creating graphics and text	
	EaselJSUtility.createSquare = function(x, y, width, height, fillColor, strokeColor, radius){
		var square;
		var g = new Graphics();
		
		if(strokeColor){
			g.setStrokeStyle(1);
			g.beginStroke(strokeColor);
			//if(debug) console.log("stroke Color " + strokeColor); 
		}
		
		if(fillColor){
			g.beginFill(fillColor);
			//if(debug) console.log("fill Color " + fillColor); 
		}
		
		if(radius){
			g.drawRoundRect(x, y, width, height, radius);
		}else{
			g.drawRect( x, y, width, height);
		}
		
		g.endFill();
		square = new Shape(g);
		return square;
	}
	
	EaselJSUtility.createCircle = function(radius, x, y, fillColor, strokeColor){
		var circle;
		var g = new Graphics();
		
		if(strokeColor){
			g.setStrokeStyle(1);
			g.beginStroke(strokeColor);
			//if(debug) console.log("stroke Color " + strokeColor); 
		}
		
		if(fillColor){
			g.beginFill(fillColor);
			//if(debug) console.log("fill Color " + fillColor); 
		}
		
		g.drawCircle(radius, x, y);
		g.endFill();
		circle = new Shape(g);
		return circle;
	}
	
	EaselJSUtility.createText = function(text, fontSettings, hexColor, x, y, width, height){
		var txtField = new Text(text, fontSettings, hexColor);
		if(!x) x = 100;
		if(!y) y = 20;
		txtField.x = x; //100
		txtField.y = y; // 20
		txtField.width = width;
		txtField.height = height;
		txtField.font = fontSettings;
		txtField.color = hexColor;
		txtField.align = "left";
		return txtField;
	}
	
	EaselJSUtility.createImage = function(imageObj, sourcePath, xPos, yPos){
		var imageSrc = new Image();
		imageSrc.src = sourcePath;
		imageSrc.onload = function (e) {
			imageObj = new Bitmap(e.target);
			stage.addChild(imageObj);
			update = true; //stage.update();
			imageObj.x = xPos;
			imageObj.y = yPos;
		};
	}
	
	EaselJSUtility.createButton = function(text, x, y, buttonWidth, buttonHeight){
		var buttonContainer = new Container();
		//var buttonWidth = 100;
		//var buttonHeight = 20;
		if(!buttonWidth) buttonWidth = 100;
		if(!buttonHeight) buttonHeight = 20;
		var textWidth = String(text).length * 2;
		var textHeight = 14; 
		
		buttonContainer.addChild( EaselJSUtility.createSquare(x, y, buttonWidth, buttonHeight, EaselJSUtility.WHITE_COLOR, EaselJSUtility.BLACK_COLOR, 12) ); 
		
		buttonContainer.addChild( EaselJSUtility.createText(text, "12px Arial", "#000000", x + buttonWidth/2 - textWidth, y + textHeight) );
		
		return buttonContainer;
		
	}
	
	function EaselJSUtility(){}
	
	window.EaselJSUtility = EaselJSUtility;
	
}(window));
		
