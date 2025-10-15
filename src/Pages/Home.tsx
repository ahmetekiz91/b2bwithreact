import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Config from '../assets/Config';
import BasketRepository from './Basket/BasketRepository';
import { useCount } from '../Pages/Orders/CountContext';
import { json } from 'stream/consumers';
const config = new Config();
const repository = new BasketRepository();

const Home = () => {
  const { count, updateCount } = useCount();
  const [token, setToken] = useState<any>();
  const [CUS_ID, setCUS_ID] = useState<any>();

  useEffect(() => {

    var jsonstring = localStorage.getItem('access_token');
    const usr_obj = localStorage.getItem('usr_obj');
    jsonstring = jsonstring ? JSON.parse(jsonstring) : "";
    setToken(jsonstring);

    if (usr_obj != null) 
    {
      // Use type assertion here
      const parsedUserObject: { CUS_ID ?: number } = JSON.parse(usr_obj);
      setCUS_ID(parsedUserObject.CUS_ID);
      getShoppingList(parsedUserObject.CUS_ID)
      //getCustomer(parsedUserObject.CUS_ID)
    }
  }, []);

  // To fill shopping-cart from API
  const getShoppingList = async (CUS_ID: any) => {

    try {
      const response = await axios.get(config.APIURL + `/baskets/getbasketcount/` + CUS_ID);
      console.log("deneeme"+JSON.stringify(response.data))
      updateCount(response.data.counts);

    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }

  };

  const getCustomer = async (CUS_ID: any) => {
    try {
      const jsonstring = localStorage.getItem('access_token');
      const token = jsonstring ? JSON.parse(jsonstring) : "";

      const response = await axios.get(config.APIURL + `/customer/getCustomers/` + CUS_ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <h3 onClick={() => getCustomer(1)}>Hello</h3>
    </div>
  );
};

export default Home;
