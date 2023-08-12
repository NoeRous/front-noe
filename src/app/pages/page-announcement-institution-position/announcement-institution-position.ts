import { Announcement } from "../page-announcement/announcement";
import { InstitutionPosition } from "../page-institution-position/institution-position";

export interface AnnouncementInstitutionPosition {
    id:number;
    institutionPosition:InstitutionPosition;
    announcement:Announcement
}
