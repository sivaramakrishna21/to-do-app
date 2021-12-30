import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  todolistarray:any[];


  constructor(private todoservice:TodoService) {

  }

  ngOnInit(): void {
      // console.log(this.todoservice.Gettodolist().snapshotChanges());
    this.todoservice.Gettodolist().snapshotChanges().subscribe(
      item=>{
        this.todolistarray=[];
        item.forEach(element=>{
          var x=element.payload.toJSON();
        
          x['key']=element.key;
          this.todolistarray.push(x);
        })

        this.todolistarray.sort((a,b)=>{
          return a.checked-b.checked;
        })

      });
  }


  onAdd(itemTitle,date){
    this.todoservice.addTitle(itemTitle.value,date.value);
    itemTitle.value=null;
    date.value=null;
  }

  alterCheck(key:string,isChecked)
  {
    // console.log(isChecked);
    this.todoservice.checkOrUncheckTitle(key,!isChecked);
  }
  onDelete(key:string)
  {
    this.todoservice.removeTitle(key);
  }
}
