import { Posts } from "./../models/Posts";
import axios from "axios";
import { AppResponse } from "../models/Response";
import { Util } from "../Util";
import { Listings } from "../models/Listings";

export class PostsService {
  public static async getAllPosts(): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get`);
    return await axios.get<Posts, AppResponse<Posts>>(url);
  }
  public static async getPostsByPostId(
    postId: any
  ): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get/${postId}`);
    return await axios.get<Posts, AppResponse<Posts>>(url);
  }
  public static async getPostsByUserId(
    userId: any
  ): Promise<AppResponse<Posts>> {
    const url = Util.apiAuthUrl(`posts/get/posts/by/${userId}`);
    return await axios.get<Posts, AppResponse<Posts>>(url);
  }

  public static async putLike(
    postId: any,
    userId: any
  ): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/${postId}/like/${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url);
  }
  public static async putComment(
    postId: any,
    userId: any,
    data: any
  ): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/${postId}/comment/${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }
  public static async sendPost(
    data: Partial<any>,
    userId: any
  ): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`post/create?id=${userId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }
  public static async sendListing(
    data: Partial<any>
  ): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`listing/create`);
    return await axios.post<Partial<any>, AppResponse<any>>(url, data);
  }

  public static async getAllListings(): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`listings/get`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }
  public static async getOrganListings(): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`listings/organs/get`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }
  public static async getEquipmentListings(): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`listings/equipment/get`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }
  public static async getOtherListings(): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`listings/other/get`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }

  public static async getMyOrganListings(userId:any): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`my/listings/organs/get/${userId}`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }
  public static async getMyEquipmentListings(userId:any): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`my/listings/equipment/get/${userId}`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }
  public static async getMyOtherListings(userId:any): Promise<AppResponse<Listings>> {
    const url = Util.apiAuthUrl(`my/listings/other/get/${userId}`);
    return await axios.get<Listings, AppResponse<Listings>>(url);
  }

  public static async deletePostByAdmin(
    postId: any
  ): Promise<AppResponse<any>> {
    const url = Util.apiAuthUrl(`admin/post/delete/${postId}`);
    return await axios.post<Partial<any>, AppResponse<any>>(url, postId);
  }
}
