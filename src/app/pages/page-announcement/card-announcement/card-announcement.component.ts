import { Component, Input } from '@angular/core';
import { Announcement } from '../announcement';

@Component({
  selector: 'app-card-announcement',
  templateUrl: './card-announcement.component.html',
  styleUrls: ['./card-announcement.component.scss']
})
export class CardAnnouncementComponent {


  @Input() announcement: Announcement | undefined;
}
