import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProjectslist } from 'src/app/features/dashboard/manager/modules/manager-projects/interfaces/iproject';
import { Itasks } from 'src/app/features/dashboard/manager/modules/tasks/interfaces/itasks';
import { TasksService } from 'src/app/features/dashboard/manager/modules/tasks/services/tasks service/tasks.service';
import { BlockUserComponent } from 'src/app/features/dashboard/manager/modules/users/components/block-user/block-user.component';
import { IUser } from 'src/app/features/dashboard/manager/modules/users/interfaces/IUser';
export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() actions: any[] = [];
  @Input() moduleName: string = '';
  @Input() numRows!: number;
  @Output() userViewed = new EventEmitter<any>();
  @Output() editId = new EventEmitter<any>();
  @Output() projectViewed = new EventEmitter<any>();
  @Output() DeletedItem = new EventEmitter<any>();
  @Output() projectEdited = new EventEmitter<any>();
  @Output() userBlocked = new EventEmitter<any>();
  @Output() viewedTask = new EventEmitter<any>();
  data: any = '';
  sortedData: any[] = [];
  displayedColumns1 : string[] = []
  constructor(private _TasksService: TasksService, private dialog: MatDialog) {
    this.sortedData = this.dataSource;
    console.log(this.sortedData);
    console.log(this.dataSource);
  }

  onViewTask(task: Itasks) {
    this.viewedTask.emit(task);
    console.log(task);
  }
  onEditTask(task: Itasks) {
    this.editId.emit(task.id);
  }

  deleteItem(data: any) {
    console.log(data);
    this.DeletedItem.emit(data);
  }
  viewUser(user: IUser): void {
    this.userViewed.emit(user);
  }
  toggleBlock(user: IUser): void {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userBlocked.emit(user);
      }
    });
  }
  blockUser(user: IUser): void {
    user.isActivated = false;
    this.userBlocked.emit(user);
  }

  unblockUser(user: IUser): void {
    user.isActivated = true;
    this.userBlocked.emit(user);
  }

  viewProject(project: IProjectslist): void {
    this.projectViewed.emit(project);
  }

  editProject(project: IProjectslist): void {
    this.projectEdited.emit(project);
  }
sortData(sort: Sort) {
    const data = this.dataSource
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'userName':
          return compare(a.userName, b.userName, isAsc);
        case 'project':
          return compare(a.project, b.project, isAsc);
        case 'creationDate':
          return compare(a.creationDate, b.creationDate, isAsc);
          case 'description':
          return compare(a.description, b.description, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
