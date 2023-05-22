import { File } from "../models/file";
import { UploadedFile } from "../models/uploadedFile"

export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>;
}