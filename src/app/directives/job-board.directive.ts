import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  AdminRoleAndPermissionService,
  PermissionName,
  RoleModule,
} from '../services/admin-role-and-permission.service';

@Directive({
  selector: '[appJobBoard]',
})
export class JobBoardDirective {
  @Input() appJobBoard!: PermissionName;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    if (
      !this._adminRoleAndPermissionSvc.GetModulePermissions(RoleModule.JOB_BORD)
    ) {
      this.viewContainerRef.clear();
      return;
    }

    if (
      this._adminRoleAndPermissionSvc.GetModulePermissions(RoleModule.JOB_BORD)[
        this.appJobBoard
      ] === true
    ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
