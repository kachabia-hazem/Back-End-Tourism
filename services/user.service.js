const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

// User Service Functions
async function registerUser({ first_name, last_name, email, password, phone }) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
        });

        return newUser;
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            throw new Error("Email already exists!");
        } else {
            console.error("Error registering user:", err);
            throw new Error("An error occurred while registering user");
        }
    }
}



async function loginUser({ email, password }) {
  try {
    // Check if the user exists by email
    const user = await User.findOne({ email }); // Adjust the query if you're using Mongoose, as shown here.

    if (!user) {
      return { success: false, errorType: "email", message: "Invalid Email" };
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, errorType: "password", message: "Invalid Password" };
    }

    // Successful login
    return { success: true, user };
  } catch (err) {
    console.error("Error logging in user:", err);
    throw new Error("An error occurred while logging in");
  }
}


async function updateUser({ id, first_name, last_name, email, phone }) {
    try {
        const updatedUserCount = await User.update(
            { first_name, last_name, email, phone },
            { where: { id_user: id } }
        );

        if (updatedUserCount[0] === 0) {
            throw new Error("User not found!");
        }
    } catch (err) {
        console.error("Error updating user:", err);
        throw new Error("An error occurred while updating user");
    }
}

async function deleteUser({ id }) {
    try {
        const deletedUserCount = await User.destroy({ where: { id_user: id } });

        if (deletedUserCount === 0) {
            throw new Error("User not found!");
        }
    } catch (err) {
        console.error("Error deleting user:", err);
        throw new Error("An error occurred while deleting user");
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
};