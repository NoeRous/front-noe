import { Announcement } from "../page-announcement/announcement";
import { Position } from "../page-postulation/Postulation";

export interface Test{
    id:number,
    name: string,
    description: string,
    total_questions: number,
    is_ramdom: boolean,
    date_init: Date,
    date_end: Date,
    time: number,
    minimun_score: number,
    num_attemps: number,
    questions_per_page: number,
    announcement: Announcement,
    position: Position
}