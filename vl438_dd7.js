(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
var rect; // used to reference frame bounds
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AlTibIKnAAIAAE3IqnAAg");
	this.shape.setTransform(6.4,2.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.008)").s().p("AlTCbIAAk1IKnAAIAAE1g");
	this.shape_1.setTransform(6.4,2.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgiAoQgNgOAAgZQAAgZAOgPQANgOAVAAQAUAAANAOQAOAOAAAZIAAAEIhNAAQABARAJAKQAJAJAMAAQAJAAAHgFQAHgGAEgLIASADQgEAQgMAIQgLAJgTAAQgVAAgOgOgAgTgfQgIAIgBAOIA5AAQgBgNgGgHQgIgKgNAAQgLAAgJAIg");
	this.shape_2.setTransform(19.9,1.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgdAuQgKgJgDgQIARgDQACALAGAFQAHAGALAAQAMAAAGgFQAGgFAAgHQAAgGgFgDQgEgDgOgDQgTgFgHgDQgHgDgEgGQgEgHAAgHQAAgHADgGQADgGAGgEQAEgDAHgCQAHgCAIAAQALAAAKADQAJAEAEAGQAEAGACAKIgRACQgBgIgGgEQgFgFgKAAQgMAAgFAEQgFAEAAAGQAAADACADQACADAFABIAOAFQATAFAHADQAIACAEAGQAEAGAAAJQAAAJgFAIQgFAIgKAEQgKAEgMAAQgTAAgLgIg");
	this.shape_3.setTransform(9.3,1.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgiAoQgOgOAAgaQAAgcAQgOQAOgLASAAQAVAAAOAOQAOAOAAAYQAAATgGAMQgGALgMAHQgLAGgOAAQgVAAgNgOgAgVgdQgJAKAAATQAAAUAJAKQAJAKAMAAQANAAAJgKQAIgKAAgUQAAgTgIgKQgJgKgNAAQgMAAgJAKg");
	this.shape_4.setTransform(-1.2,1.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgIBHIAAiOIARAAIAACOg");
	this.shape_5.setTransform(-9,-0.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AghBAQgOgJgIgSQgHgRAAgUQAAgWAIgRQAJgRAQgJQAPgIASAAQAWAAAOALQAPALAGAUIgTAEQgFgPgJgIQgKgHgOAAQgQAAgLAIQgLAIgEANQgFANAAAOQAAASAGAOQAFAOALAGQALAHAMAAQAQgBALgIQALgKAEgRIATAEQgGAXgPAMQgQANgWAAQgWAAgPgKg");
	this.shape_6.setTransform(-18.3,-0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-28.6,-14.1,70,33.1);
p.frameBounds = [rect, rect, rect, rect];


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.608)").s().p("AmtDhIAAnBINbAAIAAHBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, rect = new cjs.Rectangle(-43,-22.5,86.1,45.1), [rect]);


(lib.yellowarrow_up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFB200").s().p("AhcAvIBchdIBdBdg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-9.2,-4.7,18.5,9.4);
p.frameBounds = [rect];


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this._txt = new cjs.Text("select", "16px 'Arial'");
	this._txt.name = "_txt";
	this._txt.lineHeight = 20;
	this._txt.lineWidth = 49;
	this._txt.parent = this;
	this._txt.setTransform(5.4,3.6);

	this.timeline.addTween(cjs.Tween.get(this._txt).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol6, rect = new cjs.Rectangle(3.4,1.6,53.1,21.9), [rect]);


(lib.customHit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660066").s().p("ApfD6IAAnzIS/AAIAAHzg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.customHit, rect = new cjs.Rectangle(-60.7,-25,121.5,50), [rect]);


(lib.up_arrow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.yellowarrow_up("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.9,0.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.451)").s().p("AiRA+IAAh7IEjAAIAAB7g");
	this.shape.setTransform(-0.7,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AifBLIgNAAIAAgWIAAhIIAAgRIAAgmIFZAAIAAAmIAAARIAAAvQgFAvg4AAg");
	this.shape_1.setTransform(0,7.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2A2A2A").s().p("AisBLIAAiWIANAAIEPAAQA4ABAFAuIAABng");
	this.shape_2.setTransform(0,-7.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AifCWIgNAAIAAkrIANAAIEPAAQA4AAAFAuIAADOQgFAvg4AAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-17.3,-15,34.6,30.1);
p.frameBounds = [rect, rect, rect, rect];


(lib.dropdown1_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// select
	this.select_mc = new lib.Symbol6();
	this.select_mc.parent = this;
	this.select_mc.setTransform(-0.3,0,1.007,1);

	this.timeline.addTween(cjs.Tween.get(this.select_mc).wait(1));

	// arrow
	this.arrow = new lib.up_arrow();
	this.arrow.parent = this;
	this.arrow.setTransform(80.4,12.4,1,0.8,0,180,0,0.1,0.1);
	new cjs.ButtonHelper(this.arrow, 0, 1, 2, false, new lib.up_arrow(), 3);

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(1));

	// custom hit
	this.customHitMc = new lib.customHit();
	this.customHitMc.parent = this;
	this.customHitMc.setTransform(50.4,12.9,1.289,0.996);
	this.customHitMc.alpha = 0.41;

	this.timeline.addTween(cjs.Tween.get(this.customHitMc).wait(1));

}).prototype = getMCSymbolPrototype(lib.dropdown1_mc, rect = new cjs.Rectangle(-27.9,-12,156.6,49.8), [rect]);


// stage content:
(lib.vl438_dd7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		stageMain = this;
		//Code to controll slider
		this.soundTrack = [];
		try
		{
			setTrackDetails(this.soundTrack);
		}
		catch(e){
		}
		
		//initialSetUp(this);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer 1
	this.close_btn = new lib.Symbol2();
	this.close_btn.parent = this;
	this.close_btn.setTransform(517.7,108.1);
	new cjs.ButtonHelper(this.close_btn, 0, 1, 2, false, new lib.Symbol2(), 3);

	this.show_btn = new lib.Symbol1();
	this.show_btn.parent = this;
	this.show_btn.setTransform(639.2,246.6);

	this.combo = new lib.dropdown1_mc();
	this.combo.parent = this;
	this.combo.setTransform(316.9,182.2,1,1,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.combo},{t:this.show_btn},{t:this.close_btn}]}).wait(1));

	// script
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("Eg+fAqCMAAAhUDMB8/AAAMAAABUDg");
	this.shape.setTransform(400,269);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(400,269,800,538);
p.frameBounds = [rect];
// library properties:
lib.properties = {
	width: 800,
	height: 538,
	fps: 12,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;