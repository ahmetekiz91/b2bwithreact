export class Basketline {
  ID: number;
  BASKID: number | null;
  CDATE: Date | null;
  AMOUNT: number | null;
  UNITPRICE: number | null;
  VATRATE: number | null;
  PROID: number | null;
  UNITID: number | null;
  private _GROSSTOTALPRICE: number | null;
/**  constructor(
    ID: number,
    BASKID: number | null,
    CDATE: Date | null,
    AMOUNT: number | null,
    UNITPRICE: number | null,
    VATRATE: number | null,
    PROID: number | null,
    UNITID: number | null,
  ) {
    this.ID = ID;
    this.BASKID = BASKID;
    this.CDATE = CDATE;
    this.AMOUNT = AMOUNT;
    this.UNITPRICE = UNITPRICE;
    this.VATRATE = VATRATE;
    this.PROID = PROID;
    this.UNITID = UNITID;
    this._GROSSTOTALPRICE = null; // Initialize to null initially
  } */
  constructor(
    transferobject: any
  ) {
    this.ID = transferobject.ID;
    this.BASKID = transferobject.BASKID;
    this.CDATE = transferobject.CDATE;
    this.AMOUNT = transferobject.AMOUNT;
    this.UNITPRICE = transferobject.UNITPRICE;
    this.VATRATE = transferobject.VATRATE;
    this.PROID = transferobject.PROID;
    this.UNITID = transferobject.UNITID;
    this._GROSSTOTALPRICE = null; // Initialize to null initially
  }

  public get GROSSTOTALPRICE(): number | null {
    return this.calculateGrossTotal();
  }
  public set GROSSTOTALPRICE(theres: number | null) {
    this._GROSSTOTALPRICE = theres;
  }

  public get NETTOTALPRICE(): number | null {
    return this.calculateNetTotalPrice();
  }

  public get VATPRICE(): number | null {
    return this.calculateVatPrice();
  }

  private calculateNetTotalPrice(): number  {
    return this.AMOUNT != null && this.UNITPRICE != null
      ? this.AMOUNT * this.UNITPRICE
      : 0.0;
  }

  private calculateGrossTotal(): number  {
    return this.calculateNetTotalPrice() + this.calculateVatPrice()
  
  }

  private calculateVatPrice(): number {
    return this.UNITPRICE != null && this.VATRATE != null&&this.AMOUNT!=null
      ? (this.UNITPRICE * this.VATRATE * this.AMOUNT) / 100
      : 0.0;
  }

  toJSON() {
    return {
      ID: this.ID,
      BASKID: this.BASKID,
      CDATE: this.CDATE,
      AMOUNT: this.AMOUNT,
      UNITPRICE: this.UNITPRICE,
      NETTOTALPRICE: this.calculateNetTotalPrice(),
      VATRATE: this.VATRATE,
      VATPRICE: this.calculateVatPrice(),
      PROID: this.PROID,
      UNITID: this.UNITID,
      GROSSTOTALPRICE: this.calculateGrossTotal(),
    };
  }
}

export default Basketline;
