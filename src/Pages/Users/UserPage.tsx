import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Users } from './Users';
import { json } from 'stream/consumers';

import APIHelper from '../../components/APIHelper';

const api = new APIHelper();

const initialUserData: Users = {
  USRID: 0,
  CDATE: new Date(12, 12, 1998),
  UDATE: new Date(12, 12, 1998),
  USERNAME: '',
  PASSW: '',
  EMAIL: '',
  HASH: '',
  PHONE: '',
  FULLNAME: '',
};

const UserPage : React.FC = () => {
  useEffect(() => {
    // Define the API endpoint URL

    api.get('users/getUsers/')
  .then(data => {
    setUsers(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
   
  }, []);

  const primaryStyle = {
    backgroundColor: '#131C4E',
    color: '#fff',
  };

  const borderStyle = {
    border: '2px solid #131C4E',
  };

  const [show, setShow] = useState(false);
  const [users, setUsers] = useState<Users[]>([]); // Store user data
  const [userData, setUserData] = useState<Users>(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null); // Define the type for selectedUserIndex

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setSelectedUserIndex(null);
    setUserData(initialUserData);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = async () => {
    if (editMode) {
      if (selectedUserIndex !== null) {
        // Update existing user
        const updatedUsers = [...users];
       
     
        const resUser: Users | null = await api.patch<Users>('users/'+userData.USRID,userData);
  
        if(resUser!==null){
          
          updatedUsers[selectedUserIndex] = resUser;
          setUsers(updatedUsers);
        }
      }
    } else {
      // Add new user
      var resUser: Users | null= await api.post<Users>('users/create/',userData);
   
     if(resUser!==null){
      setUsers([...users, resUser]);
     }
    }
    handleClose();
  };

  const handleEdit = async (index: number) => {
    if (window.confirm('Are you sure you want to edit this user?')) {
      setEditMode(true);
      setSelectedUserIndex(index);
      debugger
      const editedUser = await  api.get('users/'+users[index].USRID)

      if (editedUser) {
        setUserData(editedUser);
        handleShow();
      }
    }
  };
  
  const handleDelete = async (index: any) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      if (index !== null) {
        const userIdToDelete = users[index].USRID; // Get the user ID to delete
       var res= await api.delete('users/'+userIdToDelete); // Call the deleteUser function to delete the user
       if(res){
        const updatedUsers = users.filter((user, i) => i !== index);
        setUsers(updatedUsers); // Update the user list in the component after successful deletion

       }
      }
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Full Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text"  placeholder="Full Name" value={userData.FULLNAME}  onChange={(e) => setUserData({ ...userData, FULLNAME: e.target.value })}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">  Phone</Form.Label>
            <Col sm="10">
              <Form.Control type="phone" placeholder="Phone" value={userData.PHONE}  onChange={(e) => setUserData({ ...userData, PHONE: e.target.value })}  />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="Email" value={userData.EMAIL} onChange={(e) => setUserData({ ...userData, EMAIL: e.target.value })}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control  type="text"  placeholder="Username" value={userData.USERNAME} onChange={(e) => setUserData({ ...userData, USERNAME: e.target.value })}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Password"  value={userData.PASSW}  onChange={(e) => setUserData({ ...userData, PASSW: e.target.value }) }/>
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
        <Button  variant="info" className="mt-3 mb-3" style={primaryStyle} size="sm"  onClick={handleShow} >
          Add User
        </Button>

        <div className="table-responsive" style={borderStyle}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.FULLNAME}</td>
                  <td>{user.EMAIL}</td>
                  <td>
                    <Button style={primaryStyle}  variant="info" size="sm"  onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button  variant="danger" size="sm" onClick={() => handleDelete(index)}>
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

export default UserPage;
