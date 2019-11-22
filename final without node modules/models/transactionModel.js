const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({receipt: mongoose.Mixed});

let transaction = mongoose.model('transaction', transactionSchema);

exports.addTransaction = async (data) => {
  const insertData = new transaction;
  insertData.receipt = data;
  return await insertData.save();
}
