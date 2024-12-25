import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks service/tasks.service';
import { IUser } from '../../../users/interfaces/IUser';
import { IProject } from '../../../manager-projects/interfaces/iproject';
import { ITaskUsers } from '../../interfaces/itask-users';
import { ITaskProjects } from '../../interfaces/itask-projects';
import { ToastrService } from 'ngx-toastr';
import { Itasks } from '../../interfaces/itasks';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  id!: any;

  users: ITaskUsers[] = [];
  projects: ITaskProjects[] = [];
  userId: string = '';
  projectId: string = '';

  tasksForm: FormGroup = this._FormBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    projectId: ['', [Validators.required]],
    employeeId: ['', [Validators.required]],
  });

  constructor(
    private _FormBuilder: FormBuilder,
    private _TasksService: TasksService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  myparms = {
    pageSize: 1000,
    pageNumber: 1,
  };

  ngOnInit(): void {
    this.getId();
    if (this.id) {
      this.getTaskById();
    }
    this.getAllProjects(this.myparms);
    this.getAllUsers(this.myparms);
  }

  getId(): void {
    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        console.log('Updated ID:', +this.id);
      }
    });
  }
  getTaskById() {
    this._TasksService.getTaskById(this.id).subscribe({
      next: (res: any) => {
        this.tasksForm.patchValue(res);
        this.tasksForm.get('projectId')?.setValue(res?.project.id);
        this.tasksForm.get('employeeId')?.setValue(res?.employee.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllUsers(myparms: any) {
    this._TasksService.getUsers(myparms).subscribe({
      next: (res) => {
        // console.log(res);
        this.users = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllProjects(myparms: any) {
    this._TasksService.getProjects(myparms).subscribe({
      next: (res: any) => {
        this.projects = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendData() {
    if (!this.id) {
      this._TasksService.addTask(this.tasksForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          this._ToastrService.success('Added Task', 'Successfully');
          this._Router.navigate(['/dashboard/manager/tasks']);
        },
        error: (err) => {
          console.log(err);
          this._ToastrService.error(err.message, 'Error');
        },
      });
    } else {
      this._TasksService
        .updateTaskById(this.id, this.tasksForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._ToastrService.success('Edited Task', 'Successfully');
            this._Router.navigate(['/dashboard/manager/tasks']);
          },
          error: (err) => {
            console.log(err);
            this._ToastrService.error(err.message, 'Error');
          },
        });
    }
  }
}
