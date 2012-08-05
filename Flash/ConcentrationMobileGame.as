package
{
	/*
	Class ConcentrationGame
	Main Controller/Document Class - sets up model, views and controllers
	*/
	import com.gread.games.concentration.controller.GamePlayController;
	import com.gread.games.concentration.controller.GameStatusController;
	import com.gread.games.concentration.model.GameModel;
	import com.gread.games.concentration.model.vo.GameCardVO;
	import com.gread.games.concentration.view.GamePlayView;
	import com.gread.games.concentration.view.GameStartBlocker;
	import com.gread.games.concentration.view.GameStatusView;
	
	import flash.display.NativeWindow;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.TimerEvent;
	import flash.system.Capabilities;
	import flash.utils.Timer;
	
	public class ConcentrationMobileGame extends Sprite
	{
		/* Private and Public variables */
		private var _model:GameModel;
		private var _gamePlayView:GamePlayView;
		private var _gamePlayController:GamePlayController;
		private var _gameStatusView:GameStatusView;
		private var _gameStatusController:GameStatusController;
		private var _gameTimer:Timer;
		private var _gameStartBlocker:GameStartBlocker;
		
		public function ConcentrationMobileGame()
		{
			super();
			
			// support autoOrients
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			this.addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		/*
		function onAddedToStage
		Event Handler for added to stage event - remove listener
		@param evt Event
		*/
		private function onAddedToStage(evt:Event):void{
			this.removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			init();
		}
		
		/* initialize function */
		private function init():void{
			_gameTimer = new Timer(1000);
			_gameTimer.addEventListener(TimerEvent.TIMER, onGameTimer);
			
			_model = new GameModel();
			_model.buildMemorySeries();
			_model.currentGameStatus.add(onCurrentGameStatus);
			
			_gamePlayView = new GamePlayView();
			this.addChild(_gamePlayView);
			_gamePlayView.gridBuiltComplete.add(onGridBuiltComplete);
			_gamePlayController = new GamePlayController(_gamePlayView, _model);
			
			_gameStatusView = new GameStatusView();
			this.addChild(_gameStatusView);
			_gameStatusView.x = 0;
			_gameStatusView.y = 0;
			_gameStatusController = new GameStatusController(_gameStatusView, _model);
			
			createStartBlocker();
			
			stage.addEventListener(Event.RESIZE, onResizeStage);
		}
		
		protected function onResizeStage(event:Event):void
		{
			trace("onResizeStage");
			onGridBuiltComplete();
			_gameStartBlocker.refreshView(stage.stageHeight, stage.stageWidth);
		}
		
		private function createStartBlocker():void{
			
			_gameStartBlocker = new GameStartBlocker(stage.stageHeight, stage.stageWidth);
			//_gameStartBlocker = new GameStartBlocker(Capabilities.screenResolutionX, Capabilities.screenResolutionY);
			this.addChild(_gameStartBlocker);
			_gameStartBlocker.startButton.clicked.add(onStartButtonClicked);
		}
		
		private function onStartButtonClicked():void{
			if(_model.isGameOver){
				_model.resetGame.dispatch();
				_model.buildMemorySeries();
			}
			this.removeChild(_gameStartBlocker);
			_gameStartBlocker = null;
			_model.isGameOver = false;
			_gameTimer.start();
			_model.timeOfGame = 0;
		}
		
		/*
		function onGridBuiltComplete
		Signal Event Handler - once the grid has been built, center the game play view.
		@return void
		*/
		private function onGridBuiltComplete():void{
			_gamePlayView.x = (stage.stageWidth / 2) - (_gamePlayView.width / 2);
			_gamePlayView.y = (stage.stageHeight / 2) - (_gamePlayView.height / 2);
		}
		
		private function onGameTimer(evt:TimerEvent):void{
			_model.timeOfGame = _model.timeOfGame + 1;
		}
		
		private function onCurrentGameStatus(eventObj:Object):void{
			if(_model.isGameOver){
				_gameTimer.stop();
				createStartBlocker();
			}
		}
	}
}