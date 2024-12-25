import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee service/employee.service';
import { IemployeeProjects } from './interfaces/iemployee-projects';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private _EmployeeService: EmployeeService) {}

  displayedColumns: string[] = [
    'title',
    'description',
    'modificationDate',
    'Num Tasks',
    'creationDate',
  ];

  dataSource!: IemployeeProjects[];
  moduleName: string = 'projects';
  numRows!: number;
  pageSize: number = 5;
  pageNumber: number = 1;
  searchName: string = '';
  ngOnInit(): void {
    this.getProjects();
  }
  getProjects() {
    let myParms = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      title: this.searchName,
    };

    this._EmployeeService.onGetAllProjects(myParms).subscribe({
      next: (res) => {
        this.dataSource = res.data;
        this.numRows = res.data.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;
    this.getProjects();
  }
}
