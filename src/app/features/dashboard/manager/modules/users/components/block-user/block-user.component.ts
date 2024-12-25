import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss'],
})
export class BlockUserComponent {
  constructor(
    public dialogRef: MatDialogRef<BlockUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IUser
  ) {}
}
