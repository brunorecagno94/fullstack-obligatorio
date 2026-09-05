import express from "express";
import routes from "./v1/v1.routes.js";
import notFoundMiddleware from "./v1/middlewares/notFound.middleware.js";

const app = express();app.use(express.json());app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);
app.use(notFoundMiddleware);
 
export default app;