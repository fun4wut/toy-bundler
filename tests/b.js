module.exports.test = 'B';
const modA = require('./a');
const _ = require('lodash');
console.log( 'modB:', modA.test);
console.log('dddd', _.add(1, 2));
module.exports.test = 'BB';
