const User = require('../models/user');

const findUser = async() => {
    const user = User.find({ email: "anonymous@exammple.com"});
    return user;
}

const seedAnonymousUser = async () => {
    const user = await findUser();
    if(user.length > 0) {
        return console.log("Anonymous user already seeded")
    }
    const userDetails = {
        firstname: "anonymous", 
        lastname: "anonymous",
        email: "anonymous@exammple.com",
        password: "1234567890"
      }
    await User.create(userDetails);
    console.log("Anonymous user seeded");    
}
seedAnonymousUser();