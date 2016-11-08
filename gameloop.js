var game_data={};
function game_update(){
	//alert("game_update");
	//if(camera.position.x < 200 )camera.position.x += 1;
	for(var i = 0; i < game_data.buildings.length; i++){
		//console.log(game_data.buildings[i].name);
		//console.log(game_data.buildings[i].owner);
		game_data.buildings[i].curUnit++;
		//console.log(game_data.buildings[i].curUnit);
	}
	//console.log("update");
}

function main_loop() {
	console.log("mainloop start");
	var timer = setInterval(game_update, 500);
}
