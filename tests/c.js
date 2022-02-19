const modA = require('./a');
const { join } = require('path');
const { prompt } = require('enquirer');


(async() => {
    const response = await prompt({
        type: 'input',
        name: 'username',
        message: 'What is your username?'
      });
      
      console.log(response); // { username: 'jonschlinkert' }
      
      console.log(join(modA.test, '2222'));
})()

