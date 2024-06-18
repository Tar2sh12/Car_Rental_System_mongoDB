import { Car } from "../../../DB/models/Car.model.js";
import { ObjectId } from "mongodb";
export const addCar = async (req, res, next) => {
  try {
    const { name, model, rentalStat } = req.body;
    if (rentalStat != "available" && rentalStat != "rented") {
      return res.json({
        msg: "Rental status should be either available or rented ",
      });
    }
    const car = await Car.insertOne({ name, model, rentalStat });
    res.json(car);
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const specificCar = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findCar = await Car.findOne({ _id: new ObjectId(id) });
    if (findCar) {
      res.json({ findCar });
    } else {
      res.json({ msg: "there is no such a car" });
    }
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};
export const getAll = async (req, res, next) => {
  try {
    const findAll = await Car.find().toArray();
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

export const updateCar = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  let listOfKeys = Object.keys(req.body);
  try {
    const findCar = await Car.findOne({ _id: new ObjectId(id) });
    if (!findCar) {
      return res.json({ message: "Car not found" });
    }
    listOfKeys.forEach((e) => {
      if (e == "name" || e == "model" || e == "rentalStat") {
        findCar[e] = data[e];
      }
    });
    const updateCar = await Car.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: findCar.name,
          model: findCar.model,
          rentalStat: findCar.rentalStat,
        },
      }
    );
    res.json({ updateCar });
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

export const deleteCar = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCar = await Car.deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCar });
  } catch (error) {
    console.log("error");
    res.json("internal server error");
  }
};

//========================Special APIs========================
export const hondaAndToyota = async (req, res, next) => {
  const name1 = req.query.name1;
  const name2 = req.query.name2;
  const findHondaAndToyota = await Car.find({
    $or: [{ name: name1 }, { name: name2 }],
  }).toArray();
  res.json({ findHondaAndToyota });
};
export const rentedOrSpecificModel = async (req, res, next) => {
  const { model } = req.body;
  const rentedOrModel = await Car.find({
    $or: [{ rentalStat: "rented" }, { model: model }],
  }).toArray();
  res.json({ rentedOrModel });
};
export const rentalStatusWithModel= async (req, res, next) => {
    const { model ,rentalStat} = req.body;
    const rentalStatAndModel =await Car.find({model:model,rentalStat:rentalStat}).toArray();
    res.json({ rentalStatAndModel });
}
export const availableWithModel= async (req, res, next) => {
    const { model } = req.body;
    const availableWithSpecificModel =await Car.find({model:model,rentalStat:"available"}).toArray();
    res.json({ availableWithSpecificModel });
}