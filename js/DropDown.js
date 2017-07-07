createjs.MovieClip.prototype.DropDown = function(options)
{
	var _parent = this;

	var dummyShowAnswer = new createjs.MovieClip(null)
    _parent.addChild(dummyShowAnswer);

    var dummyReset  = new createjs.MovieClip(null)
    _parent.addChild(dummyReset);

    var dummyClose  = new createjs.MovieClip(null)
    _parent.addChild(dummyClose);

	extend = function(){
	    for(var i=1; i<arguments.length; i++)
	        for(var key in arguments[i])
	            if(arguments[i].hasOwnProperty(key))
	                arguments[0][key] = arguments[i][key];
	    return arguments[0];
	}

	this.defaults = {
      indexes:[],
      showAnsBtn:dummyShowAnswer,
      resetBtn:dummyReset,
      closeBtn:dummyClose,
      indexHoverColor:"#FF0099",
      indexHoverAlpha:0.5,
      indexSelectionColor:"#66FF66",
      indexSelectionAlpha:1,
      indexDirection:"down",
      defaultIndex:"Select",
      showScroll:false,
      thumbFillColor:"#FBDACA",
      scrollBarFillColor:"#A9A9A9",
      textAlignValue:"left",
      size:"large",
	  onIndexSelected:function(data)
	  {

	  },
	  onIndexChanged:function(data)
	  {

	  },
	  onReset:function(data)
	  {

	  },
	  showCorrectIndex:function(data)
	  {

	  },
	  onCorrectAnsSelected:function()
	  {

	  },
	  onWrongAnsSelected:function()
	  {

	  },
	  onDropDownClicked:function()
	  {

	  }
	};

    _parent.opts = extend({}, this.defaults, options);

    var itemArray = _parent.opts.indexes;
    itemArray.unshift("");
   
    var ansIndexNo = _parent.opts.answer + 0;
    var indexHoverColor = _parent.opts.indexHoverColor;
    var indexHoverAlpha = _parent.opts.indexHoverAlpha;
    var isListComingTo = _parent.opts.indexDirection;
    var cpSize = _parent.opts.size;
    //console.log("itemArray "+itemArray +" ansIndexNo "+ansIndexNo);
  
    var self = this;
	var select_mc = self["select_mc"];
	var arrow = self["arrow"];  

	var numItems = itemArray.length - 1;
	var item;
	var selectText = "";
	var itemSelectTrue = false;
	var rollOverflg = false;
	var xpos,ypos;

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
	var totalIndexesToShow = 5;
	var scrollHeight = 0;
	var thumbHeight = 20;
	var thumbWidth = 20;
	var totalIndexHeight = 0;

	var thumbFillColor = _parent.opts.thumbFillColor;
	var scrollBarFillColor = _parent.opts.scrollBarFillColor;

	var currentIndexNo = 0;

	var rect = new createjs.Shape();
	var bg  = new createjs.MovieClip(null);
	var items  = new createjs.MovieClip(null);
	var scrollContainer  = new createjs.MovieClip(null);
	var hitMc  = new createjs.MovieClip(null);

	var defaultIndexStr = _parent.opts.defaultIndex;

	if(String(defaultIndexStr).length == 1){
		minIndexWidth = 50;
	}
	else if(String(defaultIndexStr).length >= 2 && String(defaultIndexStr).length <= 3){
		minIndexWidth = 69;
	}
	else{
		minIndexWidth = 92;	
	}
	
	minDropDownWidth = minIndexWidth + 6;

	_parent.opts.resetBtn.on("click", function(evt)
	{
		resetDropDown();
		_parent.opts.onReset(evt);
	});

	_parent.opts.showAnsBtn.on("click", function(evt) {
		_parent.opts.showCorrectIndex(evt);
		showAnsInDD();
	});

	_parent.opts.closeBtn.on("click", function(evt)
	{
		hideDropDownIndexes();
	});

	init();

	function init(){

		var space = 9;
		if (navigator.userAgent.indexOf("Firefox") > 0) {
			select_mc._txt.y = select_mc._txt.y + 2;	
		}
		
		if (isListComingTo == "up"){
			arrow.scaleY = -0.8;
		}
		else{
			arrow.scaleY = 0.8;
		}

		select_mc._txt.textAlign = _parent.opts.textAlignValue;

		self.addChild(bg);
		self.addChild(items);

		currentIndexWidth = getMaxTxtWidth();
		currentDropDownWidth  = currentIndexWidth + 6;
		if(currentDropDownWidth < minDropDownWidth){
			currentDropDownWidth = minDropDownWidth;
		}

		select_mc._txt.lineWidth = currentIndexWidth;

		var hitShape = new createjs.Shape();
		hitShape.graphics.beginFill("black");
		hitShape.graphics.drawRoundRect(0,0,currentDropDownWidth,dropDownHeight,5);
		hitMc.addChild(hitShape);
		hitMc.alpha = 0.01;

		hitMc.cursor = "pointer";
		hitMc.name = "hitMc";

		hitMc.addEventListener("click", hdlrArrowClicked);	
		hitMc.addEventListener("mouseover", hdlrMouseOver2);
		hitMc.addEventListener("mouseout", hdlrMouseOut2);

		//console.log("init:currentIndexWidth "+currentIndexWidth +" currentDropDownWidth "+currentDropDownWidth);
		//console.log("init:itemArray "+itemArray);
		xpos = hitMc.x;

		if (isListComingTo == "down"){
			ypos = hitMc.y + itemHeight + space;			
		}
		else if (isListComingTo == "up"){
			ypos = hitMc.y - itemHeight - 2;
			itemArray.reverse();
			itemArray.pop();
			itemArray.unshift("");
		}

		//console.log("init:itemArray "+itemArray);

		var spacing = 1;
		if(showScroll){
			currentIndexWidth = currentIndexWidth - thumbWidth;
		}

		for (var i=1; i<=numItems; i++){

			item  = new createjs.MovieClip(null);
			item.name = "item" + i;
			if (isListComingTo == "down"){
				item.id = i;
			}
			else{
				item.id = (numItems + 1 - i);
			}

			var _txt = new createjs.Text("", "16px Arial", "#000000"); 
			_txt.textAlign =_parent.opts.textAlignValue;	
		 	_txt.text = " "+itemArray[i];
			_txt.lineWidth = currentIndexWidth;	
			_txt.y = _txt.y + 1;

			var overMC = new createjs.MovieClip(null);
			overMC.name="overMC";

			//console.log("currentIndexWidth "+currentIndexWidth);

			var indexShape = new createjs.Shape();
			indexShape.graphics.beginFill(indexHoverColor);
			indexShape.graphics.drawRoundRect(0,0,currentIndexWidth,itemHeight,5);
			overMC.addChild(indexShape);
			overMC.alpha = minAlphaValue;

			// for displaying index selection
			var selectionMC = new createjs.MovieClip(null);
			selectionMC.name="selectionMC";

			var selectionShape = new createjs.Shape();
			selectionShape.graphics.beginFill(_parent.opts.indexSelectionColor);
			selectionShape.graphics.drawRoundRect(0,0,currentIndexWidth,itemHeight,5);
			selectionMC.addChild(selectionShape);
			selectionMC.alpha = _parent.opts.indexSelectionAlpha;

			item.cursor = "pointer";
			item.addChild(selectionMC);
			selectionMC.visible = false;
			item.addChild(overMC);
			item.addChild(_txt);
			items.addChild(item);

			item.visible = false;

			//console.log("_txt:y "+i,_txt.y);
			item.x = xpos+3.10;
			item.y = ypos;
		
			if (isListComingTo == "down"){		
				ypos = ypos + itemHeight + spacing;
			}
			else if (isListComingTo == "up"){
				ypos = ypos - itemHeight - spacing;
			}

			item.addEventListener("mouseover", itemMouseOver);
			item.addEventListener("mouseout", itemMouseOut);
			item.addEventListener("click", hdlrItemClick);
			stageMain.addEventListener("mousedown",onStageClick);
		}
		//console.log("numItems "+numItems);
		totalIndexHeight = Math.abs(items.getChildByName("item"+numItems).y);
		totalIndexHeight = totalIndexHeight + 2;

		var rectBgX;
		var rectBgY; 
		var rectBgWidth; 
		var rectBgHeight;

		//console.log("showScroll "+showScroll);
		if(showScroll){
			rectBgHeight = Math.abs(items.getChildByName("item"+totalIndexesToShow).y); 
		}
		else{
			rectBgHeight = Math.abs(items.getChildByName("item"+numItems).y); 	
		}		

		rectBgX = xpos+1;
		rectBgWidth = currentDropDownWidth-2;

		if (isListComingTo == "down"){
			ypos = hitMc.y + itemHeight;			
			rectBgHeight = rectBgHeight+2;
			rectBgY = ypos;
			scrollHeight = rectBgHeight - 8;
		}
		else if (isListComingTo == "up"){
			ypos = hitMc.y;			
			rectBgHeight = rectBgHeight+2;
			rectBgY = ypos-rectBgHeight;
			scrollHeight = rectBgHeight;
		}

		/*console.log("itemHeight "+itemHeight +" rectBgHeight "+rectBgHeight + " scrollHeight "+scrollHeight);
		console.log("totalIndexHeight "+totalIndexHeight);*/

		// total indexes outline
		rect.graphics.setStrokeStyle(1).beginStroke("#000000");
		rect.graphics.beginFill("white");
		if(showScroll){
			rect.graphics.drawRect(rectBgX,rectBgY,rectBgWidth,rectBgHeight);	
		}
		else{
			rect.graphics.drawRoundRect(rectBgX,rectBgY,rectBgWidth,rectBgHeight,cornerRadius);		
		}
		bg.addChild(rect);
		rect.visible = false;
	
		// dropdown select shape	
		var outline = new createjs.Shape();
		outline.graphics.setStrokeStyle(2.2).beginStroke("#333333");
		outline.graphics.beginFill("white");
		outline.graphics.drawRoundRect(0,0,currentDropDownWidth,dropDownHeight,5);

		//console.log("dropDownHeight,rectBgY "+dropDownHeight,rectBgY);

		// code added for solving breaking lines issue.
		var dummy = new createjs.Shape();
		dummy.graphics.setStrokeStyle(2.2).beginStroke("#333333");
		dummy.graphics.drawRect(0+5,0,currentDropDownWidth-10,dropDownHeight);
		self.addChild(dummy);

		var dummy2 = new createjs.Shape();
		dummy2.graphics.setStrokeStyle(2.2).beginStroke("#333333");
		dummy2.graphics.moveTo(currentDropDownWidth,0+3);
		dummy2.graphics.lineTo(currentDropDownWidth,dropDownHeight-5);
		self.addChild(dummy2);

		self.addChild(outline);
		self.addChild(select_mc);	
		self.addChild(arrow);	
		self.addChild(hitMc);

		arrow.x = currentDropDownWidth - 17.4;

		if(showScroll){
			var maskShape = new createjs.Shape();
			maskShape.graphics.beginFill("red");
			maskShape.graphics.drawRoundRect(rectBgX,rectBgY,rectBgWidth,rectBgHeight,cornerRadius);	
			items.mask = maskShape;
			bg.addChild(maskShape);
			maskShape.alpha = 0;

			self.addChild(scrollContainer);
			scrollContainer.visible = false;

			var scrollStartX = arrow.x - 3.5;
			var scrollStartY;

			if(isListComingTo=="down"){
				 scrollStartY = arrow.y + 14;
			}
			else{
				scrollStartY = rectBgY;
				items.y = items.y + (totalIndexHeight - scrollHeight);
				scrollHeight = scrollHeight - 1; 
			}

			/*console.log("scrollHeight,scrollStartY "+scrollHeight,scrollStartY);
			console.log("items Y "+items.y);		*/

			// extrashape to hide small gap
			var extraShape = new createjs.Shape();
			extraShape.graphics.setStrokeStyle(1).beginStroke("black").beginFill("black");
			extraShape.graphics.drawRect(scrollStartX, scrollStartY-10, 20, 10);
			if (isListComingTo == "down"){
				scrollContainer.addChild(extraShape);
			}

			var scrollBg = new createjs.Shape();
			scrollBg.graphics.setStrokeStyle(1).beginStroke("black").beginFill(scrollBarFillColor);
			scrollBg.graphics.drawRect(scrollStartX, scrollStartY, 20, scrollHeight);
			scrollContainer.addChild(scrollBg);
			scrollBg.name="scrollBg";

			var thumb = new createjs.Shape();
			thumb.graphics.setStrokeStyle(1).beginStroke("black").beginFill(thumbFillColor);
			/*thumb.graphics.drawRoundRectComplex(
				scrollStartX, scrollStartY, thumbWidth, thumbHeight,
				0 ,5 ,5 ,0);*/
			thumb.graphics.drawRect(scrollStartX, scrollStartY, thumbWidth, thumbHeight);						
			scrollContainer.addChild(thumb);
			thumb.name="thumb";

			var contentHeight = totalIndexHeight;
			var scrollFaceHeight = thumbHeight;
			var maskHeight = rectBgHeight;
			var initPosition = thumb.y=scrollBg.y;
			var initContentPos = items.y;
			var finalContentPos = maskHeight-contentHeight+initContentPos;
					
			var dy = 0;
			var speed = 10;
			var moveVal = (contentHeight-maskHeight)/(scrollHeight-scrollFaceHeight);

			thumb.on("mousedown", function(evt) 
			{
				var rS = heymathLessons.ratioScale;
				this.offset = {x:this.x*rS - evt.stageX, y:this.y*rS - evt.stageY};
				//console.log("mousedown");
			});

			thumb.on("pressmove", function(evt) 
			{
				var rS = heymathLessons.ratioScale;
				var xPos = (evt.stageX + this.offset.x)/rS;
				var yPos = (evt.stageY + this.offset.y)/rS;

				var maxScroll = scrollHeight-thumbHeight;
				var minScroll = 0;

				//console.log("pressmove:yPos "+yPos,minScroll,maxScroll);
				
				if(yPos > minScroll && yPos < maxScroll){
					thumb.y = yPos;				
				}

				if(yPos < minScroll){
						thumb.y = minScroll;
				}
				if(yPos > maxScroll){
						thumb.y = maxScroll;
				}

				dy = Math.abs(initPosition-thumb.y);

				items.y = Math.round(dy*-1*moveVal+initContentPos);
			
				//console.log("pressmove:yPos "+yPos,thumb.y,items.y);
				//console.log("pressmove "+totalIndexHeight,scrollHeight);
			});
		}
		self.addChild(outline);
		self.addChild(select_mc);
		self.addChild(arrow);
		self.addChild(hitMc);
	}

	function itemMouseOver(evt){
		var target = evt.currentTarget;
		var mc = target.getChildByName("overMC");
		//console.log("itemMouseOver "+mc.name);
		mc.alpha = indexHoverAlpha;
		rollOverflg = true;

		var selectionMc = target.getChildByName("selectionMC");
		if(selectionMc.visible){
			target.vis = true;
			selectionMc.visible = false;
		}
	}

	function itemMouseOut(evt){
		var target = evt.currentTarget;
		var mc = target.getChildByName("overMC");
		//console.log("itemMouseOut "+mc.name);
		mc.alpha = minAlphaValue;
		rollOverflg = false;

		if(target.vis == true){
			target.vis = false;
			var selectionMc = target.getChildByName("selectionMC");
			selectionMc.visible = true;
		}
	}

	function hdlrMouseOver2(evt){
		//console.log("hdlrMouseOver2 "+arrowOver);
		arrowOver = true;
	}

	function hdlrMouseOut2(evt){
		//console.log("hdlrMouseOver2");
		arrowOver = false;
	}

	function onStageClick(evt){
		//console.log("onStageClick:rollOverflg "+rollOverflg +" arrowOver "+arrowOver);
		//console.log("onStageClick:target.name "+evt.target.name);
		if (evt.target.name == null)
		{
			flag = true;
		}
		if (!rollOverflg && !arrowOver && evt.target.name!="scrollBg" && evt.target.name!="thumb")
		{
			itemVisibility(false);
		}
		else if (!rollOverflg && arrowOver && rect.visible)
		{
			flag = false;
		}
	}

	function hdlrArrowClicked(evt){
		//console.log("hdlrArrowClicked "+flag +" dropDownIndex "+dropDownIndex);
		if (flag)
		{
			flag = false;
			//select_mc._txt.text = itemArray[dropDownIndex];
			itemVisibility(true);
		}
		else
		{
			flag = true;
			//select_mc._txt.text = itemArray[dropDownIndex];
			itemVisibility(false);
		}
		_parent.opts.onDropDownClicked();
	}

	function hdlrItemClick(evt){
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
		if(dropDownIndex != currentIndexNo){
			_parent.opts.onIndexChanged(dropDownIndex);
		}
		currentIndexNo = dropDownIndex;
		if(dropDownIndex == ansIndexNo){
			_parent.opts.onCorrectAnsSelected();
		}
		else{
			_parent.opts.onWrongAnsSelected();
		}
		var mc = clickMc.getChildByName("overMC");
		mc.alpha = indexHoverAlpha;	

		hideSelection();
		clickMc.getChildByName("selectionMC").visible = true;
	}

	function hideSelection(){
		for (var i=1; i<=numItems; i++){
			items.getChildByName("item"+i).getChildByName("selectionMC").visible = false;
		}
	}


	function itemVisibility(val){
		var mc;
		for (var i=1; i<=numItems; i++)
		{
			mc=items.getChildByName("item"+i);
			items.addChild(mc);
			mc.visible = val;
		}
		rect.visible = val;
		scrollContainer.visible = val;
		//console.log("rect.visible "+rect.visible)
	}

	function showAnsInDD(){
		flag = true;
		itemVisibility(false);
		dropDownIndex = ansIndexNo;
		select_mc._txt.text = itemArray[ansIndexNo];
		//console.log("showAnsInDD:ans "+dropDownIndexes[ansIndexNo])
		hideSelection();
		var mc = self.items.getChildByName("item"+ansIndexNo);
		mc.getChildByName("selectionMC").visible = true;
	}

	function resetDropDown(){
		dropDownIndex = 0;
		flag = true;
		select_mc._txt.text = _parent.opts.defaultIndex;
		itemVisibility(false);
	}

	function hideDropDownIndexes(){
		flag = true;
		itemVisibility(false);
	}

	function removeEvents(self){
		_parent = self;
		_parent.opts.resetBtn.removeAllEventListeners();
		_parent.opts.showAnsBtn.removeAllEventListeners();
	}

	function getMaxTxtWidth(){
		//console.log("getMaxTxtWidth");
		var item = select_mc._txt;
		currentIndexWidth = 0;
		for(var i=1; i<=numItems; i++){
			item.text = itemArray[i];	
			if(currentIndexWidth<parseInt(item.getMeasuredWidth()))
			{
				currentIndexWidth = Math.round(item.getMeasuredWidth())
				item.lineWidth = currentIndexWidth;
			}
			//console.log("currentIndexWidth "+i,item.getMeasuredWidth());
		}
		//console.log("currentIndexWidth "+currentIndexWidth,minIndexWidth);
		currentIndexWidth = currentIndexWidth + 44;
		select_mc._txt.text = _parent.opts.defaultIndex;
		if((currentIndexWidth ) < minIndexWidth){
			return minIndexWidth;
		}
		return (currentIndexWidth);
	}
}
