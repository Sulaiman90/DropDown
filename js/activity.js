var mainMov;

function initialSetUp(obj){
	console.log("initialSetUp ");
	parent.$("#back").trigger("click");
	mainMov = obj;
	createDropDown();
}

function createDropDown(){	
	/*var dropDownIndexes = ["Elephant","Bungalow","India Map","Shelf","Four",
						   "Castle","Cup","Cup and saucer","Van","Car"
						   ];	
	
*/
	var dropDownIndexes=["Home","Police Station","Fire Station",
					"Pharmacy","City Hospital","Car Park"];					 

	var cnt = 0;
						 			   					   
	//dropDownIndexes.sort(Array.CASEINSENSITIVE);

	console.log("createDropDown:dropDownIndexes "+dropDownIndexes,dropDownIndexes.length);

	stageMain.combo.DropDown({
		indexes:dropDownIndexes,
		answer:4,
		indexHoverColor:"#66CCFF",
      	indexHoverAlpha:0.7,
      	indexDirection:"down",
		defaultIndex:"Select",
		showScroll:true,
		customHitBool:true,
		customHitShape:stageMain.combo.customHitMc,
		showAnsBtn:stageMain.show_btn,
		closeBtn:stageMain.close_btn,
		paddingBottomTop:10,
		onIndexSelected:function(data)
		{		
			console.log("onIndexSelected "+data);
		},
		onIndexChanged:function(indexNo)
		{
			console.log("onIndexChanged "+indexNo);
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
			cnt++;
			console.log("Wrong Ans Selected"+cnt);
			if(cnt==3){
				stageMain.show_btn.dispatchEvent("mousedown");
			}	
		}			
	});


	console.log("createDropDown:dropDownIndexes "+dropDownIndexes,dropDownIndexes.length);

	stageMain.show_btn.addEventListener("mousedown",closeDropDown);

	function closeDropDown(e){
		stageMain.close_btn.dispatchEvent("mousedown");
	}
	
}

