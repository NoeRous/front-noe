import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TrackingService } from '../tracking.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-show-details-tracking',
  templateUrl: './page-show-details-tracking.component.html',
  styleUrls: ['./page-show-details-tracking.component.scss']
})
export class PageShowDetailsTrackingComponent {

  postulationId: any | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private trackingService: TrackingService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postulationId = params.get('postulationId');
    })
  }


  

}
