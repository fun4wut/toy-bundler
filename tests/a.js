module.exports.test = 'A';
const modB = require('./b');
console.log( 'modA:', modB.test);
module.exports.test = 'AA';