import * as dotenv from "dotenv";
import * as _ from "lodash";

/**
 * @class Config
 */
export default class Config {
  public config = {
    logging: false,
    seed: false,
    db: "",
    environment: "",
    port: process.env.PORT || 4000,
    tokenExpireTime: 60 * 60, // 1 hours (in seconds).
    refreshTokenLife: 60 * 60 * 24, // 24 hours (in seconds).
    secrets: {
      jwt: process.env.JWT || "SIMTWITT",
      refreshTokenSecret: process.env.REFRESHJWT || "RESIMTWITT",
    },
  };

  /**
   * @class Config
   * @constructor
   */
  constructor() {
    dotenv.config({ path: ".env" });
    const envConfig = this.configDB();
    this.config = _.merge(this.config, envConfig);
  }

  /**
   * Load testing or production environment variables.
   *
   * @class Config
   * @method configDB
   * @return config object
   */
  private configDB() {
    process.env.NODE_ENV = process.env.NODE_ENV || "dev";
    this.config.environment = process.env.NODE_ENV;
    return require(`./envs/${process.env.NODE_ENV}`);
  }
}
