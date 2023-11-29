import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";
import { User, UserData } from "../models/User";
import { Posts } from "../models/Posts";

export class PostsService {
  public static async getAllPosts(): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get`);
    return await axios.get<User, AppResponse<Posts>>(url);
    }
    
      public static async putLike(postId: any , userId: any): Promise<AppResponse<any>> {
    const url = Util.apiPublicUrl(`post/${postId}/like/${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url);
  }
}
