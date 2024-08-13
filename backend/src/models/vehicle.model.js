import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vehicleSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    assignedDriver: [
      {
        driverid: {
          type: String
        },
        starttime: {
          type: String,
          required: true,
        },
        endtime: {
          type: String,
          required: true,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

vehicleSchema.plugin(mongooseAggregatePaginate);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
