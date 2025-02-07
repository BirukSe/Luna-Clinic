import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Request } from 'express';
import mongoose from 'mongoose';
import { Ill } from 'src/schemas/iller';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Ill.name)
    private AuthModel: mongoose.Model<Ill>,
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

}