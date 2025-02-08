import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Request } from 'express';
import mongoose from 'mongoose';
import { Ill } from 'src/schemas/iller';
import * as bcrypt from 'bcrypt';
import { Doctor } from 'src/schemas/doctor';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Ill.name)
    private AuthModel: mongoose.Model<Ill>,
    private doctorModel: mongoose.Model<Doctor>,
    private jwtService: JwtService
   ) {}
   register(user:Ill){
    console.log("my user is", user);
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
        user.password = hashedPassword;
        return this.AuthModel.create(user);

   }
   async login(user:Ill){
    console.log(user);
    if(user.role=="patient"){
      const existingUser=await this.AuthModel.findOne({email:user.email}).exec()
      if(!existingUser){
        throw new Error('User not found');
      }
      if(existingUser.role==user.role){
        const isPasswordMatching=bcrypt.compareSync(user.password, existingUser.password);
        if(!isPasswordMatching){
          throw new UnauthorizedException;
        }
        const payload={email:existingUser.email, sub: existingUser._id, role: existingUser.role, name: existingUser?.name}
        const token=this.jwtService.sign(payload);
        return {token: token}
  
      }
      else{
        throw new UnauthorizedException;
      }

    }
    else if(user.role=="doctor"){
      const existingUser=await this.doctorModel.findOne({email:user.email}).exec()
      if(!existingUser){
        throw new Error('User not found');
      }
      if(existingUser.role==user.role){
        const isPasswordMatching=bcrypt.compareSync(user.password, existingUser.password);
        if(!isPasswordMatching){
          throw new UnauthorizedException;
        }
        const payload={email:existingUser.email, sub: existingUser._id, role: existingUser.role, name: existingUser?.name}
        const token=this.jwtService.sign(payload);
        return {token: token}
  
      }
      else{
        throw new UnauthorizedException;
      }
      
    }
   
    
   }
   async isthere(user){
    const existingUser=await this.AuthModel.findOne({email: user.email}).exec()
    if(!existingUser){
      throw new Error('User not found')
    }
    
    if(bcrypt.compareSync(user.password, existingUser.password)){
      return true;
    }
    throw new UnauthorizedException;
   }
   async appointment(appointmentData: { doctorEmail: string; patientId: string; message: string }) {
    const { doctorEmail, patientId, message } = appointmentData;
  
    // Find the doctor by email
    const doctor = await this.doctorModel.findOne({ email: doctorEmail }).exec();
    if (!doctor) {
      throw new Error("Doctor not found");
    }
  
    // Find the patient by ID
    const patient = await this.AuthModel.findById(patientId).exec();
    if (!patient) {
      throw new Error("Patient not found");
    }
  
    // Check if the patient is already in the waiting list
    const isAlreadyWaiting = doctor.waitingPatients.some(
      (entry) => entry.patientId.toString() === patientId
    );
    if (isAlreadyWaiting) {
      throw new Error("Patient is already in the waiting list");
    }
  
    // Add patient with message to the waiting list
    doctor.waitingPatients.push({ patientId: patient._id, message });
  
    // Save the updated doctor document
    await doctor.save();
  
    return { message: "Appointment request sent successfully" };
  }
  

}