export interface IUserTask {
  creationDate:string,
  description:string,
  employee:IUserData,
  id:number,
  modificationDate:string,
  project:IProjectData,
  status:string,
  title:string,
}
export interface IUserData {
  country:string,
  creationDate:string,
  email:string,
  id:number,
  imagePath:string,
  isActivated:boolean,
  modificationDate:string,
  password:string,
  userName:string,
  verificationCode:string,
  phoneNumber:string,
}
export interface IProjectData {
  id:number,
  title:string,
  description:string,
  creationDate:string,
  modificationDate:string,
}
