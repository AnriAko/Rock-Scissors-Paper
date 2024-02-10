class GameRules {
    constructor(elements) {
        this.rules = [];
        this.n = elements.length;
        this.p = Math.round(this.n / 2 - 0.1);
		this.setRules();
    }
    setRules() {
        for (let i = 0; i < this.n; i++) { 
            let ruleForObject = [];
            for (let j = 0; j < this.n; j++) { 
                ruleForObject.push(Math.sign((i - j + this.p + this.n) % this.n - this.p));
            }
            this.rules.push(ruleForObject);
        }
    }

	getRules(){
		return this.rules;
	}
}

module.exports = { GameRules };