import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { ProfileComponent } from './components/profile/profile.component';
import {NgFor} from '@angular/common';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {Sort} from '@angular/material/sort';
@NgModule({
  declarations: [
    ChangePasswordComponent,
    NavbarComponent,
    SidebarComponent,
    NotfoundComponent,
    TableComponent,
    HomeComponent,
    DeleteItemComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule,
    CdkDropList, NgFor, CdkDrag
  ],
  exports: [
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxDropzoneModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    NavbarComponent,
    SidebarComponent,
    MatSidenavModule,
    TableComponent,
    NgChartsModule,
    CdkDropList, NgFor, CdkDrag, MatSortModule
  ],
})
export class SharedModule {


}
