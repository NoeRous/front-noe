import { Announcement } from "../page-announcement/announcement";
import { Person } from "../page-person/person";
import { Institution } from "../page-postulation/Postulation";

export interface Employee{
    id:number,
    position:string,
    person:Person,
    employeeInstitution: EmployeeInstitution[]
}

export interface EmployeeInstitution{
    id:number,
    announcement:Announcement,
    institution:Institution
}