import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ensureHourAndDateAreValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateToBeChecked = req.body.date;
  const dateToBeScheduled = new Date(dateToBeChecked);

  const hourToBeChecked = req.body.hour;

  if (hourToBeChecked < "08:00:00" || hourToBeChecked > "18:00:00") {
    throw new AppError(
      "The schedule must be done between 8 and 18 o'clock",
      400
    );
  }

  if (dateToBeScheduled.getDay() === 6 || dateToBeScheduled.getDay() === 0) {
    throw new AppError("The schedule must not be done in weekends", 400);
  }
  next();
};
export { ensureHourAndDateAreValid };

// (new Date()).toString().split(' ')

// end_date: (new Date()).toISOString().split('T')[0]

// const date = new Date('2022-12-29'); console.log(date.getDay() === 6 || date.getDay() === 0)

// const um = '10:20:00'; const two = '11:23:00'; console.log(um < two)
