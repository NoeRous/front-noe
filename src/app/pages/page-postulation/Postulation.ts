export interface Postulation {
  id:number,
  voucher:string,
  voucher_url:string,
  applicant:object,
  created_at:Date
  announcement_name:string,
  institution_name:string,
  position_type_name:string
  position_name:string,
  postulation_state_name:string,
  current_phase_name:string
}


export interface Position {
  id:number,
  name: string
}

export interface Institution {
  id: number,
  name:string,
}

export interface PositionType {
  id: number,
  name:string,
}

export interface User {
  sub:number
}


export interface Phase {
  id:number,
  name:string,
  name_action:string,
  icon_action:string

}