export interface ITaskProjects {
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
}
