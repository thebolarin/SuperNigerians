const bcrypt = require('bcryptjs');
const User = require('../models/user');

const findUser = async () => {
    const user = User.find({ email: "anonymous@exammple.com" });
    return user;
}

const seedAnonymousUser = async () => {
    const user = await findUser();
    if (user.length > 0) {
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



const findAdminUser = async () => {
    const user = User.find({ email: "admin@example.com" });
    return user;
}

const seedAdminUser = async () => {
    const user = await findAdminUser();
    if (user.length > 0) {
        return console.log("Admin user already seeded")
    }
    const password = "@Aa12345678";
    const hashedPassword = bcrypt.hashSync(password, 8);
    const userDetails = {
        firstname: "Admin",
        lastname: "User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin"
    }

    await User.create(userDetails);
    console.log("Admin user seeded");
}
seedAnonymousUser();
seedAdminUser();