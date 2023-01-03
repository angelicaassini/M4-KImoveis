import * as yup from "yup";
import { SchemaOf } from "yup";
import { IScheduleRequest, IScheduleResponse } from "../interfaces/schedules";

const scheduleRequestSchema: SchemaOf<IScheduleRequest> = yup.object().shape({
  date: yup.string().required(),
  hour: yup.string().required(),
  userId: yup.string().optional(),
  propertyId: yup.string().required(),
});

const scheduleResponseSchema: SchemaOf<IScheduleResponse> = yup.object().shape({
  id: yup.string().required(),
  date: yup.string().required(),
  hour: yup.string().required(),
});

export { scheduleRequestSchema, scheduleResponseSchema };
