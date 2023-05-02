import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  AdminRoleAndPermissionService,
  PermissionName,
  RoleModule,
} from '../services/admin-role-and-permission.service';

@Directive({
  selector: '[appProjectManagement]',
})
export class ProjectManagementDirective {
  @Input() appProjectManagement!: PermissionName;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    if (
      !this._adminRoleAndPermissionSvc.GetModulePermissions(
        RoleModule.PROJECT_MANAGEMENT
      )
    ) {
      this.viewContainerRef.clear();
      return;
    }

    if (
      this._adminRoleAndPermissionSvc.GetModulePermissions(
        RoleModule.PROJECT_MANAGEMENT
      )[this.appProjectManagement] === true
    ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
