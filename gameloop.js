var game_data={};
function game_update(){
	//alert("game_update");
	//if(camera.position.x < 200 )camera.position.x += 1;
	for(var i = 0; i < game_data.buildings.length; i++){
		//console.log(game_data.buildings[i].name);
		//console.log(game_data.buildings[i].owner);
		if(i==1&&game_data.units.length<=2){
			game_data.buildings[1].target=0;
			game_data.buildings[1].sent_unit();
		}
		game_data.buildings[i].update();
		//console.log("building "+game_data.buildings[i].unitID+" unit : "+game_data.buildings[i].curUnit);
	}
	for(var i = 0; i < game_data.units.length; i++){
		game_data.units[i].update();
		if(game_data.units[i].die==true){
			game_data.units[i].remove();
			game_data.units[i]=game_data.units[game_data.units.length-1];
			game_data.units.pop();
			if(i < game_data.units.length)game_data.units[i].update();
		}
		
	}
	for(var i = 0; i < game_data.units.length; i++){
		
	}	
	//console.log("update");
}
function game_init(){
	game_data.units=[];
	game_data.buildings=[];
}
function main_loop() {
	console.log("mainloop start");
	game_init();
	var timer = setInterval(game_update, 500);
}
