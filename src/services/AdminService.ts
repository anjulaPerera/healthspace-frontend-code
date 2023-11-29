import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";
import { User, UserData } from "../models/User";

export class AdminService {
  public static async getUserDetails(
    tournament: any
  ): Promise<AppResponse<User>> {
    const url = Util.apiAuthUrl(`get/user`);
    return await axios.get<any, AppResponse<User>>(url);
  }
  public static async resetPassword({
    currentPassword,
    newPassword,
  }: any): Promise<AppResponse<User>> {
    const url = Util.apiAuthUrl(`reset/password`);
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };
    return await axios.post<any, AppResponse<User>>(url, data);
  }

  public static async getAllUserListByAdmin(
    limit: number,
    offset: number
  ): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`get/user-list/${limit}/${offset}`);
    return await axios.get<void, AppResponse<any>>(url);
  }
  public static async getEveryUserByAdmin(): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`get/every-user`);
    return await axios.get<void, AppResponse<any>>(url);
  }
  public static async getUserById(userId: any): Promise<AppResponse<User>> {
    const url = Util.apiAuthUrl(`get/user/${userId}`);
    return await axios.get<User, AppResponse<User>>(url);
  }
}
