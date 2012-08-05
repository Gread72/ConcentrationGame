﻿package com.gread.games.concentration.controller {		import com.gread.games.concentration.model.GameModel;	import com.gread.games.concentration.view.GamePlayView;	import com.gread.games.concentration.view.MemoryCard;	import com.greensock.TweenLite;		public class GamePlayController {				/* Private and Public variables */		private var _model:GameModel;		private var _view:GamePlayView;		private var _firstMemoryCard:MemoryCard;		private var _secondMemoryCard:MemoryCard;				/* 			constructor function			@param view GamePlayView			@param model GameModel		*/		public function GamePlayController(view:GamePlayView, model:GameModel) {			_model = model;			_view = view;									init();		}				/* initialize function */		private function init():void{			_view.selectMemoryCard.add(onSelectMemoryCard);			buildView();			_model.resetGame.add(function():void{buildView();});		}				/*			function buildView()			Fire Method to Build view based on current model			@return void		*/		public function buildView():void{			_view.buildGrid(_model.numRows, _model.numColumns, _model.cardSeries);		}				/*			function onSelectMemoryCard			Signal Event Handler - as user selected cards set up first and second card, fire delay call- checkIfMatched			@param memCard MemoryCard			@return void		*/		private function onSelectMemoryCard(memCard:MemoryCard):void{			memCard.revealMemoryCard();						if(_firstMemoryCard == null){				_firstMemoryCard = memCard;			}else if(_secondMemoryCard == null){				_secondMemoryCard = memCard;								TweenLite.delayedCall(.5, checkIfMatched);							}					}				/*			function checkIfMatched			Compare memory cards selected - if matched set property, if not hide card... 				either way assign first and second card to null - reset instances for next selections			@param memCard MemoryCard			@return void		*/		private function checkIfMatched():void{			if( _model.compareCardsSelected(_firstMemoryCard.gameCard, _secondMemoryCard.gameCard) ){				_firstMemoryCard.matchedCard(); 				_secondMemoryCard.matchedCard();			}else{				_firstMemoryCard.hideMemoryCard();				_secondMemoryCard.hideMemoryCard();			}			_firstMemoryCard = null;			_secondMemoryCard = null;		}			}	}