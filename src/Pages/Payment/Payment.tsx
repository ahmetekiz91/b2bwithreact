import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import PaymentRepository from './PaymentRepository';
import PaymentModel from './PaymentModel';
import Badge from 'react-bootstrap/Badge';
import { useCount } from '../Orders/CountContext';
import BasketRepository from '../Basket/BasketRepository';




const prepository = new PaymentRepository();
const basketprepository = new BasketRepository();
var initialPaymentData: PaymentModel = {
  PYMID: 0,
  PRICE: 0.0,
  CVV: 0,
  CDATE: new Date(),
  PYMDATE: new Date(),
  CARDNUMBER: '',
  EXPYEAR: 0,
  EXPMONTH: 0,
  CARDNAME: '',
  BASKID: 0,
  CUSRID: 0,
};

const Payment: React.FC = () => {
  const {count, updateCount } = useCount();
  var [payment, setPayment] = useState<PaymentModel>(initialPaymentData);

  useEffect(() => {
    const obj1 = localStorage.getItem('PRICE');
    const obj2 = localStorage.getItem('BASKID');
    const obj3 = localStorage.getItem('usr_obj');
    if (obj1 !== null) {
      setPayment((initialPaymentData) => ({ ...initialPaymentData, PRICE: parseFloat(obj1) || 0 }));
    }
  
    if (obj2 !== null) {
      setPayment((initialPaymentData) => ({ ...initialPaymentData, BASKID: parseFloat(obj2) || 0 }));
    }
    if (obj3 !== null) {
      var usrobj=JSON.parse(obj3);
      var SCUSRID=usrobj.USRID;
      
      setPayment((initialPaymentData) => ({ ...initialPaymentData, CUSRID: parseFloat(SCUSRID) || 0 }));
    }
  }, []);

  const processPayment = async () =>
  {
    try {
      const res = await prepository.createPayment(payment);
      const jsonstring = localStorage.getItem('usr_obj');
      const user = jsonstring ? JSON.parse(jsonstring) : '';
      if (res) 
      {
        const count=await basketprepository.getbasketcount(user.CUS_ID);
        updateCount(count);
        setPayment(initialPaymentData);
        alert('The Payment is successful');
      } else {
        alert('Payment failed. Please check your information.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred while processing the payment. Please try again later.');
    }
  };

  return (
    <div className='card'>
      <div className='card-title'>
        <h4 className='text-center'>Payments</h4>
      </div>
      <div className='card-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={payment.CARDNAME}
                onChange={(e) => setPayment({ ...payment, CARDNAME: e.target.value })}
              />
            </div>
            <div className='col-12'>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={payment.CARDNUMBER}
                onChange={(e) => setPayment({ ...payment, CARDNUMBER: e.target.value })}
              />
            </div>
            <div className='col-6'>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                value={payment.EXPYEAR}
                onChange={(e) => setPayment({ ...payment, EXPYEAR: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className='col-6'>
              <Form.Label>Month</Form.Label>
              <Form.Control
                type="text"
                value={payment.EXPMONTH}
                onChange={(e) => setPayment({ ...payment, EXPMONTH: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className='col-12'>
              <Form.Label>CVV</Form.Label>
              <Form.Control  type="text" value={payment.CVV} onChange={(e) => setPayment({ ...payment, CVV:  parseInt(e.target.value) || 0 })}/>
            </div>
            <div className='col-12 mt-5'>
             
              <Badge bg="dark" className='text-white'> <strong> Price: ${payment.PRICE}</strong></Badge>
            </div>

            <div className='col-12 mt-5'>
              <label> &nbsp; </label>
              <Button className='btn btn-dark btn-sm w-100 ' onClick={processPayment}>
                Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
