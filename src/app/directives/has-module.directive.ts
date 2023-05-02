import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  AdminRoleAndPermissionService,
  RoleModule,
} from '../services/admin-role-and-permission.service';

@Directive({
  selector: '[appHasModule]',
})
export class HasModuleDirective implements OnInit {
  @Input() appHasModule!: RoleModule | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    if (
      !this.appHasModule ||
      this._adminRoleAndPermissionSvc.GetUserPermittedRoleModules(
        this.appHasModule!
      )
    ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
