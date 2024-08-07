import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async(req,res) =>{
  const {username,email,password} = req.body;
  //hash password to store
  const hashedPassword = await bcrypt.hash(password,10);
  console.log(hashedPassword);
  //prisma create using json 
  const newUser = await prisma.user.create({
    data:{
      username,
      email,
      password: hashedPassword,
    },
  })
  //hash the password

  console.log(req.body);
  res.status(201).json({messate:"User create successfully"});
}

export const login = async(req,res) =>{
  const{username,password} = req.body;

try{ 
  //1.check username
  const user = await prisma.user.findUnique({
    where:{username}
  })
  if(!user) return res.status(401).json({message:"Invaild credentials"});
  //2.check password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid Credentials!" });


  const age = 1000 * 60 * 60 * 24 * 7; //one week

  const token = jwt.sign(//header + payload + key(self+identify)
    {
      id: user.id,
      isAdmin: false,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: age }
  );

  const { password: userPassword, ...userInfo } = user;

  res
  .cookie("token", token, { //save information identify user, auto login=>session hash crypt =>jwt client and server identify
    httpOnly: true,
    // secure:true,
    maxAge: age,
  })
    .status(200)
    .json(userInfo);
    console.log(userInfo)
} catch (err) {
  console.log(err);
  res.status(500).json({ message: "Failed to login!" });
}
};

export const logout = (req, res) => {
res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};