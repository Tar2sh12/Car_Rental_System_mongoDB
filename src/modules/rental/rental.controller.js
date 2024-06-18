import { Rental } from "../../../DB/models/Rental.model.js";
import { Car } from "../../../DB/models/Car.model.js";
import { User } from "../../../DB/models/User.model.js";
import { ObjectId } from "mongodb";

export const createRental = async (req, res, next) => {
  try {
    const { carRef, userRef, rentalDate, rentalReturn } = req.body;
    const findUser = await User.findOne({ _id: new ObjectId(userRef) });
    if (!findUser) {
      return res.json({ msg: "there is no such a user" });
    }
    const findCar = await Car.findOne({ _id: new ObjectId(carRef) });
    if (!findCar) {
      return res.json({ msg: "there is no such a car" });
    }
    if (findCar.rentalStat == "rented") {
      return res.json({ msg: "car is already rented" });
    }
    const from = new Date(rentalDate);
    const to = new Date(rentalReturn);
    const rental = await Rental.insertOne({
      carRef: new ObjectId(carRef),
      userRef: new ObjectId(userRef),
      rentalDate: from, //"<YYYY-mm-dd>"
      rentalReturn: to,
    });
    if (!rental) {
      return res.json({ msg: "error in inserting rental" });
    }
    const currentDate = new Date();
    if (currentDate > from && currentDate < to) {
      findCar.rentalStat = "rented";
      const updateCar = await Car.updateOne(
        { _id: new ObjectId(carRef) },
        {
          $set: {
            name: findCar.name,
            model: findCar.model,
            rentalStat: findCar.rentalStat,
          },
        }
      );
      return res.json({ message: "the car is now rented", rental });
    } else {
      return res.json(rental);
    }
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const updateRental = async (req, res, next) => {
  const { id } = req.params;
  const { carRef, userRef, rentalDate, rentalReturn } = req.body;
  try {
    const findRental = await Rental.findOne({ _id: new ObjectId(id) });
    if (!findRental) {
      return res.json({ msg: "there is no such a Rental" });
    }
    const findUser = await User.findOne({ _id: new ObjectId(userRef) });
    if (!findUser) {
      return res.json({ msg: "there is no such a user" });
    }
    const findCar = await Car.findOne({ _id: new ObjectId(carRef) });
    if (!findCar) {
      return res.json({ msg: "there is no such a car" });
    }
    const from = new Date(rentalDate);
    const to = new Date(rentalReturn);
    const updatedRental = await Rental.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          carRef: new ObjectId(carRef),
          userRef: new ObjectId(userRef),
          rentalDate: from, //"<YYYY-mm-dd>"
          rentalReturn: to,
        },
      }
    );
    return res.json({ updatedRental });
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const deleteRental = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findRental = await Rental.findOne({ _id: new ObjectId(id) });
    if (!findRental) {
      return res.json({ msg: "there is no such a Rental" });
    }
    const deletedRental = await Rental.deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedRental });
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const specificRental = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findRental = await Rental.findOne({ _id: new ObjectId(id) });
    if (findRental) {
      res.json({ findRental });
    } else {
      res.json({ msg: "there is no such a Rental" });
    }
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};
export const getAll = async (req, res, next) => {
  try {
    const findAll = await Rental.find().toArray();
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
