import { ISiwes } from "models"
import { model, Model, Schema } from "mongoose"
import internBase from "./internBase"

type UserModel = Model<ISiwes, {}>

const siwesSchema = new Schema<ISiwes, UserModel>({
    schoolID: { type: String, required: [true, "schoolID is required"] },
    schoolContact: { type: String, required: [true, "schoolContact is required"] }
})


export default model("Siwes", siwesSchema.add(internBase))