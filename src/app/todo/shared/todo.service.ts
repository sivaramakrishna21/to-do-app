import { Injectable } from '@angular/core';
import {AngularFireList,AngularFireDatabase} from 'angularfire2/database'


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList:AngularFireList<any>;

  constructor(private firebasedb:AngularFireDatabase) { }
  Gettodolist(){
    this.todoList=this.firebasedb.list('titles');
    return this.todoList;
  }

  addTitle(title:string,date:any){
    console.log("hii");
    console.log("lis=",this.todoList,"sasgv");
    if(title!=""){
    this.todoList.push({
      title:title,
      Date:date,
      checked:false
    });
  }
  }
  checkOrUncheckTitle($key:string,flag:boolean)
  {
    // console.log(flag);
    this.todoList.update($key,{checked:flag});
  }
  removeTitle($key:string)
  {
    this.todoList.remove($key);
  }

}
