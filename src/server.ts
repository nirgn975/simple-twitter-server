import * as mongoose from "mongoose";
import * as express from "express";
import * as chalk from "chalk";

import { App } from "./app";
import Seed from "./util/seed";
import Config from "./util/config";

/**
 * @class Server
 */
export class Server {
  public app: express.Application;
  public config: any;

  /**
   * @class Api
   * @constructor
   */
  constructor() {
    // Set handler for all unhandled exceptions.
    process.on("uncaughtException", (err) => {
      console.log("Unhandled exception: \n\t", err);
    });

    // Set handler for all unhandled promise rejections.
    process.on("unhandledRejection", (err) => {
      console.error("unhandled rejection: \n\t", err);
    });

    this.app = new App().app;
    this.config = new Config();
    this.connectMongoDB();
    this.configurExpress();
  }

  /**
   * Connect to MongoDB.
   *
   * @class Server
   * @method connectMongoDB
   * @return void
   */
  private async connectMongoDB() {
    await mongoose.connect(this.config.config.db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      promiseLibrary: global.Promise,
    } as mongoose.ConnectionOptions);

    await mongoose.connection.on("error", (error: any) => {
      console.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
      process.exit(1);
    });

    if (this.config.config.seed) {
      const seed = new Seed();
      seed.seeding();
    }
  }

  /**
   * Express configuration.
   *
   * @class Server
   * @method configurExpress
   * @return void
   */
  private configurExpress() {
    this.app.set("port", this.config.config.port);

    if (!module.parent) {
      this.app.listen(this.app.get("port"), () => {
        console.log(chalk.cyan(`✨ App is running at http://localhost:${this.app.get("port")} in ${this.app.get("env")} mode ✨`));
        console.log(chalk.red(`✨ Press CTRL-C to stop✨ \n`));
      });
    }
  }
}

// Export for testing
export default new Server;
