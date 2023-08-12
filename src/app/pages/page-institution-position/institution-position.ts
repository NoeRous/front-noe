import { Institution } from "../page-institution/institution";
import {  Position } from "../page-postulation/Postulation";

export interface InstitutionPosition {

    id:number;
    position: Position;
    institution:Institution;
    enabled: boolean;
}
