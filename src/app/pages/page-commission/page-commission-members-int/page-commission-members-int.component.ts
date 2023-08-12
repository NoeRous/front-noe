import { Component, Input } from '@angular/core';
import { Commission, CommissionInternal } from '../commission';

@Component({
  selector: 'app-page-commission-members-int',
  templateUrl: './page-commission-members-int.component.html',
  styleUrls: ['./page-commission-members-int.component.scss']
})
export class PageCommissionMembersIntComponent {

  //@Input() commissionId: any | undefined;

  @Input() commission: Commission | undefined;

  commissionInternals: CommissionInternal[]= [];

  loading = true;

  ngOnInit(): void {
    console.log('a interno llega',this.commission)
    if(this.commission){
      this.commissionInternals = this.commission.commissionInternal
      this.loading = false
    }
   
   
  }
}
