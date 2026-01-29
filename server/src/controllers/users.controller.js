import prisma from "../lib/prisma.ts";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { userName, firstName, lastName, middleName, email, password } = req.body;

    // Validation
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, and email are required.",
      });
    }

    if (!password || password.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Check if user already exists by email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    // Check if user already exists by userName
    const existingUserByUsername = await prisma.user.findUnique({
      where: { userName: userName },
    });

    if (existingUserByEmail || existingUserByUsername) {
      return res.status(409).json({
        success: false,
        message: "User with this email or username already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user - use lowercase 'user' and match field names exactly
    const newUser = await prisma.user.create({
      data: {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        email: email,
        password: hashedPassword, // Schema field is 'password'
      },
    });

    if(!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user.",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        userName: newUser.userName,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        middleName: newUser.middleName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const displayUserbyId = async (req,res) => {
  try{
    const {id} = req.params;

    const user = await prisma.user.findUnique({
      where: {
         id: parseInt(id) 
      },
      select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        middleName: true,
        email: true,
      },
    });

    if (!user){
      return res.status(404).json({
        success: false,
        message : "User with this id is not found!",
      });
    };

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
      },
    });
  }catch(error){
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });

  }
};