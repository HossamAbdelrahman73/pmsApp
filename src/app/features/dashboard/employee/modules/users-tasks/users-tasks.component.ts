import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { UserTasksService } from './services/user-tasks.service';
import { IUserTask } from './interfaces/iuser-task';

@Component({
  selector: 'app-users-tasks',
  templateUrl: './users-tasks.component.html',
  styleUrls: ['./users-tasks.component.scss'],
})
export class UsersTasksComponent {
  constructor(private _UserTasksService: UserTasksService) {}
  taskList: IUserTask[] = [];
  taskListMoved: IUserTask[] = [];
  toDo: any = [];
  inProgress: any = [];
  done: any = [];
  ngOnInit(): void {
    this.getAllUserTasks();
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    let status = '';
    if (event.container.id === 'toDo') {
      status = 'ToDo';
    } else if (event.container.id === 'inProgress') {
      status = 'InProgress';
    } else if (event.container.id === 'done') {
      status = 'Done';
    }
    const movedTask = event.container.data[event.container.data.length-1];
    this.changeTaskStatus(movedTask.id, status);
  }
  getAllUserTasks() {
    let myParams = {
      title: '',
      status: '',
      pageSize: 1000,
      pageNumber: 1,
    };
    this._UserTasksService.onGetUserTasks(myParams).subscribe({
      next: (res) => {
        this.taskList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.toDo = this.taskList.filter((task) => task.status == 'ToDo');
        this.inProgress = this.taskList.filter(
          (task) => task.status == 'InProgress'
        );
        this.done = this.taskList.filter((task) => task.status == 'Done');
      },
    });
  }
  changeTaskStatus(taskId: number, taskStatus: any) {
    this._UserTasksService.onChangeStatusTask(taskId, taskStatus).subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err);
      },complete:()=> {
      }
    });
  }












  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done1 = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop1(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
