import { AnnouncementInstitutionPosition } from "../page-announcement-institution-position/announcement-institution-position"
import { AnnouncementInstitutionPositionService } from "../page-announcement-institution-position/announcement-institution-position.service"
import { Person } from "../page-person/person"
import { Phase } from "../page-postulation/Postulation"

export interface CommissionInternal{
    id:number,
    name_role:string,
    commission:Commission,
    commissionHeadquarter:CommissionHeadquarter,
    person:Person
}

export interface CommissionExternal{
    id:number,
    name_role:string,
    commission:Commission,
    commissionHeadquarter:CommissionHeadquarter,
    representative:Representative
}

export interface Commission{
    id:number,
    name:string,
    date:Date,
    phase:Phase,
    commissionInternal:CommissionInternal[],
    commissionExternal:CommissionExternal[],
    commissionAssigned:CommissionAssigned[]
}

export interface CommissionHeadquarter{
    id:number,
    name:string,
    address:string
}

export interface Representative{
    id:number,
    firstname:string
}

export interface CommissionAssigned{
    id:number,
    act_init_date:Date,
    act_end_date:Date,
    announcementInstitutionPosition:AnnouncementInstitutionPosition
}