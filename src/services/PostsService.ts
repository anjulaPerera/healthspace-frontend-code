import { Posts } from './../models/Posts';
import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";

export class PostsService {
  public static async getAllPosts(): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get`);
    return await axios.get<Posts, AppResponse<Posts>>(url);
    }
  public static async getPostsByPostId(postId: any): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get/${postId}`);
    return await axios.get<Posts, AppResponse<Posts>>(url);
    }
  public static async getPostsByUserId(userId: any): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get/posts/by/${userId}`);
    return await axios.get<Posts, AppResponse<Posts>>(url);
    }
    
      public static async putLike(postId: any , userId: any): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/${postId}/like/${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url);
  }
      public static async putComment(postId: any , userId: any , data:any): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/${postId}/comment/${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }
      public static async sendPost(data:Partial<any>, userId:any): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/create?id=${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url,data);
  }

}
