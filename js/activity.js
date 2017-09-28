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
	/*var dropDownIndexes=["Home","Home","Police Station","Fire Station",
					"Pharmacy","City Hospital","Car Park","Cinema",
					"Children Park","Creche","College","Secondary School",
					"Super Market","Water Pumping","Primary School","Transformer"];			*/		 

var dropDownIndexes = ["Home","Police","Transformer"]; 

var cnt = 0;
						 			   					   
	//dropDownIndexes.sort(Array.CASEINSENSITIVE);

	console.log("createDropDown:dropDownIndexes "+dropDownIndexes);

	stageMain.combo.DropDown({
		indexes:dropDownIndexes,
		answer:1,
		indexHoverColor:"#66CCFF",
      	indexHoverAlpha:0.7,
      	indexDirection:"down",
		defaultIndex:"Select",
		showScroll:false,
		customHitBool:true,
		customHitShape:stageMain.combo.customHitMc,
		showAnsBtn:stageMain.show_btn,
		onIndexSelected:function(data)
		{		
			//console.log("onIndexSelected "+data);
		},
		onIndexChanged:function(indexNo)
		{
			//console.log("onIndexChanged "+indexNo);
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
}

