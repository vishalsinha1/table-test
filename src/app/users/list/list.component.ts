import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/data/users';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  age: string;
  dob: string;
  place: string;
  Interests: string;
}



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'age', 'dob', 'place','Interests','action'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private users: Users,public router : Router) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.users.userList;
    this.dataSource.paginator = this.paginator;
  }

  edit(item){
    this.router.navigate(['/add'],  { queryParams: item});
  }

  delete(item){
    let i = this.users.userList.indexOf(item);
    console.log(i)
    //this will remove item from array
    this.users.userList.splice(i,1);
    this.dataSource.data = this.users.userList;
  }

}
