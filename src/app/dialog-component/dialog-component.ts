import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

 
@Component({
  selector: 'app-dialog-component',
  imports: [CommonModule,MatButtonModule],
  templateUrl: './dialog-component.html',
  styleUrl: './dialog-component.css',
})
export class DialogComponent {
   constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {}

  closeDialog() {
    this.dialogRef.close('Dialog Closed Successfully');
  }
}
