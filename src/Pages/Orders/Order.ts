export class Order
{
    ORD_ID: number;
    CDATE: Date | null;
    ORDNO: string | null;
    TOTAL: number | null;
    PYMTYPE: string | null;
    CURRENCY: string | null;
    USR_ID: number | null;
  
    constructor(
      ORD_ID: number,
      CDATE: Date | null,
      ORDNO: string | null,
      TOTAL: number | null,
      PYMTYPE: string | null,
      CURRENCY: string | null,
      USR_ID: number | null
    ) {
      this.ORD_ID = ORD_ID;
      this.CDATE = CDATE;
      this.ORDNO = ORDNO;
      this.TOTAL = TOTAL;
      this.PYMTYPE = PYMTYPE;
      this.CURRENCY = CURRENCY;
      this.USR_ID = USR_ID;
    }
  }
  
  export default Order;