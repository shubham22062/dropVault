export type UploadStatus = 
 | "pending" |"uploading" |"completed"| "failed"|"cancelled";

 export interface UploadItem {
    id: string;
    file: File;
    name: string;
    size:number;

    progress: number;
    status :UploadStatus;

    totalChunks:number;
     error: string | null;
     
 }