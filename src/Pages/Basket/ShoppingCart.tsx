import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shopping.css';
import APIHelper from '../../components/APIHelper';
import { useCount } from '../Orders/CountContext';
import Basketline from './BasketLine';
import BasketRepository from './BasketRepository';
import Badge from 'react-bootstrap/Badge';
import { Link,useNavigate } from 'react-router-dom';
import {
AiOutlinePlus,
AiOutlineMinus,AiOutlineShoppingCart,
} from 'react-icons/ai';
interface ShoppingCartModel {
  ID: number;
  CDATE: Date;
  AMOUNT: number;
  UNITPRICE: number;
  NETTOTALPRICE: number;
  VATRATE: number;
  VATPRICE: number;
  GROSSTOTALPRICE: number;
  PROID: number;
  UNITID: number;
  BASKID: number;
  CATNAME: string;
  CUSNAME: string;
  PRONAME: string;
}

const api = new APIHelper();
const repository = new BasketRepository();
const ShoppingCart: React.FC = () => {
  const [CUS_ID, setCUS_ID] = useState<any>();
  const {count, updateCount } = useCount();
  const [cart, setCart] = useState<ShoppingCartModel[]>([]);
  const [basketline, setBasketline] = useState<Basketline>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (CUS_ID:any) => {
     
      try {
        const data = await api.get('baskets/'+CUS_ID);
        setCart(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const usr_obj = localStorage.getItem('usr_obj');
    if (usr_obj != null) 
    {
      // Use type assertion here
      const parsedUserObject: { CUS_ID ?: number } = JSON.parse(usr_obj);
      setCUS_ID(parsedUserObject.CUS_ID);
      fetchData(parsedUserObject.CUS_ID);
    }
  }, []);
  const handleIncrease = async (productId: number) => {
  
      // Find the updated item with decreased quantity
      var updatedItem = cart.find((item) => item.ID === productId);
    
      // Ensure that the updatedItem is not undefined
      if (updatedItem) {
        updatedItem.AMOUNT= updatedItem.AMOUNT + 1
        // Call handleAmountChange with the updated quantity
         await handleBlur(productId, updatedItem.AMOUNT);
      }
  };

  const handleDecrease = async (productId: number) => {
    // Find the updated item with decreased quantity
    var updatedItem = cart.find((item) => item.ID === productId);
  
    if (updatedItem) {
      updatedItem.AMOUNT= updatedItem.AMOUNT - 1
      if(updatedItem.AMOUNT==0)
      {
        updatedItem.AMOUNT=1; 
        alert("The amount can not be zero");
        return;
      }
      
      // Call handleAmountChange with the updated quantity
       await handleBlur(productId, updatedItem.AMOUNT);
    }
  };

  const removeFromCart = async (ID:any) => {
    if (window.confirm('Would you like to delete this product from the shopping cart?')) {
      if (ID !== null) {
        var res = await api.delete('basketlines/' + ID);
        if (res) {
          setCart((prevCart) => prevCart.filter((item) => item.ID !== ID));
          const count=await repository.getbasketcount(CUS_ID);
          updateCount(count)
        }
      }
    }
  };


  const handleAmountChange = (productId: number, value: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => item.ID === productId ? { ...item, AMOUNT: value } : item)
    );
  };
  const handleBlur =  async (ID: number, value: number) => {
    if(value==0)
    {
      value=1;
    }
    var resedit= await api.get(`basketlines/${ID}`)
    resedit.AMOUNT=value;

    let obj=new Basketline(resedit)
    console.log(obj);
    const update= await api.patch<Basketline>(`basketlines/${ID}`,obj)
    const count=await repository.getbasketcount(CUS_ID);
    updateCount(count)
    //update model after on blur event
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.ID === ID ? { ...item, AMOUNT: value, NETTOTALPRICE: (obj.NETTOTALPRICE==null?0:obj.NETTOTALPRICE),
          VATPRICE: (obj.VATPRICE==null?0:obj.VATPRICE),
          GROSSTOTALPRICE: (obj.GROSSTOTALPRICE==null?0:obj.GROSSTOTALPRICE),
        } : item
      )
    );
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.GROSSTOTALPRICE, 0);
  };

  const navigatePayment =async ()=>{
if(cart.length>0){
  localStorage.setItem("PRICE", JSON.stringify(await calculateTotal()));
  localStorage.setItem("BASKID",JSON.stringify(cart[0].BASKID))
  navigate("/payment")
}


  }

  return (
    <div className="container mt-4 clearfix">
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"20%" }}>Product</th>
              <th className="text-right" style={{width:"10%" }}>Price</th>
              <th style={{width:"40%" }}>Quantity</th>
              <th className="text-right" style={{width:"10%" }}>Total</th>
              <th style={{width:"20%" }}></th>
            </tr>
          </thead>
          <tbody key="cart-body">
            {cart.map((item, index) => (
              <tr key={index}>
                <td className="p-4" style={{width:"20%" }}>
                  <div className="media align-items-center">
                    <div className="media-body">
                      <a  className="d-block text-dark">
                        {item.PRONAME}
                      </a>
                      <Badge bg="dark">Quantity: {item.AMOUNT}</Badge>
                      
                    </div>
                  </div>
                </td>
                <td className="text-right font-weight-semibold align-middle p-4" style={{width:"10%" }}>
                  ${item.UNITPRICE}
                </td>
                <td className="align-middle p-4" style={{width:"40%" }}>
                  <tr>
                    <td  className='p-1'> 
                    <a className='btn btn-dark rounded-pill  text-white pt-0 pb-0' style={{ color: "white",  height: "1.9rem", fontSize: "1.75rem;"}}
                    onClick={() => handleDecrease(item.ID)}
                    >
                   <strong><AiOutlineMinus/></strong> 
                      </a>

                    </td>
                    <td  className='p-1'>
                    <input  type="text" className="form-control text-center" value={item.AMOUNT}
                    onChange={(e) =>handleAmountChange( item.ID,parseFloat(e.target.value) || 0.0)  }
                    onBlur={(e) =>
                      handleBlur(item.ID, parseFloat(e.target.value) || 0.0)
                    }
                  />
                    </td>
                    <td className=''>
                    <a className="btn btn-dark rounded-pill  text-white pt-0 pb-0" style={{ color: "white",  height: "1.9rem", fontSize: "1.75rem;"}}
                     onClick={() => handleIncrease(item.ID)}>
                    <AiOutlinePlus/>
                  </a>

                    </td>
                  </tr>
                 
                </td>
                <td className="text-right font-weight-semibold align-middle pt-4" style={{width:"10%" }}>
                  ${item.GROSSTOTALPRICE.toFixed(2)}
                </td>
                <td className="text-center align-middle px-0" style={{width:"20%" }}>
                  <a  type='button' className="shop-tooltip close float-none text-danger"   title=""  data-original-title="Remove"
                    onClick={() => removeFromCart(item.ID)} >
                    <span style={{ fontSize: '50px' }}>×</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
         <tfoot>
         <tr>
          <td></td>
          <td></td>
          <td></td>
        
          <td>
          <Badge bg="warning" className='text-black'>${calculateTotal().toFixed(2)}</Badge>
          </td>
          <td>
         <a type='button' onClick={navigatePayment} className="btn btn-dark rounded-pill btn-sm text-white w-100"   title=""  data-original-title="Remove">
         <AiOutlineShoppingCart /> Confirm Order
         </a>

          </td>
         </tr>

          </tfoot>

        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
