import { Question } from "../page-question/question";

export interface QuestionResponse{
   
    id:number

    name:string,

    file_url:string,

    is_valid:boolean,

    percentage:number,

    question: Question
}