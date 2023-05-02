import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-proof-of-expertise',
  templateUrl: './proof-of-expertise.component.html',
  styleUrls: ['./proof-of-expertise.component.scss'],
})
export class ProofOfExpertiseComponent implements OnInit {
  // proofOfExpertiseForm!: FormGroup;
  // label = '';
  // rawImg!: string;
  // imgUrl!: string;
  // uploadedFile: any;
  // isFile = false;
  // UserImage: any;
  constructor() // private _certificationSvc: CertificationService,
  // private _fb: FormBuilder
  {}

  ngOnInit(): void {
    // this.buildForm();
  }

  // buildForm() {
  //   this.proofOfExpertiseForm = this._fb.group({
  //     itemRows: this._fb.array([this.initItemRows()]),
  //     CV: '',
  //   });

  //   return this.proofOfExpertiseForm;
  // }

  // get formArray() {
  //   return this.proofOfExpertiseForm.get('itemRows') as FormArray;
  // }
  // initItemRows(): FormGroup {
  //   return this._fb.group({
  //     CertificateFile: ['', Validators.required],
  //   });
  // }

  // addNewRow() {
  //   this.formArray.push(this.initItemRows());
  // }
  // deleteRow(index: number) {
  //   this.formArray.removeAt(index);
  // }
}
