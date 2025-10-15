import APIHelper from '../../components/APIHelper';
import { Basket } from '../Basket/Basket';
import {Basketline} from './BasketLine';

const api = new APIHelper();

class BasketRepository {


  public error: Error = new Error("Initial error message");

  constructor()
  {

  }

  //This method represents the basket of seletected customer from API 
  async getBasket(CUS_ID:any)
  {  
      try 
      {     
        const data = await api.get('baskets/'+CUS_ID);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      return null;      
  }
  
  async HandleBasketIdforCustomer(CUS_ID: any)
  {
    try 
    {
      //create basket_id for adding product 
      const rdata = await api.get('baskets/check_all_baskets/' + CUS_ID);
      if (rdata.length == 0) {

        var obj = new Basket(0, CUS_ID, 0.0, new Date(12, 12, 2003), 0.0, 0.0);
        const res = await api.post<Basket>("baskets", obj);
        return res;
      }
      else 
      {
        return rdata;
      }
    } catch (error) {
      console.log(error)
    }
    return null;
  }
  public async getbasketcount(CUS_ID: any)  {

    try {
      const response = await api.get('baskets/getbasketcount/' + CUS_ID)
      return parseInt(response.counts)||0

    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
   return 0;
  };

  async AddBasketline(basketline:Basketline)
  {
    try
    {

     const rdata=await api.post("basketlines",basketline);
     return true;
    } catch (error) {
      console.log(error)
    }
    return false;
  }
}
export default BasketRepository;