export interface IProject {
  title: string;
  description: string;
}

export interface IProjectslist {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  // manager: IManager;
  task: []
}

export interface IManager {
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
