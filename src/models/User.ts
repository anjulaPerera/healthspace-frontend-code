import { PaymentState } from './../PaymentState';
import { Role } from "./Role";
import { Upload } from "./Upload";

export interface User {
  
  _id?: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: Role;
  userType:string;  
  socketId?: string;
  facebookId?: string;
  signedUpAs?: string;
  firebaseTokens?: string[];
  lastLoggedIn?: Date;
  photo?: Upload | string;
  packageBought: string;
  silverPaymentState: PaymentState;
  goldPaymentState: PaymentState;
  paymentLink?: string;
  requestedPackage?: string;
  paymentDetails?: PaymentDetails;
  silverPaymentLink?: string;
  goldPaymentLink?: string;
  profilePicture?: string;
  coverImage?: string;
  occupation?: string;
}

export interface UserData {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  socketId?: string;
 
}

export interface PaymentDetails {
  paymentReference: string;
  paymentConfirmeddate: Date;
  requestedPackage: string;
}
