import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Role } from "src/roles/roles.enum";
import { Ill } from "./iller";

@Schema({ timestamps: true })
export class Doctor {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    image: string;

    @Prop({ type: String, enum: Role, default: Role.DOCTOR })
    role: Role;

    @Prop({ 
        type: [{ 
            patientId: { type: Types.ObjectId, ref: "Ill" },
            message: { type: String }
        }] 
    }) // List of waiting patients with messages
    waitingPatients: { patientId: Types.ObjectId; message: string }[];

    @Prop({ type: [{ type: Types.ObjectId, ref: "Ill" }] }) // List of accepted patients
    acceptedPatients: Types.ObjectId[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
