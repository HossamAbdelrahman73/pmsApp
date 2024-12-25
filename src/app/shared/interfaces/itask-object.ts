export interface ITaskObject {
  pageNumber: number;
  pageSize: number;
  data: Daum[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface Daum {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: Project;
  employee: any;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: Manager;
}

export interface Manager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: any;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
