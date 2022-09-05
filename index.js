
var container_selector = '#player_images';
var players_name= [
    'MJRD1524',
    'XAssassin321'
];

/**
Generate MC Players Avatars from UUID & append them to a HTML element by ID

@Todo:
- seperate URL generation from DOM manipultion.
*/
function generate_player_avatars(container_selector,player_name_id_object){
console.log(" ... starting to generate avatas.")
  player_name_id_object.forEach(function(player){

    let image_url = 'https://crafatar.com/renders/body/'+player.uuid;
    $(container_selector).append(`
      <div class="player_info">
      <h3>${player.name}</h3>
      <img src='${image_url}'/>
      </div>
    `);
  });

}

/**
Generate MC Player UUID from usernamne. 
WIP, Not Ready.
*/
async function get_player_uuid(player_name){
	 
     //console.log('get_player_uuid Start...');

	 let player_uuid_url = `https://playerdb.co/api/player/minecraft/${player_name}`;
     var player_uuid;
     let player_uuid_promise = $.get(player_uuid_url,

     	function(results){
        	console.log('player_uuid success function ' + results.data.player.id);
            //this.resolve(results.data.player.id)
            player_uuid = results.data.player.id;
            return results.data.player.id;
        })
        /*
		.always(function(results){
     		//console.log('player_uuid always function');
            //console.log(`Player Name is : ${player_name} : ${player_uuid_url}`);
            //console.log(results.data.player.id);
    	 })
     	.done(function(results){
     		console.log('done function ' + results.data.player.id);
            //players_uuid.push(results.data.player.id);
            //players_uuid[player_name] = results.data.player.id;
            return results.data.player.id;
    	 })
        .fail(function(results) {
    		console.log('player_uuid fail function');
 		 })
         */
        //.then(function(results){
     		//console.log('then function');
    	 //})
         
   
         await player_uuid_promise;
         return await player_uuid;
}

async function get_players_uuid(players_name_array){
  

  let players_uuid_promises = players_name_array.map(async (player_name)=>{
    return {
        name: player_name,
        uuid: await get_player_uuid(player_name)
    };
  });
  
    console.log('== players_uuid_promises');
 	console.log(players_uuid_promises.length);
	console.log(players_uuid_promises);

  return Promise.all(players_uuid_promises);
}


async function main(){
    console.log('1 - Main start ... ');
    console.log('2 - before player_name_id_array');
    let player_name_id_array = await get_players_uuid(players_name);
    console.log(player_name_id_array);
    
    generate_player_avatars('#player_images',player_name_id_array);
    console.log('99 - after player_name_id_array');
}

main();

/* /
let test1 = get_player_uuid('XAssassin321');
test1.then((results)=>{
console.log(results + ' test1');
})
//*/
