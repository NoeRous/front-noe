import { Test } from "../page-test/test"

export interface TestGroup{
    id: number
    name: string
    description: string
    num_questions:number
    points_per_question:number
    sequence:number
    test:Test;
    test_group_question:any[]

}