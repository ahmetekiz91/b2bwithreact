import React, { useState, useEffect } from 'react';
import { Category } from '../Category/Category';
import  Product  from '../Product/Product';
import APIHelper from '../../components/APIHelper';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCount } from './CountContext';
import OrderRepository from './OrderRepository';
import BasketRepository from '../Basket/BasketRepository';
import Basketline from '../Basket/BasketLine';
import Badge from 'react-bootstrap/Badge';
const api = new APIHelper();

const Orders: React.FC = () => {
  const {count, updateCount } = useCount();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{[key: string]: boolean}>({});
  const [checkedItems, setCheckedItems] = useState({});
  const repository=new OrderRepository();

  const [myArray, setMyArray] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        //fill productobject in the UseEffect method
        const productArray = await repository.getAllProduct("0");
        setProducts(productArray);
        
        const data = await api.get('categories/');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
    
 //this code removes the unchekced item from the checked items.
  function removeItemAll(arr:any, value:any) 
  {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
  //this code investigate product depends on selected checkboxs 
  const handleChange = async (event:any) =>
  {
    const { name, checked, value } = event.target;
    setCheckedItems({ ...checkedItems, [name]: { checked, value } });    
    if(checked===true){
      myArray.push(value)
    }else{
      removeItemAll(myArray,value);
    }
    var stringset="0";
    for (let i = 0; i < myArray.length; i++) {
      stringset+=myArray[i]+","
     } 
   
     const productArray = await repository.getAllProduct(stringset);
     setProducts(productArray);
  };

  //this code handle to add product into basket table
  const AddtoBasket= async(item: any) => 
  {
    const jsonstring = localStorage.getItem('usr_obj');
    const user = jsonstring ? JSON.parse(jsonstring) : '';
    
    //Un-commented code for Basketline object creation
    const product = item; // Assuming 'item' contains product details
    const AMOUNT = 1.0;
    const UNITPRICE = product.PRICE;
    const VATRATE = product.VATRATE;
    const UNITID = 1;
    const PROID = product.PRO_ID;
 
  
    // Assuming BasketRepository is responsible for handling basket-related operations
    const repository = new BasketRepository();
    try
     {
      // Assuming HandleBasketIdforCustomer is an async function that fetches basket ID for a customer
      const res = await repository.HandleBasketIdforCustomer(user.CUS_ID);
      if(res.length>0){
      
        let obj: any = {};
        obj.ID = 0;
        obj.BASKID = res[0].BSK_ID;
        obj.CDATE = new Date();
        obj.AMOUNT = AMOUNT;
        obj.UNITPRICE = UNITPRICE;
        obj.VATRATE = VATRATE;
        obj.PROID = PROID;
        obj.UNITID = UNITID;
        var bl = new Basketline(obj);
        // Assuming AddToBasket is a function in BasketRepository to add items to the basket
        const addToBasketResult = await repository.AddBasketline(bl);
        console.log('Item added to basket:', addToBasketResult);
        const count=await repository.getbasketcount(user.CUS_ID);
        updateCount(count)
      }
    } catch (error) {
      console.error('Error adding item to basket:', error);
    }
  };


  return (
    <div className="container pt-5">
      <div className='row'>
        <div className='col-lg-3'>
          {categories.map((item, index) => (
            <div className="form-group" key={item.CATID}>
              <input type="checkbox" id={item.CATID.toString()} value={item.CATID.toString()} checked={selectedCategories[item.CATID]} onChange={handleChange}/>
              <label htmlFor={item.CATID.toString()}>{item.CATNAME}</label>
            </div>
          ))}
        </div>
        <div className='col-lg-9'>
          <div className="row">
          {products.map((item) => (
         <div className="col-md-4 mt-4 mt-sm-0 card-container">
         <div className="card text-center product p-4 pt-5 border-0 h-100 rounded-0">
           <img className="img-fluid d-block mx-auto" src="https://raw.githubusercontent.com/solodev/bootstrap-cards-shopping-cart/master/images/gear-glasses.jpg" alt="Pilot Aviator Glasses Gear Image" />
           <div className="card-body p-4 py-0 h-xs-440p">
             <h5 className="card-title font-weight-semi-bold mb-3 w-xl-220p mx-auto">{item.PRONAME}</h5>
             <p className="price">${item.PRICE.toString()}</p>
           </div>
           <p className=" w-100 px-4 mx-auto">
             <button type="submit" className="btn btn-dark btn-sm w-100" name="add-button" onClick={() => AddtoBasket(item)} > 
               <AiOutlinePlus style={{ fontSize: '24px', cursor: 'pointer' }} /> Add to Basket
           
             </button>
           </p>
         </div>
       </div>
      ))}
       </div>
     </div>
   </div>
    </div>
  );
};
export default Orders;