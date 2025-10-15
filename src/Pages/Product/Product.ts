class Product {
  public PRO_ID: number;
  public PRONAME: string;
  public PRICE: number;
  public UNIT: string;
  public CATID: number | null;
  public CUSRID: number | null;
  public UDATE: Date | null;
  public UUSRID: number | null;
  public CATNAME: string;
  public VATRATE: number;
  constructor(
    PRO_ID: number,
    PRONAME: string,
    PRICE: number,
    UNIT: string,
    CATID: number | null,
    CUSRID: number | null,
    UDATE: Date | null,
    UUSRID: number | null,
    CATNAME: string,
    VATRATE:number
  ) {
    this.PRO_ID = PRO_ID;
    this.PRONAME = PRONAME;
    this.PRICE = PRICE;
    this.UNIT = UNIT;
    this.CATID = CATID;
    this.CUSRID = CUSRID;
    this.UDATE = UDATE;
    this.UUSRID = UUSRID;
    this.CATNAME = CATNAME;
    this.VATRATE = VATRATE;
  }
}
export default Product;