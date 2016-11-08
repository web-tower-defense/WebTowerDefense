
var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};

var onError = function ( xhr ) { };

function loadBuilding(building, unitLen){

	var mtlLoader = new THREE.MTLLoader();

	mtlLoader.setPath( 'obj/my_castle/' );
	mtlLoader.load( 'castle.mtl', function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( 'obj/my_castle/' );
		objLoader.load( 'castle.obj', function ( object ) {
			//object.position.y = - 10;
			//object.scale.set(10,10,10);
			object.name = "root";
			//console.log("~name : " + object.name);
			//scene.add( object );

			console.log("building.positions.length : "+building.positions.length);

			for(var j = 0; j < building.positions.length; j++){
				var instance = object.clone();
				console.log("positions : "+building.positions[j]);
				instance.position.set( 
					building.positions[j][0]*unitLen,
					0,
					-building.positions[j][1]*unitLen
				);
				instance.unitID = building.unitIDs[j];
    			scene.add( instance );

    			var new_building = new Building();
    			new_building.mesh = instance;
    			new_building.unitID = instance.unitID;
    			new_building.curUnit = building.curUnits[j];
    			new_building.maxUnit = building.maxUnits[j];

    			var capacity_text = createTextMesh(new_building.curUnit.toString()+"/"+new_building.maxUnit.toString());
    			capacity_text.position.set( 
					building.positions[j][0]*unitLen,
					5,
					-building.positions[j][1]*unitLen
				);
				capacity_text.selectable = false;
				capacity_text.dynamic = true;
    			scene.add( capacity_text );

    			new_building.textMesh = capacity_text;
    			game_data.buildings.push(new_building);
			}

		}, onProgress, onError );
	});
}

function loadMap(file){

	$.getJSON(file, function(data) {
    	//console.log(data);
    	var unitLen = data.mapUnitLen;
    	var width = data.mapWidth;
    	var height = data.mapHeight;

    	var textureLoader = new THREE.TextureLoader();

		var geometry = new THREE.PlaneGeometry( width*unitLen, height*unitLen, width, height);
		geometry.faceVertexUvs[0] = [];
		for(var i = 0; i < geometry.faces.length; i++){
			geometry.faceVertexUvs[0].push([
				new THREE.Vector2( 0,0 ),
				new THREE.Vector2( 0,1 ),
				new THREE.Vector2( 1,1),    
			    new THREE.Vector2( 1,0),    
			]);
		}	
		geometry.computeFaceNormals();
        geometry.dynamic = true;
        geometry.uvsNeedUpdate = true;	
		var material = new THREE.MeshPhongMaterial( {
			map :textureLoader.load( "grass_green_d.jpg" ), 
			normalMap: textureLoader.load( "grass_green_n.jpg" ),
			side: THREE.DoubleSide
		});
		var plane = new THREE.Mesh( geometry, material );
		plane.rotation.x = Math.PI / 2;
		plane.position.y = -1;
		plane.position.x = width*unitLen/2;
		plane.position.z = -height*unitLen/2;
		scene.add( plane );
		game_data.buildings=[];
		
		for(var i = 0; i < data.buildings.length; i++){
			var building=new Building();
			building.id=data.buildings[i].id;
			building.name=data.buildings[i].name;
			building.owner=data.buildings[i].owner;
			//game_data.buildings.push(building);
			//console.log("game_data.buildings.push(building)");
		}
		/*for(var i = 0; i < data.paths.length; i++){
			console.log("path:"+data.paths[i][0]+","+data.paths[i][1]);
			game_data.buildings[data.paths[i][0]].path.push(data.paths[i][1]);
			game_data.buildings[data.paths[i][1]].path.push(data.paths[i][0]);
		}*/
		for(var i = 0; i < data.models.length; i++){
			data.models[i].positions = [];
			data.models[i].unitIDs = [];
			data.models[i].curUnits = [];
			data.models[i].maxUnits = [];
			for(var j = 0; j < data.buildings.length; j++){
				if(data.models[i].name === data.buildings[j].name){
					data.models[i].positions.push(data.buildings[j].position);
					data.models[i].unitIDs.push(data.buildings[j].id);
					data.models[i].curUnits.push(data.buildings[j].curUnit);
					data.models[i].maxUnits.push(data.buildings[j].maxUnit);
				}
			}
			loadBuilding(data.models[i], unitLen);
			
		}
	});

}