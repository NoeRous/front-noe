import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommissionService } from '../commission.service';
import { MessageService } from 'src/app/message.service';
import { Commission, CommissionExternal, CommissionInternal } from '../commission';

@Component({
  selector: 'app-page-commission-members',
  templateUrl: './page-commission-members.component.html',
  styleUrls: ['./page-commission-members.component.scss']
})
export class PageCommissionMembersComponent {

  commissionId: any | undefined;
  commission: Commission | undefined;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commissionService: CommissionService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.commissionId = params.get('commissionId');
    });

    this.getCommision();
  }

  getCommision(): void {
    this.commissionService.getCommission(this.commissionId)
      .subscribe(commission => (
        this.commission = commission
        )); 
  }


}
