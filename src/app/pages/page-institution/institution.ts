import { InstitutionType } from "../page-institution-type/institution-type";

export interface Institution {
    id:number;
    t_par_institution_type:InstitutionType;
  //  institution: Institution;
    name: string;
    description:string;

}
