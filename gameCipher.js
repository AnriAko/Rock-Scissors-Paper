const crypto = require('crypto');

class Cipher {
	constructor() {
		this.key = crypto.randomBytes(32).toString('hex');
	}
	calculateHMAC(move) {
		const hmac = crypto.createHmac('sha256', this.key);
		hmac.update(move.toString());
		return hmac.digest('hex');
	}
}
module.exports = { Cipher };