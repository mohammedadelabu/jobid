import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AdminRoleAndPermissionService, PermissionName, RoleModule } from '../services/admin-role-and-permission.service';

@Directive({
  selector: '[appFinancials]',
})
export class FinancialsDirective {
  @Input() appFinancials!: PermissionName;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    if (
      !this._adminRoleAndPermissionSvc.GetModulePermissions(
        RoleModule.FINANCIALS
      )
    ) {
      this.viewContainerRef.clear();
      return;
    }

    if (
      this._adminRoleAndPermissionSvc.GetModulePermissions(
        RoleModule.FINANCIALS
      )[this.appFinancials] === true
    ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
