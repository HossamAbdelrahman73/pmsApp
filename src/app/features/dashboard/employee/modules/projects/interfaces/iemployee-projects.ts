export interface IemployeeProjects {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  employee: Employee;
}

export interface Employee {
  id: number;
  userName: string;
  imagePath: any;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
