import * as _ from "lodash";
import * as chalk from "chalk";
import * as mongoose from "mongoose";

/**
 * @class Seed
 */
export default class Seed {

  /**
   * @class Seed
   * @constructor
   */
  constructor() {}

  /**
   * Seed the Database.
   *
   * @class Seed
   * @method seeding
   * @return void
   */
  public seeding() {
    console.log(chalk.yellow("💦 Cleaning the DB 💦"));
    this.cleanDB()
      .then(this.createUsers);

    console.log(chalk.yellow(`Seeded DB with`));
    console.log(chalk.yellow("🎉 Finish seeding the DB 🎉"));
  }

  /**
   * Clean all the database documents.
   *
   * @class Seed
   * @method cleanDB
   * @return promise
   */
  private cleanDB() {
    mongoose.connection.dropDatabase().catch((error: any) => {
      console.error("error dropping collections", error);
    });
    console.log(chalk.yellow("💪 Start seeding the DB 💪"));
    return new Promise((resolve) => { resolve(""); });
  }

  /**
   * Create fixtures for users.
   *
   * @class Seed
   * @method createUsers
   * @return promise
   */
  private createUsers(data) {
  }
}
