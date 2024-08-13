import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const driverSchema  = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true, 
        },
        phone: {
          type: String,
          required: true,
          unique: true,
        },
        vehicleAssigned:[ {
          vehicleid: {
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
        }]
      },
      {
        timestamps: true,
      }
);

driverSchema.plugin(mongooseAggregatePaginate);

export const Driver = mongoose.model("Driver", driverSchema);
