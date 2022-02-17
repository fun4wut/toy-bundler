module.exports.test = 'B';
const modA = require('./a');
console.log( 'modB:', modA.test);
module.exports.test = 'BB';
