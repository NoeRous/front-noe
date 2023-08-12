import { Person } from "../page-person/person";

export interface User {
    id:number;
    username:string;
    person:Person
    userRole:any;
    created_at:Date;

}
