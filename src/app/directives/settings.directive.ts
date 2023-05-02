import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  AdminRoleAndPermissionService,
  RoleModule,
} from '../services/admin-role-and-permission.service';

@Directive({
  selector: '[appSettings]',
})
export class SettingsDirective {
  // @Input() appSettings!: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    const {
      newRole: { RoleName },
    } = JSON.parse(localStorage.getItem('currentUserData') || '');

    if (!RoleName) {
      this.viewContainerRef.clear();
      return;
    }

    if (RoleName === 'Super admin') {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
