export class DialogDataResp {
    public dataResp: any;
    public status: boolean;
   

    constructor(dataResp: any, status: boolean) {
        this.dataResp = dataResp;
        this.status = status;
      
    }
}
