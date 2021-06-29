const crypto = require('crypto');
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');
  inputs = inputs
    .map((input) => JSON.stringify(input))
    .sort()
    .join(' ');
  hash.update(inputs);
  return hash.digest('hex');
};

module.exports = cryptoHash;
