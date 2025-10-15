export class Basket 
{
    BSK_ID: number;
    CUS_ID: number | null;
    NETTOTAL: number | null;
    CDATE: Date | null;
    VATRATE: number;
    VATTOTAL: number | null;
  
    constructor(
      BSK_ID: number,
      CUS_ID: number | null,
      NETTOTAL: number | null,
      CDATE: Date | null,
      VATRATE: number,
      VATTOTAL: number | null
    ) 
    {
      this.BSK_ID = BSK_ID;
      this.CUS_ID = CUS_ID;
      this.NETTOTAL = NETTOTAL;
      this.CDATE = CDATE;
      this.VATRATE = VATRATE;
      this.VATTOTAL = VATTOTAL;
    }
  }
  
  export default Basket;


