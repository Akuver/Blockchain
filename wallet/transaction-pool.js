const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }
  clear() {
    this.transactionMap = {};
  }
  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }
  setMap(transactionMap) {
    this.transactionMap = transactionMap;
  }
  existingTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);
    return transactions.find(
      (transaction) => transaction.input.address === inputAddress
    );
  }
  validTransactions() {
    const data = Object.values(this.transactionMap);
    let validTransactions = [];
    data.forEach((transaction) => {
      if (Transaction.validTransaction({ transaction }))
        validTransactions.push(transaction);
    });

    return validTransactions;
  }
  clearBlockchainTransactions({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      for (let transaction of block.data) {
        if (this.transactionMap[transaction.id]) {
          delete this.transactionMap[transaction.id];
        }
      }
    }
  }
}

module.exports = TransactionPool;
