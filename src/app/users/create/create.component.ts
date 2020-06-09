import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/data/users';
import { Router, ActivatedRoute } from "@angular/router";
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  Form: FormGroup;
  maxDate: any = new Date();
  item: any;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private users: Users, private router: Router) {
    console.log(route.snapshot.queryParams)
    this.item = {
      id:route.snapshot.queryParams.id || (this.users.userList.length+1),
      name: route.snapshot.queryParams.name || '',
      age: route.snapshot.queryParams.age || '',
      dob: new Date(route.snapshot.queryParams.dob) || '',
      place: route.snapshot.queryParams.place || '',
      Interests: route.snapshot.queryParams.Interests || '',

    };

    this.Form = this.fb.group({
      id:[this.item.id],
      name: [this.item.name, Validators.required],
      age: [this.item.age],
      dob: [this.item.dob, [Validators.required]],
      place: [this.item.place, [Validators.required,]],
      Interests: [this.item.Interests, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    let date = this.Form.value.dob;
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(date, format, locale);

    this.Form.patchValue({ dob: formattedDate });
    this.CalculateAge();
   
    if (this.item.hasOwnProperty('name') && this.item.name !='') {
      let index = this.users.userList.findIndex(element => element.id == this.item.id);
      this.item.name = this.Form.value.name;
      this.users.userList[index] = this.item;
      this.router.navigate(['list']);
    } else {

      this.users.userList.push(this.Form.value);
      this.router.navigate(['list']);
    }

  }


  public CalculateAge(): void {
    if (this.Form.value.dob) {
      var timeDiff = Math.abs(Date.now() - new Date(this.Form.value.dob).getTime());
      this.Form.patchValue({ age: Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25) });
    }
  }

}
