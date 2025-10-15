import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

import APIHelper from '../../components/APIHelper';
import {Category} from './Category'
const api = new APIHelper();
const initialCategoryData : Category= {
  CATID: 0,
  CATNAME: '',
  CDATE: new Date(12, 12, 1998),
  CUSRID: 0,
  UUSRID: 0,
};

const CategoryPage : React.FC = () => 
{
const [show, setShow] = useState(false);
const [categories, setCategories] = useState<Category[]>([]); // Store user data
const [categoryData, setCategoryData] = useState<Category>(initialCategoryData);
const [editMode, setEditMode] = useState(false);
const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null); // Define the type for selectedUserIndex
  
  useEffect(() => {
    api.get('categories/')
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setSelectedCategoryIndex(null);
    setCategoryData(initialCategoryData);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleSave = async () => {
    if (editMode) {
      if (selectedCategoryIndex !== null) {
        const updatedCategories = [...categories];
        const resCategory : Category | null= await api.patch<Category>('categories/' + categoryData.CATID, categoryData);
  
        if (resCategory) {
          updatedCategories[selectedCategoryIndex] = resCategory;
          setCategories(updatedCategories);
        }
      }
    } else 
    {
      var resCategory = await api.post<Category>('categories/', categoryData);
  
      if (resCategory) {
        setCategories([...categories, resCategory]);
      }
    }
    handleClose();
  };
  
  const handleEdit = async (index:any) => {
    if (window.confirm('Are you sure you want to edit this category?')) {
      setEditMode(true);
      setSelectedCategoryIndex(index);
  
      const editedCategory = await api.get('categories/' + categories[index].CATID);
  
      if (editedCategory) {
        setCategoryData(editedCategory);
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
    if (window.confirm('Are you sure you want to delete this category?')) {
      if (index !== null) {
        const categoryIdToDelete = categories[index].CATID;
        var res = await api.delete('categories/' + categoryIdToDelete);
        if (res) {
          const updatedCategories = categories.filter((category, i) => i !== index);
          setCategories(updatedCategories);
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
              Category Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="CATNAME"
                placeholder="CATNAME"
                value={categoryData.CATNAME}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, CATNAME: e.target.value })
                }
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
          Add Category
        </Button>

        <div className="table-responsive" style={{ border: '2px solid #131C4E' }}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Creation Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.CATNAME}</td>
                  <td>{formatDate(category.CDATE)}</td>
                  <td>
                    {/* Buttons for edit and delete */}
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

export default CategoryPage;