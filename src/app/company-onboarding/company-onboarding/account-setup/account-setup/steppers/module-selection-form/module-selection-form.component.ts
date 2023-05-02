import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-module-selection-form',
  templateUrl: './module-selection-form.component.html',
  styleUrls: ['./module-selection-form.component.scss'],
})
export class ModuleSelectionFormComponent implements OnInit {
  @Output() onModuleSelectionDone = new EventEmitter();
  moduleList: any[] = [
    {
      title: 'Project',
      iconList: '../../../../../../../assets/images/icons/buildings.svg',
      isSelected: false,
    },
    {
      title: 'Candidate',
      iconList: '../../../../../../../assets/images/icons/profile-2user.svg',
      isSelected: false,
    },
    {
      title: 'Employee management',
      iconList: '../../../../../../../assets/images/icons/people.svg',
      isSelected: false,
    },
    {
      title: 'CRM',
      iconList: '../../../../../../../assets/images/icons/document-text.svg',
      isSelected: false,
    },
    {
      title: 'Event',
      iconList: '../../../../../../../assets/images/icons/calendar.svg',
      isSelected: false,
    },
    {
      title: 'Finance',
      iconList: '../../../../../../../assets/images/icons/wallet-money.svg',
      isSelected: false,
    },
    {
      title: 'Approval',
      iconList: '../../../../../../../assets/images/icons/buildings.svg',
      isSelected: false,
    },
    {
      title: 'Chat',
      iconList: '../../../../../../../assets/images/icons/messages.svg',
      isSelected: false,
    },
  ];
  ModuleSelectionForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    // this.buildForm();
  }

  buildForm() {
    this.ModuleSelectionForm = this._fb.group({
      Modules: [[], Validators.required],
    });
  }

  moduleSelectionDone() {
    this.onModuleSelectionDone.emit();
  }

  onSelect(item: any) {
    // console.log('item: ', item);
    console.group('moduleList: ', this.moduleList);
  }

  onSubmit() {
    // console.log('ModuleSelectionForm: ', this.ModuleSelectionForm.value);
    let modules = this.moduleList
      .filter((module: any) => module.isSelected == true)
      .map((module: any) => {
        return {
          moduleName: module.title,
          isSelected: true,
        };
      });
    console.group('modules: ', modules);
    if (modules.length < 1) {
      alert('Select a module!');
      return;
    } else {
      this.moduleSelectionDone();
      // sessionStorage.setItem('module_setup', JSON.stringify(modules));
    }
  }
}
