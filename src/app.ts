import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import "reflect-metadata";
import categoryRoutes from "./routes/category.routes";
import loginRoutes from "./routes/login.routes";
import scheduleRoutes from "./routes/schedule.routes";
import userRoutes from "./routes/user.routes";
import propertyRoutes from "./routes/property.routes";

const app = express();
app.use(express.json());

app.use("", userRoutes);
app.use("", loginRoutes);
app.use("", categoryRoutes);
app.use("", propertyRoutes);
app.use("", scheduleRoutes);

app.use(handleError);

export default app;
