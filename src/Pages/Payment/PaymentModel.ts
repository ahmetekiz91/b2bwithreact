// PaymentModel.js

class PaymentModel
{
    PYMID:number;
    CDATE:Date;
    PYMDATE:Date;
    PRICE:number;
    CVV:number;
    CARDNUMBER:string;
    EXPYEAR:number;
    EXPMONTH:number;
    CARDNAME:string;
    BASKID:number;
    CUSRID:number;

    constructor(data:any) 
    {
      this.PYMID = data.PYMID;
      this.CDATE = data.CDATE;
      this.PYMDATE = data.PYMDATE;
      this.PRICE = data.PRICE;
      this.CVV = data.CVV;
      this.CARDNUMBER = data.CARDNUMBER;
      this.EXPYEAR = data.EXPYEAR;
      this.EXPMONTH = data.EXPMONTH;
      this.CARDNAME = data.CARDNAME;
      this.BASKID = data.BASKID;
      this.CUSRID = data.CUSRID;
    }

  }
  
  export default PaymentModel;
  