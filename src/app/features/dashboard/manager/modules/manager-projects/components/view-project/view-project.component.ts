import { Component, Inject } from '@angular/core';
import { IProjectslist } from '../../interfaces/iproject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProjectslist,
  ) {
    // console.log(data);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
