import { Component, Input, OnInit, Output } from '@angular/core';
import { Student } from '../model/models';
import { StudentService } from './service/student.service';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  cols: any[] = [];
  items: MenuItem[] = [];
  display: boolean = false;
  date: Date = new Date();
  selectedStudent: Student = {
    id:0,
    name: '',
    email: '',
    dob: this.date,
  };
  student: Student = {
    id:0,
    name: '',
    email: '',
    dob: this.date,
  };
  constructor(
    private studentService: StudentService,
    private messageService: MessageService
  ) {}
  showSaveDialog(editar: boolean) {
    console.log(editar, "editar");
    if (editar) {
      if(this.selectedStudent.id !== 0 && this.selectedStudent.id !== null){
        this.student = this.selectedStudent;
      
      }else{
        this.messageService.add({severity:'warn', summary: 'Advertence!', detail:'Please selected an Student'});
        return;
      }
     
   
    } else if(!editar) {
      this.student = new Student(0,'', '', this.date);
      
    }
    this.display = true;
    console.log('showSaveDialog called');
  }

  save() {
    this.studentService.save(this.student).subscribe(
      (result: any) => {
        let student = result as Student;
        this.students.push(student);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Student saved successfully',
        });
        this.display = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllStudents() {
    console.log('getAllStudents called');
    this.studentService.getAllStudents().subscribe(
      (result: any) => {
        let students1: Student[] = [];
        result.forEach((student: Student) => {
          students1.push(student);
        });
        this.students = students1;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log('getAllStudents finished');
  }

  ngOnInit() {
    this.getAllStudents();
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'dob', header: 'DoB' },
      { field: 'age', header: 'Age' },
    ];

    this.items = [
      {
        label: 'Novo',
        icon: 'pi pi-fw pi-plus-circle',
        command: () => this.showSaveDialog(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.showSaveDialog(true),
      },
    ];
  }
}
