const { GameRules } = require('./gameRules');
const { GameRulesTable } = require('./gameRulesTable');
const { HMAC } = require('./gameHMAC');
const readlineSync = require("readline-sync");
const colors = require("colors");
class Game {
	constructor(args) {

		this.args = args;
		this.continue = true;

		this.hmacKey = new HMAC();

		this.hmacOriginMessage = `HMAC key: ${this.hmacKey.key}`.green;

		this.availableMovesMessage = this.#generateMovesMessage(this.args);

		this.gameRulesMatrix = new GameRules(this.args);

		this.gameRulesTable = new GameRulesTable(this.gameRulesMatrix.getRules(), this.args);

	}
	displayMenu() {
		while (this.continue) {
			this.makeMove();
			this.hmacUpdated = this.hmacKey.calculateHMAC(this.pcMove);
			this.hmacUpdatedMessage = `HMAC: ${this.hmacUpdated}`.green;
			console.log(this.hmacUpdatedMessage);
			console.log(this.availableMovesMessage);
			
			this.userMove = readlineSync.question(`Enter your move: `);
			if (this.#inputHandler()){continue};

			console.log(`Your move: ${this.args[this.userMove - 1]}`)
			this.#game();
		}
	}
	#game() {
		console.log(`Computer move: ${this.args[this.pcMove]}`)
		if (this.gameRulesMatrix.getRules()[this.pcMove][this.userMove - 1] == 1) {
			console.log("You win!".yellow);
			console.log(this.hmacOriginMessage);
		}
		else if(this.gameRulesMatrix.getRules()[this.pcMove][this.userMove - 1] == 0) {
			console.log("Draw!");
			console.log(this.hmacOriginMessage);
		}
		else if(this.gameRulesMatrix.getRules()[this.pcMove][this.userMove - 1] == -1){
			console.log("You lose!".red);
			console.log(this.hmacOriginMessage);
		}
		this.#toContinue();
		}

	#inputHandler() {
		if (this.userMove == '?') {
			return this.checkOnQuestion(this.userMove);
		}
		if (this.userMove == '0') {
			this.checkOnZero(this.userMove);
			return this.checkOnZero(this.userMove)
		}
		if(isNaN(this.userMove) || this.userMove=='' || this.userMove<1 || this.userMove>this.args.length){
			console.log(`Please choose number between 1 and ${this.args.length} \n`)
			return true;
		}

	}
	checkOnZero(number) {
		if (number == 0) {
			this.continue = false;
			return true;
		}
	}
	checkOnQuestion(number) {
		if (number === '?') {
			this.gameRulesTable.show();
			this.#toContinue();
			return true;
		}
	}
	makeMove() {
		let min = 0;
		let max = (this.args.length) - 1;
		this.pcMove = Math.floor(Math.random() * (max - min + 1)) + min;
	}
	#generateMovesMessage() {
		let movesMessage = `Available moves:\n`;
		this.args.forEach(function (element, i) {
			movesMessage += `${i+1} - ${element} \n`;
		});
		movesMessage += `0 - exit\n? - help`;
		return movesMessage;
	}
	#toContinue(){
		readlineSync.question('Press enter to continue...'.yellow);
		console.log('\n')
	}
}
module.exports = { Game };