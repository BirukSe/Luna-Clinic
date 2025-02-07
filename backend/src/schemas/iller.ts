import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Role } from "src/roles/roles.enum";
@Schema({timestamps: true})
export class Ill{
    @Prop()
    name: string
    @Prop()
    email: string
    @Prop()
    password: string
    @Prop()
    image: string
    @Prop({ type: String, enum: Role, default: Role.PATIENT })
    role: Role;
 

}
export const IllSchema=SchemaFactory.createForClass(Ill);