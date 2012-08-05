package com.gread.games.concentration.view
{
	import com.gread.HelperUtil;
	import com.gread.flash.components.ButtonComponent;
	
	import flash.display.Sprite;
	
	public class GameStartBlocker extends Sprite
	{
		private var _background:Sprite;
		private var _width:Number;
		private var _height:Number;
		
		public var startButton:ButtonComponent;
		
		
		public function GameStartBlocker(stageHeight:Number, stageWidth:Number)
		{
			super();
			_width = stageWidth
			_height = stageHeight
			
			_background = HelperUtil.CreateRectagleGraphic(this, 0, 0, _width, _height, 0, 0, .2, 0xFFFFFF);
			
			startButton = HelperUtil.createButton(this, 0, 0, "Start Game");
			
			init();
		}
		
		private function init():void{
			
			_background.width = _width; 
			_background.height = _height; 
			
			startButton.x = _background.width/2 - startButton.width/2;
			startButton.y = _background.height/2 - startButton.height/2;
			
		}
		
		public function refreshView(stageHeight:Number, stageWidth:Number):void{
			_width = stageWidth;
			_height = stageHeight;
				
			_background.width = _width; 
			_background.height = _height; 
			
			startButton.x = _background.width/2 - startButton.width/2;
			startButton.y = _background.height/2 - startButton.height/2;
		}
	}
}