import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-interview-question',
  templateUrl: './add-interview-question.component.html',
  styleUrls: ['./add-interview-question.component.scss'],
})
export class AddInterviewQuestionComponent implements OnInit {
  formType = 'DEFAULT';

  InputTypeForm!: FormGroup;
  OptionsTypeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddInterviewQuestionComponent>,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildInputTypeForm();
    this.buildOptionsTypeForm();
  }

  buildInputTypeForm() {
    this.InputTypeForm = this._fb.group({
      question: ['', Validators.required],
    });
  }

  buildOptionsTypeForm() {
    this.OptionsTypeForm = this._fb.group({
      question: ['', Validators.required],
      options: this._fb.array([
        this._fb.control('', Validators.required),
        this._fb.control('', Validators.required),
      ]),
    });
  }

  get options() {
    return this.OptionsTypeForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this._fb.control('', Validators.required));
  }

  removeOption(index: number) {
    const optionsLength = this.options.length;
    if (optionsLength < 3) return;
    this.options.removeAt(index);
  }
}
