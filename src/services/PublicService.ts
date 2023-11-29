import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";
import { User } from "../models/User";

export class PublicService {

  public static async signUp(data: Partial<any>): Promise<AppResponse<any>> {
    const url = Util.apiPublicUrl("signup");
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }
  public static async verifyOtp(data: Partial<any>): Promise<AppResponse<any>> {
    const url = Util.apiPublicUrl("verify-otp");
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }

  public static async getLoggedInUser(): Promise<AppResponse<User>> {
    const url = Util.apiAuthUrl("get/user");
     return await axios.get<User, AppResponse<User>>(url);
  }
  
}
