import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  AdminRoleAndPermissionService,
  PermissionName,
  RoleModule,
} from '../services/admin-role-and-permission.service';

@Directive({
  selector: '[appCompany]',
})
export class CompanyDirective {
  @Input() appCompany!: PermissionName;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    if (
      !this._adminRoleAndPermissionSvc.GetModulePermissions(RoleModule.COMPANY)
    ) {
      this.viewContainerRef.clear();
      return;
    }

    if (
      this._adminRoleAndPermissionSvc.GetModulePermissions(RoleModule.COMPANY)[
        this.appCompany
      ] === true
    ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
