export interface Inbox{
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
  current_phase_name:string,
  is_valid:boolean,
  person_firts_name:string,
  person_second_name:string,
  person_last_name:string,
  person_mothers_last_name:string,
  person_husband_last_name:string,
  person_identity_card:string,
}

export interface PhaseSequence{

  
}