const AsciiTable = require('ascii-table')

class GameRulesTable {
	constructor(rules, args) {
		this.rules = rules;
		this.args = args;
		this.table = new AsciiTable('Game Rules');
		this.heading = ['v PC\\User >'];
		this.rows = [];
		this.generateTableBody();
		this.initTable();
	}
	generateTableBody() {
		for (let i = 0; i < this.args.length; i++) {
			this.heading.push(this.args[i]);
			this.rows.push([this.args[i]]);
			for (let j = 0; j < this.args.length; j++) {
				this.rows[i].push(this.formatWinLose(this.rules[i][j]));
			}
		}
	}

	initTable() {
		this.table.setHeading(this.heading);
		this.rows.forEach(row => {
			this.table.addRow(row);
		});
	}

	show() {
		console.log(this.table.toString());
	}

	formatWinLose(number) {
		switch (number) {
			case 1:
				return 'Win';
			case 0:
				return 'Draw';
			case -1:
				return 'Lose';
		}
	}
}
module.exports = { GameRulesTable };