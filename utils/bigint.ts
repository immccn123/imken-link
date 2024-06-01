interface BigInt {
	toNumber(): number;
}

BigInt.prototype.toNumber = function () {
	return parseInt(this.toString());
};
