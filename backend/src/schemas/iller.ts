import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Role } from "src/roles/roles.enum";
import { Doctor } from "src/doctor/doctor.schema"; // Import Doctor schema

@Schema({ timestamps: true })
export class Ill {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    image: string;

    @Prop({ type: String, enum: Role, default: Role.PATIENT })
    role: Role;

    @Prop({ type: Types.ObjectId, ref: "Doctor" }) // Reference to Doctor
    assignedDoctor: Types.ObjectId;
}

export const IllSchema = SchemaFactory.createForClass(Ill);
