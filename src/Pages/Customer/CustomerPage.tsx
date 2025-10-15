import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

import APIHelper from '../../components/APIHelper';
import {Customer} from './Customer'
import Config  from '../../assets/Config';

const config=new Config()
const api = new APIHelper();

const initialCustomerData : Customer= {
 CUS_ID: 0,
  NAME: '',
  SURNAME: '',
  SPECODE1:'',
  SPECODE2:'',
  CDATE: new Date(12, 12, 1998),
  UDATE: new Date(12, 12, 1998),
  UUSR_ID:0,
};
const CustomerPage : React.FC = () => {

  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]); // Store user data
  const [customerData, setCustomerData] = useState<Customer>(initialCustomerData);
  const [editMode, setEditMode] = useState(false);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<number | null>(null); // Define the type for selectedUserIndex
  
  
  const jsonstring=localStorage.getItem('access_token');
  const token= jsonstring ? JSON.parse(jsonstring) : "";
  useEffect(() => {
 
    const fetchData = async () => {
      try
       {        
        const response = await fetch(config.APIURL+'/customers/', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the 'Authorization' header
          },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setCustomers(data);
        } catch (error) 
        {
        console.error('Error:', error);
       }
    };

    fetchData();
  }, []);
  
    const handleClose = () => {
      setShow(false);
      setEditMode(false);
      setSelectedCustomerIndex(null);
      setCustomerData(initialCustomerData);
    };
  
    const handleShow = () => {
      setShow(true);
    };
  
    const handleSave = async () => 
    {
      if (editMode) {
        if (selectedCustomerIndex !== null) {
          const updatedCustomers = [...customers];
          const resCustomer : Customer | null= await api.patch<Customer>('customers/' + customerData.CUS_ID, customerData);
    
          if (resCustomer) {
            updatedCustomers[selectedCustomerIndex] = resCustomer;
            setCustomers(updatedCustomers);
          }
        }
      } else {
        var resCustomer = await api.post<Customer>('customers/', customerData);
    
        if (resCustomer) {
          setCustomers([...customers, resCustomer]);
        }
      }
      handleClose();
    };
    
    const handleEdit = async (index:any) => {
      if (window.confirm('Are you sure you want to edit this Customer?')) 
        {
        setEditMode(true);
        setSelectedCustomerIndex(index);
    
        const editedCustomer = await api.get('customers/' + customers[index].CUS_ID);
    
        if (editedCustomer) {
          setCustomerData(editedCustomer);
          handleShow();
        }
      }
    };
    function formatDate(dateString:any) {
      if (dateString) {
        const date = new Date(dateString);
    
        // Check if the date is valid before converting
        if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) {
          return date.toDateString();
        } else {
          return 'Invalid Date';
        }
      }
      return '';
    }
    const handleDelete = async (index:any) => {
      if (window.confirm('Are you sure you want to delete this Customer?')) {
        if (index !== null) {
          const CustomerIdToDelete = customers[index].CUS_ID;
          var res = await api.delete('customers/' + CustomerIdToDelete);
          if (res) {
            const updatedCategories = customers.filter((Customer, i) => i !== index);
            setCustomers(updatedCategories);
          }
        }
      }
    };
    
  
    return (
      <div>
        <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"   placeholder="Name"  value={customerData.NAME|| ''} onChange={(e) =>  setCustomerData({ ...customerData, NAME: e.target.value }) } />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                SurName
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"  placeholder="Surname" value={customerData.SURNAME|| ''} onChange={(e) => setCustomerData({ ...customerData, SURNAME: e.target.value }) }/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Specode1
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"  placeholder="Specode1" value={customerData.SPECODE1|| ''} onChange={(e) =>setCustomerData({ ...customerData, SPECODE1: e.target.value }) } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
              Specode2
              </Form.Label>
              <Col sm="10">
                <Form.Control  type="text"  placeholder="Specode2"  value={customerData.SPECODE2  || ''}  onChange={(e) =>setCustomerData({ ...customerData, SPECODE2: e.target.value||null })}
                />
              </Col>
            </Form.Group>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
  
        <div className="container">
          <Button variant="dark" className="mt-3 mb-3" onClick={handleShow}>
            Add Customer
          </Button>
  
          <div className="table-responsive" style={{ border: '2px solid #131C4E' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> Name</th>
                  <th>Surname</th>
                  <th>Specode1</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((Customer, index:any) => (
                  <tr key={index}>
                    <td>{Customer.NAME}</td>
                    <td>{Customer.SURNAME}</td>
                    <td>{Customer.SPECODE1}</td>
                    <td>
                      <Button variant="info" size="sm" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
export default CustomerPage;