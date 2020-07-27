import * as express from "express";
import * as chalk from "chalk";

import { App } from "./app";

/**
 * @class Server
 */
export class Server {
  public app: express.Application;

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
    this.configurExpress();
  }

  /**
   * Express configuration.
   *
   * @class Server
   * @method configurExpress
   * @return void
   */
  private configurExpress() {
    this.app.set("port", "8080");

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
