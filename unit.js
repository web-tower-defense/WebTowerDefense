function Pos(_x,_y,_z){
	this.x=_x;
	this.y=_y;
	this.z=_z;
}
Pos.prototype.mult=function(val){
	return new Pos(val*this.x,val*this.y,val*this.z);
}
Pos.prototype.add=function(val){
	return new Pos(val.x+this.x,val.y+this.y,val.z+this.z);
}
Pos.prototype.sub=function(val){
	return new Pos(this.x-val.x,this.y-val.y,this.z-val.z);
}
Pos.prototype.len=function(){
	return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
}
Pos.prototype.unit_vec=function(){
	var pos=new Pos(this.x,this.y,this.z);
	pos=pos.mult(1.0/this.len());
	return pos;
}	
function Unit(x,y,z,_owner,_target){
	this.die=false;
	this.owner = _owner;
	if(this.owner==0){
		this.mesh = createTextMesh("o");
	}else if(this.owner==1){
		this.mesh = createTextMesh("x");
	}else if(this.owner==2){
		this.mesh = createTextMesh("y");
	}	
	this.mesh.selectable = false;
	this.mesh.dynamic = true;
	scene.add(this.mesh);
	this.target=_target;
	this.pos=new Pos(x,y,z);
	this.target_pos=game_data.buildings[this.target].pos;
}
Unit.prototype.check_collision = function(){
		for(var i = 0; i < game_data.units.length; i++){
				if(game_data.units[i].owner!==this.owner){
					if(this.pos.sub(game_data.units[i].pos).len()<1.0){
						this.die=true;
						game_data.units[i].die=true;
					}
				}
		}	
}
Unit.prototype.update = function(){
	var del=this.target_pos.sub(this.pos);
	if(del.len()<3.0){
		this.die=true;
		//console.log("unit die");
		if(game_data.buildings[this.target].owner===this.owner){
			//console.log(game_data.buildings[this.target].owner+","+this.owner);
			game_data.buildings[this.target].curUnit++;
		}else{
			if(game_data.buildings[this.target].curUnit==0){
				game_data.buildings[this.target].owner=this.owner;
			}else{
				game_data.buildings[this.target].curUnit--;
			}
			
			
		}
	}else{
		//console.log("unit dis="+del.len());
	}
	this.pos=this.pos.add((del.unit_vec()).mult(1.2));
	this.check_collision();
	this.mesh.position.set(this.pos.x,this.pos.y,this.pos.z);
	//console.log("Unit.prototype.update pos="+this.pos.x.toString()+","+this.pos.y.toString()+","+this.pos.z.toString());
}
Unit.prototype.remove = function(){
	scene.remove(this.mesh);
}