import { Question } from "../page-question/question";
import { TestGroup } from "../page-test-group/test-group";

export interface TestGroupQuestion {
    id:number;
    question:Question;
    test_group:TestGroup
}
