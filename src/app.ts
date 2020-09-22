import * as cors from "cors";
import * as morgan from "morgan";
import * as express from "express";
import * as bodyParser from "body-parser";

import * as userRoutes from "./api/user/userRoutes";

const router: express.Router = express.Router();

/**
 * @class Api
 */
export class App {
  public app: express.Application;

  /**
   * @class App
   * @constructor
   */
  constructor() {
    this.app = express();
    this.configMiddleware();
    this.configureRoutes();
  }

  /**
   * Registr middlewares.
   *
   * @class App
   * @method configMiddleware
   * @return void
   */
  private configMiddleware() {
    this.app.use(cors());
    this.app.use(morgan("[:date[clf]] - :method :url :status :res[content-length] - :response-time ms ':user-agent'"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   * Registr routes.
   *
   * @class App
   * @method configureRoutes
   * @return void
   */
  private configureRoutes() {
    this.app.use("/user", userRoutes.default);
    this.app.use("/", (_, res) => res.send("app is working!!!"));
  }
}
