import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HelperService } from '../../services/helper service/helper.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _HelperService: HelperService,
    private _AuthService: AuthService
  ) {}
  usersCount: number = 0;
  actvatedUsers: number = 0;
  deactvatedUsers: number = 0;
  totalUsers: number = 0;
  tasksCount: number = 0;
  tasksDone: number = 0;
  tasksToDo: number = 0;
  tasksInProgress: number = 0;
  totalTasks: number = 0;
  chart: any;
  userName: string = '';
  ngOnInit() {
    this.getUserChart();
    this.getTasksChart();
    this._HelperService.onGetCurrentUser().subscribe({
      next: (res) => {
        this.userName = res.userName;
      },
    });
  }

  isManager(): boolean {
    return this._AuthService.role === 'Manager';
  }
  getUserChart() {
    this._HelperService.OnGetUserCount().subscribe({
      next: (res) => {
        this.usersCount = res;
        this.totalUsers =
          res.activatedEmployeeCount + res.deactivatedEmployeeCount;
        this.actvatedUsers = res.activatedEmployeeCount;
        this.deactvatedUsers = res.deactivatedEmployeeCount;
      },
      error: (err) => {},
      complete: () => {
        this.chart = new Chart('userChart', {
          type: 'doughnut',
          data: {
            labels: ['activatedEmployeeCount', 'deactivatedEmployeeCount'],
            datasets: [
              {
                label: 'Count',
                data: [this.actvatedUsers, this.deactvatedUsers],
                backgroundColor: ['#315951e5', '#31595193'],
              },
            ],
          },
        });
      },
    });
  }
  getTasksChart() {
    this._HelperService.onTsksCount().subscribe({
      next: (res) => {
        this.tasksCount = res;
        this.totalTasks = res.done + res.toDo + res.inProgress;
        this.tasksDone = res.done;
        this.tasksToDo = res.toDo;
        this.tasksInProgress = res.inProgress;
      },
      error: (err) => {},
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
}
