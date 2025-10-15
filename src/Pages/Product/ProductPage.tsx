import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Row, Col,Table } from 'react-bootstrap';
import  Product  from './Product';
import APIHelper from '../../components/APIHelper';

const api = new APIHelper();

const initialProductData : Product ={
  PRO_ID: 0,
  PRONAME: '',
  PRICE: 0.0,
  UNIT: '',
  CATID: null,
  CUSRID: null,
  UDATE: new Date(),
  UUSRID: null,
  CATNAME:'',
  VATRATE:0.0,
};
interface Option {
  CATID: number;
  CATNAME: string;
}
const primaryStyle = {
  backgroundColor: '#131C4E',
  color: '#fff',
};
const ProductPage : React.FC = () =>  {
  

  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Store user data
  const [productData, setProductData] = useState<Product>(initialProductData);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null); // Define the type for selectedUserIndex

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState('');

  
  useEffect(() => {
    // Fetch products from the backend (replace the URL with your API endpoint)

      api.get('products/category')
      .then(data => {
        setOptions(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    if (selectedOption !== '') {
      setProductData({ ...productData, CATID:  parseInt(selectedOption)||0 });
    }
      
      api.get('products/getAll/0')
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
       
  
  }, []);
   
  const handleCloseModal = () => {
    setShow(false);
    setEditMode(false);
    setSelectedProductIndex(null);
    setProductData(initialProductData);
  };

  const handleShowModal = () => {
    //set default select option value
    //i will better way
    setSelectedOption("0")
    setShow(true);
  }

  const DynamicSelect = () => {
   
    useEffect(() => {
      // Fetch data from your API
         
    }, []); // Empty dependency array ensures it only runs once on component mount
  }
  const handleSelectChange = (e: any) => {
    // Update selectedOption and productData.CATID when a different option is selected
    const selectedOptionValue = e.target.value;
    setSelectedOption(selectedOptionValue);
    setProductData({ ...productData, CATID: selectedOptionValue });
  }

  const handleSaveProduct = async () => {
    if (editMode) {
      if (selectedProductIndex !== null) {
        const updatedProducts = [...products];
        const resProduct: Product | null = await api.patch<Product>(
          'products/' + productData.PRO_ID,
          productData
        );
  
        if (resProduct !== null) {
          updatedProducts[selectedProductIndex] = resProduct;
          setProducts(updatedProducts);
        }
      }
    } else {
      // For adding a new product, you're sending a POST request
      // Here, set productData.CATID to the selectedOption before sending the request
      const productDataWithCATID: Product = { ...productData, CATID: parseInt(selectedOption)||0 };
      
      const resProduct: Product | null = await api.post<Product>(
        'products/',
        productDataWithCATID
      );
  
      if (resProduct !== null) {
        setProducts([...products, resProduct]);
      }
    }
    handleCloseModal();
  };

  const handleEditProduct = async (index: number) => {
    if (window.confirm('Are you sure you want to edit this product?')) {
      try 
      {

        handleShowModal();
        //const editedUser = await  api.get('users/'+users[index].USRID)
        const editedProduct= await api.get('products/' + products[index].PRO_ID);
  
        if (editedProduct) {
          setProductData({ ...editedProduct, CATID: editedProduct.CATID });
          setEditMode(true);
          setSelectedProductIndex(index);
         
          setSelectedOption(editedProduct.CATID.toString());
        }
      } catch (error) {
        console.error('Error fetching edited product:', error);
        // Handle error scenario if needed
      }
    }
  };

  const handleDeleteProduct = async  (index:number) => {
    // Implement logic to delete the product with the specified ID
    // Make an API call to delete the product from the backend
    if (window.confirm('Are you sure you want to delete this user?')) {
      if (index !== null) {
        const productIdToDelete = products[index].PRO_ID; // Get the user ID to delete
       var res= await api.delete('products/'+productIdToDelete); // Call the deleteUser function to delete the user
       if(res){
        const updatedProduct = products.filter((product, i) => i !== index);
        setProducts(updatedProduct); // Update the user list in the component after successful deletion

       }
      }
    }
  
  };

  return (
    <div className='container'>
      <Button   variant="info" className="mt-3 mb-3" style={primaryStyle} size="sm" onClick={handleShowModal}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2"> Product Name</Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="ProName" value={productData.PRONAME}  onChange={(e) => setProductData({ ...productData, PRONAME: e.target.value })}  />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">  Price</Form.Label>
            <Col sm="10">
              <Form.Control type="number" placeholder="PRICE" value={productData.PRICE}  onChange={(e) => setProductData({ ...productData, PRICE: parseFloat(e.target.value) || 0})}  />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">  Vat Rate</Form.Label>
            <Col sm="10">
              <Form.Control type="number" placeholder="VATRATE" value={productData.VATRATE}  onChange={(e) => setProductData({ ...productData, VATRATE: parseFloat(e.target.value) || 0})}  />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">  Unit</Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Unit" value={productData.UNIT}  onChange={(e) => setProductData({ ...productData, UNIT: e.target.value})}  />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">  Category </Form.Label>
            <Col sm="10">
            <Form.Control as="select" value={selectedOption} onChange={handleSelectChange}>
            <option value="0">Select...</option>
             {options.map(o => (
             <option key={o.CATID} value={o.CATID}>
                {o.CATNAME}
              </option>
            ))}
          </Form.Control>
            </Col>
           
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"   className="mt-3 mb-3" style={primaryStyle} size="sm" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary"   className="mt-3 mb-3"  style={primaryStyle}size="sm" onClick={handleSaveProduct}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  

          {products.map((product,index) => (
            <tr key={product.PRO_ID}>
              <td>{product.PRO_ID}</td>
              <td>{product.PRONAME}</td>
              <td>{product.PRICE}</td>
              <td>{product.UNIT}</td>
              <td>
                <Button variant="info" className="mt-3 mb-3" size="sm" onClick={() => handleEditProduct(index)}>
                  Edit
                </Button>
                <Button variant="danger" className="mt-3 mb-3" size="sm" onClick={() => handleDeleteProduct(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductPage;