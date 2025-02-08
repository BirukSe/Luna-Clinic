import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IllSchema } from 'src/schemas/iller';
import { JwtModule } from '@nestjs/jwt';
import { Doctor, DoctorSchema } from 'src/schemas/doctor';

@Module({
  imports: [MongooseModule.forFeature([{name: "Ill", schema: IllSchema}, {name: Doctor.name, schema: DoctorSchema}]),JwtModule.register({
    secret: 'MY_SECRET_KEY', // Change this to a real secret key
    signOptions: { expiresIn: '30d' },
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
