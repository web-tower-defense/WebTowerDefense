
function Building(){
	this.owner = 0;
	this.unitID = -1;
	this.maxUnit = 1;
	this.curUnit = 0;
	this.growthSpeed = 1;
	this.mesh = 0;
	this.textMesh = 0;
	this.target=-1;
	this.pos=new Pos(0,0,0);
	this.path=[];
	this.prev_str="";
}
Building.prototype.update = function(){
	this.grow();
}
Building.prototype.grow = function(){
	if(this.curUnit < this.maxUnit){
		this.curUnit++;
		//this.textMesh.geometry = createTextGeo(this.curUnit.toString()+"/"+this.maxUnit.toString());
	}
}
Building.prototype.draw = function(){
	var cur_str="P"+this.owner+":"+this.curUnit.toString()+"/"+this.maxUnit.toString();

	if(cur_str!==this.prev_str){
		scene.remove(this.textMesh);
		this.prev_str=cur_str;
		this.textMesh = createTextMesh(this.prev_str);
		this.textMesh.selectable = false;
		this.textMesh.dynamic = true;
		//console.log("this pos="+this.pos.x+","+this.pos.y+","+this.pos.z);
		this.textMesh.position.set(
			this.pos.x,
			this.pos.y+5,
			this.pos.z
		);
		scene.add(this.textMesh);
	}	
	//this.textMesh.geometry = createTextGeo("P"+this.owner+":"+this.curUnit.toString()+"/"+this.maxUnit.toString());
}
Building.prototype.sent_unit = function(){
	if(this.curUnit>0&&this.target!==-1&&this.target!==this.unitID){
		this.curUnit--;
		var unit=new Unit(this.pos.x,this.pos.y,this.pos.z,this.owner,this.target);
		if(this.target>this.unitID){
			unit.a=this.target;
			unit.b=this.unitID;
		}else{
			unit.b=this.target;
			unit.a=this.unitID;
		}
		game_data.units.push(unit);
		//console.log("Building.prototype.sent_unit");
		//console.log("pos="+this.pos.x.toString()+","+this.pos.y.toString()+","+this.pos.z.toString());
	}else{
		//console.log("Building.prototype.sent_unit fail");
		//if(!(this.cur_Unit>0))console.log("this.cur_Unit<=0:"+this.curUnit.toString());
		//if((this.target===-1))console.log("target="+this.target.toString());
	}
}
