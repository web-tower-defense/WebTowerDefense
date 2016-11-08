
function Building(){
	this.owner = 0;
	this.unitID = -1;
	this.maxUnit = 1;
	this.curUnit = 0;
	this.growthSpeed = 1;
	this.mesh = 0;
}

Building.prototype.grow = function(){
	if(this.curUnit < this.maxUnit){
		this.curUnit++;
	}
}