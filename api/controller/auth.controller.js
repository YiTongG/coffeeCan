import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username or email already in use" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("New user created:", newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if the username exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 2. Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" } // Token expires in 7 days
    );
    console.log(token)
    // 4. Send the token in a cookie
    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: "None", // Adjust based on your needs
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      })
      .status(200)
      .json(userInfo);

    console.log("User logged in:", userInfo);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure the same cookie options as when set
      sameSite: "None",
    })
    .status(200)
    .json({ message: "Logout successful" });
};
