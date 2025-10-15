export interface Order
{
    ORDLINEID:number;
    CDATE:Date |null;
    UDATE:Date |null;
    PRO_ID:number|null;
    AMOUNT:number|null;
    ORDNO:string|null;
    UNITPRICE:number|null;
    NETTOTAL:number|null;
    VATRATE:number|null;
    VATPRICE:number|null;
    GROSSTOTAL:number|null;
}
