import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeoplesData, Person } from 'src/app/core/dummy-datas/peoples.data';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.scss']
})
export class RegisterMemberComponent implements OnInit {

  people: Person[] = [];
  selectedSearchPersonId: string = 'sdf';
  selectedPeople: any = null;
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.people = PeoplesData.peoples;
    this.createForm()
  }
  createForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      homeAddress: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{1,4}?[-.()\s]?([0-9]{1,3}[-.()\s]?){1,4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['single'],
      childrenStatus: ['no'],
      spouse: [null],
      children: [[]],
      spouseNotMember: [false],
      childrenNotMember: [false]
    });
  }
  submitForm(): void {
    console.log(this.registrationForm.value);
    if (this.registrationForm.valid) {
    } else {
      console.log('Form is invalid');
    }
  }
}
