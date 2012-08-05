﻿package com.gread.games.concentration.view {	import flash.display.Sprite;	import flash.display.DisplayObjectContainer;	import flash.text.TextField;	import flash.text.TextFormat;	import flash.text.TextFieldAutoSize;		public class GameStatusView extends Sprite{				private var titleText:TextField;		private var messageText:TextField;				/* constructor function */		public function GameStatusView() {			init();		}				private function init():void{			titleText = createSimpleTextField(this, "Concentration Colors - click boxes to match colors", 0x00, 16, "Arial Narrow");			titleText.y = 1;			titleText.selectable = false;						messageText = createSimpleTextField(this, "Staring...", 0x00, 16, "Arial Narrow");			messageText.x = titleText.x + titleText.width + 20;			messageText.y = 1;			messageText.selectable = false;					}				public function createSimpleTextField(parentObj:DisplayObjectContainer = null, textVal:String = "text", color:uint = 0x000000,								   fontSize:Number = 12, fontName:String = "Arial", xVal:Number=0, yVal:Number=0):TextField{			var textFormat:TextFormat = new TextFormat(fontName, fontSize, color);						var text:TextField = new TextField();			text.defaultTextFormat = textFormat;			text.text = textVal;			text.autoSize = TextFieldAutoSize.LEFT;						//var textFormat:TextFormat = new TextFormat(fontName, fontSize, color);			//text.setTextFormat(textFormat);						if(parentObj){				parentObj.addChild(text);			}						return text;		}				public function setMessage(textValue:String):void{			messageText.text = textValue;		}	}	}