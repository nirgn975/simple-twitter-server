import * as bcrypt from "bcrypt";
import { NextFunction } from "express";
import { Document, Schema, model } from "mongoose";

export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
  active: boolean;
  password: string;
  createdAt: Date;
  country: string;
  website: string;
  birthday: Date;
}

const schema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  country: {
    type: String,
  },
  website: {
    type: String,
  },
  birthday: {
    type: Date,
  },
}, { timestamps: true });

/**
 * Password hash middleware.
 */
schema.pre("save", function(next: NextFunction) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

export const User = model<IUserModel>("user", schema, "users", true);

schema.methods.comparePassword = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
