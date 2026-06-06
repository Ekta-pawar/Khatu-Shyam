const User = require("../../model/auth/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, phoneNumber } = req.body;

    // Validation
    if (!firstName || !lastName || !emailId || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // Check admin already exists
    const totalAdmin = await User.countDocuments({
      role: "admin",
    });

    if (totalAdmin >= 1) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Check existing email or phone
    const existingUser = await User.findOne({
      $or: [{ emailId }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      phoneNumber,
      role: "admin",
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        phoneNumber: user.phoneNumber,
        emailId: user.emailId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error During Admin registered",
    });
  }
};

// register user
exports.userRegister = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, phoneNumber } = req.body;

    // Validation
    if (!firstName || !lastName || !emailId || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // Existing User Check
    const existingUser = await User.findOne({
      $or: [{ emailId }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      phoneNumber,
      role: "authUser",
    });

    // JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error During User Register",
    });
  }
};

// Login Controller

exports.loginController = async (req, res) => {
  try {

    const { emailId, password } = req.body;

    // Validation
    if (!emailId || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    // Check user exists
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered. Please signup first",
      });
    }

    // Compare password
    const comparePassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Success Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error During Login",
      error: error.message,
    });
  }
};



