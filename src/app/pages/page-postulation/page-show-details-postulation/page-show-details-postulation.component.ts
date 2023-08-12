import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostulationService } from '../postulation.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-page-show-details-postulation',
  templateUrl: './page-show-details-postulation.component.html',
  styleUrls: ['./page-show-details-postulation.component.scss']
})
export class PageShowDetailsPostulationComponent {

  postulationId: any | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postulationService: PostulationService,
    private router: Router,
    public dialog: MatDialog,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postulationId = params.get('id');
    })
  }


}
