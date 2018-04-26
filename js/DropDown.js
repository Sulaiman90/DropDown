createjs.MovieClip.prototype.DropDown = function (options) {
	var _parent = this;

	var dummyShowAnswer = new createjs.MovieClip(null)
	_parent.addChild(dummyShowAnswer);

	var dummyReset = new createjs.MovieClip(null)
	_parent.addChild(dummyReset);

	var dummyClose = new createjs.MovieClip(null)
	_parent.addChild(dummyClose);

	var dummyHit = new createjs.MovieClip(null)
	_parent.addChild(dummyHit);

	extend = function () {
		for (var i = 1; i < arguments.length; i++)
			for (var key in arguments[i])
				if (arguments[i].hasOwnProperty(key))
					arguments[0][key] = arguments[i][key];
		return arguments[0];
	}

	this.defaults = {
		indexes: [],
		showAnsBtn: dummyShowAnswer,
		resetBtn: dummyReset,
		closeBtn: dummyClose,
		indexHoverColor: "#FF0099",
		indexHoverAlpha: 0.5,
		indexSelectionColor: "#66FF66",
		indexSelectionAlpha: 1,
		indexDirection: "down",
		defaultIndex: "Select",
		showScroll: false,
		thumbFillColor: "#FBDACA",
		scrollBarFillColor: "#A9A9A9",
		customHitBool: false,
		customHitShape: dummyHit,
		totalIndexesToShow: 3,
		paddingBottomTop: 0,
		reset: false,
		onIndexSelected: function (data) {

		},
		onIndexChanged: function (data) {

		},
		onReset: function (data) {

		},
		showCorrectIndex: function (data) {

		},
		onCorrectAnsSelected: function () {

		},
		onWrongAnsSelected: function () {

		},
		onDropDownClicked: function () {

		}
	};

	_parent.opts = extend({}, this.defaults, options);

	var itemArray = _parent.opts.indexes.slice(0);
	//var itemArray = _parent.opts.indexes;
	//console.log("indexes " + _parent.opts.indexes, itemArray, itemArray.length);
	itemArray.unshift("");
	//console.log("indexes " + _parent.opts.indexes, itemArray, itemArray.length);

	var ansIndexNo = _parent.opts.answer + 0;
	var indexHoverColor = _parent.opts.indexHoverColor;
	var indexHoverAlpha = _parent.opts.indexHoverAlpha;
	var isListComingTo = _parent.opts.indexDirection;

	var customHitBool = _parent.opts.customHitBool;

	//console.log("itemArray "+itemArray +" ansIndexNo "+ansIndexNo);

	var self = this;
	var select_mc = self["select_mc"];
	var arrow = self["arrow"];

	var numItems = itemArray.length - 1;
	var textAlignValue = "left";
	var item;
	var selectText = "";
	var itemSelectTrue = false;
	var rollOverflg = false;
	var xpos, ypos;

	var flag = true;
	var myClickMcVal;

	var arrowOver = false;
	var dropDownIndex = 1;

	var minIndexWidth = 0;
	var minDropDownWidth = 0;

	var currentIndexWidth = 0;
	var currentDropDownWidth = 0;

	var dropDownHeight = 25;
	var itemHeight = 18.2;

	var cornerRadius = 2;
	var minAlphaValue = 0.01;

	/// added for scrolling
	var showScroll = _parent.opts.showScroll;
	var totalIndexesToShow = _parent.opts.totalIndexesToShow;
	var scrollHeight = 0;
	var thumbHeight = 20;
	var thumbWidth = 20;
	var totalIndexHeight = 0;
	var indexStartY = 18.2;

	var thumbFillColor = _parent.opts.thumbFillColor;
	var scrollBarFillColor = _parent.opts.scrollBarFillColor;

	var currentIndexNo = 0;

	var rect = new createjs.Shape();
	var bg = new createjs.MovieClip(null);
	var items = new createjs.MovieClip(null);
	var scrollContainer = new createjs.MovieClip(null);
	var hitMc = new createjs.MovieClip(null);

	var defaultIndexStr = _parent.opts.defaultIndex;

	if (String(defaultIndexStr).length == 1) {
		minIndexWidth = 50;
	}
	else if (String(defaultIndexStr).length >= 2 && String(defaultIndexStr).length <= 3) {
		minIndexWidth = 69;
	}
	else {
		minIndexWidth = 92;
	}

	minDropDownWidth = minIndexWidth + 6;

	_parent.opts.resetBtn.on("mousedown", function (evt) {
		resetDropDown();
		_parent.opts.onReset(evt);
	});

	_parent.opts.showAnsBtn.on("mousedown", function (evt) {
		_parent.opts.showCorrectIndex(evt);
		showAnsInDD();
	});

	_parent.opts.closeBtn.on("mousedown", function (evt) {
		hideDropDownIndexes();
	});

	if (_parent.opts.reset)
		resetFn();

	init();

	function init() {
		var space = 9;
		if (navigator.userAgent.indexOf("Firefox") > 0) {
			select_mc._txt.y = select_mc._txt.y + 2;
		}

		if (isListComingTo == "up") {
			arrow.scaleY = -0.8;
		}
		else {
			arrow.scaleY = 0.8;
		}

		select_mc._txt.textAlign = textAlignValue;
		itemHeight = itemHeight + (_parent.opts.paddingBottomTop * 2);

		self.addChild(bg);
		self.addChild(customHitMc);
		self.addChild(items);

		currentIndexWidth = getMaxTxtWidth();
		currentDropDownWidth = currentIndexWidth + 6;
		if (currentDropDownWidth < minDropDownWidth) {
			currentDropDownWidth = minDropDownWidth;
		}

		select_mc._txt.lineWidth = currentIndexWidth;

		var rectBgX;
		var rectBgY;
		var rectBgWidth;
		var rectBgHeight = 0;

		var hitShape = new createjs.Shape();
		hitShape.graphics.beginFill("black");
		hitShape.graphics.drawRoundRect(0, 0, currentDropDownWidth, dropDownHeight, 5);
		hitMc.addChild(hitShape);
		hitMc.alpha = 0.01;

		hitMc.cursor = "pointer";
		hitMc.name = "hitMc";

		hitMc.addEventListener("mousedown", hdlrArrowClicked);
		hitMc.addEventListener("mouseover", hdlrMouseOver2);
		hitMc.addEventListener("mouseout", hdlrMouseOut2);

		//console.log("customHitBool "+customHitBool + " itemHeight "+itemHeight);
		var customHitMc = _parent.opts.customHitShape;
		if (customHitBool) {
			customHitMc.alpha = 0.01;
			customHitMc.cursor = "pointer";
			customHitMc.name = "hitMc";
			customHitMc.addEventListener("mousedown", hdlrArrowClicked);
			customHitMc.addEventListener("mouseover", hdlrMouseOver2);
			customHitMc.addEventListener("mouseout", hdlrMouseOut2);
		}
		else {
			customHitMc.visible = false;
		}

		//console.log("init:currentIndexWidth "+currentIndexWidth +" currentDropDownWidth "+currentDropDownWidth);
		//console.log("init:itemArray "+itemArray);
		xpos = hitMc.x;

		if (isListComingTo == "down") {
			ypos = hitMc.y + indexStartY + space;
		}
		else if (isListComingTo == "up") {
			ypos = hitMc.y - indexStartY - 2;
			itemArray.reverse();
			itemArray.pop();
			itemArray.unshift("");
		}

		//console.log("init:itemArray "+itemArray);

		var spacing = 1;
		if (showScroll) {
			currentIndexWidth = currentIndexWidth - thumbWidth;
		}

		for (var i = 1; i <= numItems; i++) {
			item = new createjs.MovieClip(null);
			item.name = "item" + i;
			if (isListComingTo == "down") {
				item.id = i;
			}
			else {
				item.id = (numItems + 1 - i);
			}

			var _txt = new createjs.Text("", "16px Arial", "#000000");
			_txt.textAlign = textAlignValue;
			_txt.text = " " + itemArray[i];
			_txt.lineWidth = currentIndexWidth;
			_txt.regY = _txt.getMeasuredHeight() / 2;
			_txt.y = itemHeight / 2 + _txt.y;

			var overMC = new createjs.MovieClip(null);
			overMC.name = "overMC";

			//console.log("currentIndexWidth "+currentIndexWidth);
			//console.log("_txt "+_txt.height);

			var indexShape = new createjs.Shape();
			indexShape.graphics.beginFill(indexHoverColor);
			indexShape.graphics.drawRoundRect(0, 0, currentIndexWidth, itemHeight, 5);
			overMC.addChild(indexShape);
			overMC.alpha = minAlphaValue;

			// for displaying index selection
			var selectionMC = new createjs.MovieClip(null);
			selectionMC.name = "selectionMC";

			var selectionShape = new createjs.Shape();
			selectionShape.graphics.beginFill(_parent.opts.indexSelectionColor);
			selectionShape.graphics.drawRoundRect(0, 0, currentIndexWidth, itemHeight, 5);
			selectionMC.addChild(selectionShape);
			selectionMC.alpha = _parent.opts.indexSelectionAlpha;

			item.cursor = "pointer";
			item.addChild(selectionMC);
			selectionMC.visible = false;

			if (_parent.opts.defaultIndex == itemArray[i]) {
				selectionMC.visible = true;
				dropDownIndex = i;
			}

			item.addChild(overMC);
			item.addChild(_txt);
			items.addChild(item);

			item.visible = false;
			//console.log("ypos "+i,ypos);

			item.x = xpos + 3.10;
			item.y = ypos;

			//console.log("item:y "+i,item.y);

			if (isListComingTo == "down") {
				ypos = ypos + itemHeight + spacing;
			}
			else if (isListComingTo == "up") {
				ypos = ypos - itemHeight - spacing;
			}

			item.addEventListener("mouseover", itemMouseOver);
			item.addEventListener("mouseout", itemMouseOut);
			item.addEventListener("mousedown", hdlrItemClick);
			//stageMain.addEventListener("mousedown",onStageClick);
		}
		//console.log("numItems "+numItems);
		totalIndexHeight = Math.abs(items.getChildByName("item" + numItems).y);
		totalIndexHeight = totalIndexHeight + 2;

		//console.log("items.y "+items.y);

		if (showScroll) {
			rectBgHeight = Math.abs(items.getChildByName("item" + totalIndexesToShow).y);
		}
		else {
			rectBgHeight = Math.abs(items.getChildByName("item" + numItems).y);
		}

		rectBgX = xpos + 1;
		rectBgWidth = currentDropDownWidth - 2;

		if (isListComingTo == "down") {
			ypos = hitMc.y + indexStartY;
			rectBgHeight = rectBgHeight + (itemHeight - indexStartY) + 2;
			rectBgY = ypos;
			scrollHeight = rectBgHeight - 8;

		}
		else if (isListComingTo == "up") {
			ypos = hitMc.y;
			//rectBgHeight = rectBgHeight + 2;	
			rectBgHeight = rectBgHeight + (itemHeight - indexStartY) + 2;
			rectBgY = ypos - rectBgHeight;
			scrollHeight = rectBgHeight;
			if (!showScroll) {
				items.y = -1 * (_parent.opts.paddingBottomTop * 2);
			}
		}

		/*console.log("itemHeight "+itemHeight +" rectBgHeight "+rectBgHeight + " scrollHeight "+scrollHeight);*/
		//console.log("totalIndexHeight "+totalIndexHeight);
		/*console.log("rectBgHeight "+rectBgHeight);
		console.log("rectBgY "+rectBgY);*/

		// total indexes outline
		rect.graphics.setStrokeStyle(1).beginStroke("#000000");
		rect.graphics.beginFill("white");
		if (showScroll) {
			rect.graphics.drawRect(rectBgX, rectBgY, rectBgWidth, rectBgHeight);
		}
		else {
			rect.graphics.drawRoundRect(rectBgX, rectBgY, rectBgWidth, rectBgHeight, cornerRadius);
		}
		bg.addChild(rect);
		rect.visible = false;

		//select_mc.visible = false;

		// dropdown select shape	
		var outline = new createjs.Shape();
		outline.graphics.setStrokeStyle(2.2).beginStroke("#333333");
		outline.graphics.beginFill("white");
		outline.graphics.drawRoundRect(0, 0, currentDropDownWidth, dropDownHeight, 5);

		//console.log("dropDownHeight,rectBgY "+dropDownHeight,rectBgY);

		// code added for solving breaking lines issue.
		var dummy = new createjs.Shape();
		dummy.graphics.setStrokeStyle(2.2).beginStroke("#333333");
		dummy.graphics.drawRect(0 + 5, 0, currentDropDownWidth - 10, dropDownHeight);
		self.addChild(dummy);

		var dummy2 = new createjs.Shape();
		dummy2.graphics.setStrokeStyle(2.2).beginStroke("#333333");
		dummy2.graphics.moveTo(currentDropDownWidth, 0 + 3);
		dummy2.graphics.lineTo(currentDropDownWidth, dropDownHeight - 5);
		self.addChild(dummy2);

		arrow.x = currentDropDownWidth - 17.4;

		if (showScroll) {
			var maskShape = new createjs.Shape();
			maskShape.graphics.beginFill("red");
			maskShape.graphics.drawRoundRect(rectBgX, rectBgY, rectBgWidth, rectBgHeight, cornerRadius);
			items.mask = maskShape;
			bg.addChild(maskShape);
			maskShape.alpha = 0;

			self.addChild(scrollContainer);
			scrollContainer.visible = false;

			var scrollStartX = arrow.x - 3.5;
			var scrollStartY;

			if (isListComingTo == "down") {
				scrollStartY = arrow.y + 14;
			}
			else {
				scrollStartY = rectBgY;
				items.y = items.y + (totalIndexHeight - scrollHeight);
				scrollHeight = scrollHeight - 1;
			}

			/*console.log("scrollHeight,scrollStartY "+scrollHeight,scrollStartY);*/
			//console.log("items Y "+items.y);		

			// extrashape to hide small gap
			var extraShape = new createjs.Shape();
			extraShape.graphics.setStrokeStyle(1).beginStroke("black").beginFill("black");
			extraShape.graphics.drawRect(scrollStartX, scrollStartY - 10, 20, 10);
			if (isListComingTo == "down") {
				scrollContainer.addChild(extraShape);
			}

			var scrollBg = new createjs.Shape();
			scrollBg.graphics.setStrokeStyle(1).beginStroke("black").beginFill(scrollBarFillColor);
			scrollBg.graphics.drawRect(scrollStartX, scrollStartY, 20, scrollHeight);
			scrollContainer.addChild(scrollBg);
			scrollBg.name = "scrollBg";

			var thumb = new createjs.Shape();
			thumb.graphics.setStrokeStyle(1).beginStroke("black").beginFill(thumbFillColor);
			/*thumb.graphics.drawRoundRectComplex(
				scrollStartX, scrollStartY, thumbWidth, thumbHeight,
				0 ,5 ,5 ,0);*/
			thumb.graphics.drawRect(scrollStartX, scrollStartY, thumbWidth, thumbHeight);
			scrollContainer.addChild(thumb);
			thumb.name = "thumb";

			var contentHeight = totalIndexHeight + (_parent.opts.paddingBottomTop * 2);
			var scrollFaceHeight = thumbHeight;
			var maskHeight = rectBgHeight;
			var initPosition = thumb.y = scrollBg.y;
			var initContentPos = items.y;

			var dy = 0;
			//var speed = 10;
			var moveVal = (contentHeight - maskHeight) / (scrollHeight - scrollFaceHeight);

			//console.log("contentHeight "+contentHeight,maskHeight,scrollHeight,scrollFaceHeight);
			//console.log("initContentPos "+initContentPos,moveVal);

			thumb.on("mousedown", function (evt) {
				var rS = heymathLessons.ratioScale;
				this.offset = { x: this.x * rS - evt.stageX, y: this.y * rS - evt.stageY };
				//console.log("mousedown");
			});

			thumb.on("pressmove", function (evt) {
				var rS = heymathLessons.ratioScale;
				var xPos = (evt.stageX + this.offset.x) / rS;
				var yPos = (evt.stageY + this.offset.y) / rS;

				var maxScroll = scrollHeight - thumbHeight;
				var minScroll = 0;

				//console.log("pressmove:yPos "+yPos,minScroll,maxScroll);

				if (yPos > minScroll && yPos < maxScroll) {
					thumb.y = yPos;
				}

				if (yPos < minScroll) {
					thumb.y = minScroll;
				}
				if (yPos > maxScroll) {
					thumb.y = maxScroll;
				}

				dy = Math.abs(initPosition - thumb.y);

				items.y = Math.round(dy * -1 * moveVal + initContentPos);

				//console.log("pressmove:dy "+dy,maxScroll);
				//console.log("pressmove:yPos "+yPos,thumb.y,items.y);
				//console.log("pressmove "+totalIndexHeight,scrollHeight);
			});
		}
		self.addChild(outline);
		self.addChild(select_mc);
		self.addChild(arrow);
		self.addChild(hitMc);
	}

	function itemMouseOver(evt) {
		if (isMobile.any()) {
			return;
		}
		var target = evt.currentTarget;
		var mc = target.getChildByName("overMC");
		//console.log("itemMouseOver "+mc.name);
		mc.alpha = indexHoverAlpha;
		rollOverflg = true;

		var selectionMc = target.getChildByName("selectionMC");
		if (selectionMc.visible) {
			target.vis = true;
			selectionMc.visible = false;
		}
	}

	function itemMouseOut(evt) {
		if (isMobile.any()) {
			return;
		}
		var target = evt.currentTarget;
		var mc = target.getChildByName("overMC");
		//console.log("itemMouseOut "+mc.name);
		mc.alpha = minAlphaValue;
		rollOverflg = false;

		if (target.vis == true) {
			target.vis = false;
			var selectionMc = target.getChildByName("selectionMC");
			selectionMc.visible = true;
		}
	}

	function hdlrMouseOver2(evt) {
		if (isMobile.any()) {
			return;
		}
		//console.log("hdlrMouseOver2 "+arrowOver);
		arrowOver = true;
	}

	function hdlrMouseOut2(evt) {
		if (isMobile.any()) {
			return;
		}
		//console.log("hdlrMouseOver2");
		arrowOver = false;
	}

	function onStageClick(evt) {
		//console.log("onStageClick:rollOverflg "+rollOverflg +" arrowOver "+arrowOver);
		//console.log("onStageClick:target.name "+evt.target.name);
		if (evt.target.name != "scrollBg" && evt.target.name != "thumb") {
			flag = true;
			itemVisibility(false);
			stageMain.removeEventListener("mousedown", onStageClick);
		}
	}

	function hdlrArrowClicked(evt) {
		//console.log("hdlrArrowClicked "+flag +" dropDownIndex "+dropDownIndex);
		if (flag) {
			flag = false;
			itemVisibility(true);
			stageMain.removeEventListener("mousedown", onStageClick);
			setTimeout(function () {
				stageMain.addEventListener("mousedown", onStageClick)
			}, 30);
		}
		else {
			flag = true;
			itemVisibility(false);
			stageMain.removeEventListener("mousedown", onStageClick);
		}
		_parent.opts.onDropDownClicked();
	}


	function hdlrItemClick(evt) {
		flag = true;
		//console.log("hdlrItemClick "+dropDownIndex);
		var clickMc = (evt.currentTarget);
		myClickMcVal = clickMc.name.split("item")[1];
		select_mc._txt.text = itemArray[myClickMcVal];
		selectText = select_mc._txt.text;
		itemVisibility(false);
		itemSelectTrue = true;
		dropDownIndex = clickMc.id;
		//console.log("dropDownIndex "+dropDownIndex);
		_parent.opts.onIndexSelected(dropDownIndex);
		if (dropDownIndex != currentIndexNo) {
			_parent.opts.onIndexChanged(dropDownIndex);
		}
		currentIndexNo = dropDownIndex;
		if (dropDownIndex == ansIndexNo) {
			_parent.opts.onCorrectAnsSelected();
		}
		else {
			_parent.opts.onWrongAnsSelected();
		}
		var mc = clickMc.getChildByName("overMC");
		if (!isMobile.any()) {
			mc.alpha = indexHoverAlpha;
		}

		hideSelection();
		clickMc.getChildByName("selectionMC").visible = true;
	}

	function hideSelection() {
		window.setTimeout(function () {
			for (var i = 1; i <= items.numChildren; i++) {
				items.getChildByName("item" + i).getChildByName("selectionMC").visible = false;
			}
		}, 500);
	}

	function itemVisibility(val) {
		var mc;
		for (var i = 1; i <= numItems; i++) {
			mc = items.getChildByName("item" + i);
			items.addChild(mc);
			mc.visible = val;
		}
		rect.visible = val;
		scrollContainer.visible = val;
		//console.log("rect.visible "+rect.visible)
	}

	function showAnsInDD() {
		flag = true;
		itemVisibility(false);
		dropDownIndex = ansIndexNo;
		select_mc._txt.text = itemArray[ansIndexNo];
		//console.log("showAnsInDD:ans "+itemArray[ansIndexNo],ansIndexNo)
		//hideSelection();
		//var mc = items.getChildByName("item"+ansIndexNo);
		//mc.getChildByName("selectionMC").visible = true;
	}

	function resetDropDown() {
		trace("resetDropDown");
		dropDownIndex = 0;
		currentIndexNo = dropDownIndex;
		flag = true;
		select_mc._txt.text = _parent.opts.defaultIndex;
		itemVisibility(false);
		hideSelection();
	}

	function hideDropDownIndexes() {
		flag = true;
		itemVisibility(false);
	}

	function removeEvents(self) {
		_parent = self;
		_parent.opts.resetBtn.removeAllEventListeners();
		_parent.opts.showAnsBtn.removeAllEventListeners();
	}

	function getMaxTxtWidth() {
		//console.log("getMaxTxtWidth");
		var item = select_mc._txt;
		currentIndexWidth = 0;
		for (var i = 1; i <= numItems; i++) {
			item.text = itemArray[i];
			if (currentIndexWidth < parseInt(item.getMeasuredWidth())) {
				currentIndexWidth = Math.round(item.getMeasuredWidth())
				item.lineWidth = currentIndexWidth;
			}
			//console.log("currentIndexWidth "+i,item.getMeasuredWidth());
		}
		//console.log("currentIndexWidth "+currentIndexWidth,minIndexWidth);
		currentIndexWidth = currentIndexWidth + 44;
		select_mc._txt.text = _parent.opts.defaultIndex;
		if ((currentIndexWidth) < minIndexWidth) {
			return minIndexWidth;
		}
		return (currentIndexWidth);
	}

	function resetFn() {
		self.removeAllChildren();
		self.removeAllEventListeners();
	}

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
}