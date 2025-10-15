import APIHelper from '../../components/APIHelper';
import BasketRepository from '../Basket/BasketRepository';
import Config from '../../assets/Config';
import Product from '../Product/Product';
import Basketline from '../Basket/BasketLine';
const config = new Config();
const api = new APIHelper();
const basketRepository = new BasketRepository();


class OrderRepository {

  public error: Error = new Error("Initial error message");

  constructor() {
  }

  // //create basket id for customer
  // async providebasketidforcustomer(CUS_ID: any) {
  //   try {
  //     var r = await basketRepository.HandleBasketIdforCustomer(CUS_ID);
  //     return r; 
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  //this function fills the product array by provided data from API
  async getAllProduct(where: any) 
  {
    try {
      return await api.get('products/getAll/' + where)
    } catch (error) {
      console.log(error)
    }
  }



}

export default OrderRepository;