import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";

export class PublicService {

  public static async signUp(data: Partial<any>): Promise<AppResponse<any>> {
    const url = Util.apiPublicUrl("signup");
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }
  public static async verifyOtp(data: Partial<any>): Promise<AppResponse<any>> {
    const url = Util.apiPublicUrl("verify-otp");
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }
  
}
