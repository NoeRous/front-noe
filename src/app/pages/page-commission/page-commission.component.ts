import { Component } from '@angular/core';
import { CommissionService } from './commission.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';
import { Commission, CommissionInternal } from './commission';

@Component({
  selector: 'app-page-commission',
  templateUrl: './page-commission.component.html',
  styleUrls: ['./page-commission.component.scss']
})
export class PageCommissionComponent {
  commissionInternals: CommissionInternal[] = [];


  constructor(
    private commissionService: CommissionService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  loading: boolean = true;

  ngOnInit(): void {
    this.getCommissionPerson()
  }

  getCommissionPerson(): void {
    this.commissionService.getCommissionPerson()
      .subscribe(commissionInternals => (
        this.commissionInternals = commissionInternals,
        this.loading = false));
  }

  btnCommissionMembers(commission: Commission) {
    this.router.navigate(['/admin/commission/members', commission.id]);
  }

  btnCommissionAssigneds(commission: Commission) {
    this.router.navigate(['/admin/commission/assigneds', commission.id]);
  }
}
