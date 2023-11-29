import { Posts } from './../models/Posts';
import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";
import { User, UserData } from "../models/User";

export class PostsService {
  public static async getAllPosts(): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get`);
    return await axios.get<User, AppResponse<Posts>>(url);
    }
    
      public static async putLike(postId: any , userId: any): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/${postId}/like/${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url);
  }
      public static async sendPost(data:Partial<any>, userId:any): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/create?id=${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url,data);
  }

}
