import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/models';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
baseUrl:string = 'http://localhost:8080/api/v1/students';

  constructor(private http:HttpClient) { 
  }

  getAllStudents(): Observable<any>{
      return this.http.get(this.baseUrl)
  }

  save(student:Student):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json'); 
    return this.http.post(this.baseUrl, JSON.stringify(student), {headers:headers});
  }

  edit(id:number, student:Student):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json'); 
    return this.http.put(this.baseUrl+'/'+id, JSON.stringify(student), {headers:headers});
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+'/'+id);
  }
}
