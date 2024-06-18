import { User } from "../../../DB/models/User.model.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
export const addUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.json({ message: "Email already exist" });
    }
    let hashedPass = bcrypt.hashSync(password, 10);
    const user = await User.insertOne({ name, email, hashedPass, phone });
    res.json(user);
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
      return res.json({ message: "Email or Password is wrong" });
    }
    const enteredPassword = password;
    const storedHash = isEmailExist.hashedPass;
    if (bcrypt.compareSync(enteredPassword, storedHash)) {
      res.json({ msg: "logged in successfully" });
    } else {
      res.json({ msg: "Password or email is incorrect" });
    }
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const specificUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findUser = await User.findOne({ _id: new ObjectId(id) });
    if (findUser) {
      res.json({ findUser });
    } else {
      res.json({ msg: "there is no such a user" });
    }
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};
export const getAll = async (req, res, next) => {
  try {
    const findAll = await User.find().toArray();
    if (findAll) {
      res.json({ findAll });
    } else {
      res.json({ msg: "the db is empty" });
    }
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const updateUser = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  let listOfKeys = Object.keys(req.body);
  try {
    const findUser = await User.findOne({ _id: new ObjectId(id) });
    if (!findUser) {
      return res.json({ message: "User not found" });
    }
    listOfKeys.forEach((e) => {
      if (e == "name" || e == "email" || e == "phone") {
        findUser[e] = data[e];
      }
    });
    const updateUser = await User.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: findUser.name,
          email: findUser.email,
          phone: findUser.phone,
        },
      }
    );
    res.json({ updateUser });
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedUser });
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};
