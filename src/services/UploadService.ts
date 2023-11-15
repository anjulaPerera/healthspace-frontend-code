import axios from "axios";
import { Util } from "../Util";
import { AppResponse } from "../models/Response";
import { Upload } from "../models/Upload";

export enum UploadCategory {
  PROFILE_PHOTO = "PROFILE_PHOTO",
  SECURE_SAFE = "SECURE_SAFE",
  VIRTUAL_ECOSYSTEM = "VIRTUAL_ECOSYSTEM",
  CHAT_UPLOAD = "CHAT_UPLOAD",
}

export class UploadService {
  public static async upload(
    fileToUpload: FileList,
    type: string,
    title: string,
    category: UploadCategory,
    users?: string[],
    signRequired?: boolean
  ): Promise<AppResponse<Upload[]>> {
    const ep = Util.apiAuthUrl(`multiple-upload/${category}`);
    const formData: FormData = new FormData();

    for (const file of fileToUpload) {
      formData.append("uploads", file);
    }

    formData.append("type", type);
    formData.append("title", title);
    if (signRequired) {
      formData.append("signRequired", String(signRequired));
    } else {
      formData.append("signRequired", "false");
    }
    for (const userss of users || []) {
      formData.append("users[]", userss);
    }

    return await axios.post<FormData, AppResponse<Upload[]>>(ep, formData);
  }

  public static async uploadAudio(
    fileToUpload: File,
    type: string,
    title: string,
    category: UploadCategory,
    users?: string[],
    extension?: string
  ): Promise<AppResponse<Upload[]>> {
    const ep = Util.apiAuthUrl(`multiple-upload/${category}`);
    const formData: FormData = new FormData();

    formData.append("uploads", fileToUpload);
    formData.append("extension", extension as any);

    formData.append("type", type);
    formData.append("title", title);

    for (const userss of users || []) {
      formData.append("users[]", userss);
    }

    return await axios.post<FormData, AppResponse<Upload[]>>(ep, formData);
  }

  public static async getVirtualEcoSystem(): Promise<AppResponse<Upload[]>> {
    const url = Util.apiAuthUrl("get-virtual-eco-system-collection");
    return await axios.get<Partial<Upload[]>, AppResponse<Upload[]>>(url);
  }

  public static async getSecureSafe(empId: string): Promise<AppResponse<Upload[]>> {
    const url = Util.apiAuthUrl("companyAdmin/get-employee-safe-collection/" + empId);
    return await axios.get<void, AppResponse<Upload[]>>(url);
  }

  public static async getSecureSafeEmployee(): Promise<AppResponse<Upload[]>> {
    const url = Util.apiAuthUrl("employee/get-employee-safe-collection");
    return await axios.get<void, AppResponse<Upload[]>>(url);
  }
  public static async removeFile(id: string): Promise<AppResponse<Upload>> {
    const url = Util.apiAuthUrl("upload/delete-file/" + id);
    return await axios.delete<void, AppResponse<Upload>>(url);
  }

  //view file
  public static async viewFile(fileId: string): Promise<AppResponse<Upload[]>> {
    const ep = Util.apiAuthUrl(`upload/viewfile`);

    return await axios.post<FormData, AppResponse<Upload[]>>(ep, { fileId: fileId });
  }
}
