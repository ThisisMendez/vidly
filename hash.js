// playground file
const bcrypt = require('bcrypt'); 

async function run() { 
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt); 
    console.log(hashed); 
}

run();


// The argument we set the number of rounds you want to generate the salt 
// The salt and hashed are included both because later when you want to authenticate the user you want to validate the username and password

// 1234 -> abcd 

