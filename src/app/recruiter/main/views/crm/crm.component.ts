import { Component, OnInit } from '@angular/core';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { PATHS } from '../../nav';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
})
export class CrmComponent implements OnInit {
  View = PermissionName.View;

  constructor(private sbService: SidebarService) {}

  ngOnInit(): void {
    this.sbService.openSecondaryNav(PATHS.CRM);
  }
}
