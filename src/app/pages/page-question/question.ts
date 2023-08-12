import { QuestionCategory } from "../page-question-category/question-category";
import { QuestionResponse } from "../page-question-response/question-response";

export interface Question{
    id:number,
    name:string,
    description:string,
    question_category:QuestionCategory
    question_response:QuestionResponse[]
}