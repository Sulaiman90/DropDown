var mainMov;

function initialSetUp(obj){
	console.log("initialSetUp ");
	parent.$("#back").trigger("click");
	mainMov = obj;
	createDropDown();
}

function createDropDown(){	
	var dropDownIndexes = ["Elephant","Bungalow","India Map","Shelf","Four",
						   "Castle","Cup","Cup and saucer","Van","Car"
						   ];	
						 			   					   
	//console.log("createDropDown:dropDownIndexes "+dropDownIndexes);
	dropDownIndexes.sort(Array.CASEINSENSITIVE);

	stageMain.combo.DropDown({
		indexes:dropDownIndexes,
		answer:1,
		indexHoverColor:"#66CCFF",
      	indexHoverAlpha:0.7,
      	indexDirection:"down",
		defaultIndex:"Select",
		size:"large",
		showScroll:true,
		onIndexSelected:function(data)
		{		
			console.log("onIndexSelected "+data);
		},
		onDropDownClicked:function()
		{
			//console.log("onDropDownClicked");
		},
		onCorrectAnsSelected:function()
		{
			//console.log("Correct Ans Selected");		
		},
		onWrongAnsSelected:function()
		{
			//console.log("Wrong Ans Selected");
		}			
	});
}

