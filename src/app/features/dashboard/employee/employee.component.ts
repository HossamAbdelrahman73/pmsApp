import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { HelperService } from 'src/app/shared/services/helper service/helper.service';
import { EmployeeService } from './services/employee service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  constructor(
    private _EmployeeService: EmployeeService,
    private _HelperService: HelperService
  ) {}
  userName: string = '';
  tasksToDo: number = 0;
  tasksInProgress: number = 0;
  tasksDone: number = 0;
  totaltasksCount: number = 0;
  totalProjectsCount: number = 0;
  chart: any;

  ngOnInit(): void {
    this.getCurrentUser();
    this.getTasksChart();
    this.getAllProjects();
  }
  getCurrentUser(): void {
    this._HelperService.onGetCurrentUser().subscribe({
      next: (res) => {
        this.userName = res.userName;
      },
    });
  }
  getTasksChart() {
    this._EmployeeService.onTasksCount().subscribe({
      next: (res) => {
        this.totaltasksCount = res.done + res.toDo + res.inProgress;
        this.tasksDone = res.done;
        this.tasksToDo = res.toDo;
        this.tasksInProgress = res.inProgress;
        this.totaltasksCount =
          this.tasksToDo + this.tasksInProgress + this.tasksDone;
      },
      error: (err) => {
      },
      complete: () => {
        this.chart = new Chart('taskChart', {
          type: 'doughnut',
          data: {
            labels: ['done', 'toDo', 'inProgress'],
            datasets: [
              {
                label: 'Count',
                data: [this.tasksDone, this.tasksToDo, this.tasksInProgress],
                backgroundColor: ['#315951e5', '#31595193', '#ef9b28'],
              },
            ],
          },
        });
      },
    });
  }

  getAllProjects(): void {
    let myParams = {
      title: '',
      pageSize: 1000,
      pageNumber: 1,
    };
    this._EmployeeService.onGetAllProjects(myParams).subscribe({
      next: (res) => {
        this.totalProjectsCount = res.data.length;
      },
    });
  }
}
