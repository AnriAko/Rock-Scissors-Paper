const {Game}=require('./game.js');


const args = process.argv.slice(2);

if (args.length<1 || args.length%2==0){
	console.log('Incorrect argument input. Please choose odd number which >=3');
}
else{
	let game = new Game(args);
	game.displayMenu();
}