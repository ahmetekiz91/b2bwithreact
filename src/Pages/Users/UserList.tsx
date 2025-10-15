import React, { useState, useEffect } from 'react';
import { Users } from './Users';
function UserList() {
  const [userData, setUserData] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = 'http://127.0.0.1:8000/users/getUsers/'; // Replace with your API endpoint

    // Use the fetch API to make an HTTP GET request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); // The empty dependency array ensures this effect runs once

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1>User Data</h1>
     <div className='container'>
<div className='row'>
<div className='col-12'>
  
</div>

</div>

     </div>


      <ul>
        {userData.map((user) => (
          <li key={user.USRID}>
            <p>Username: {user.USERNAME}</p>
            <p>Email: {user.EMAIL}</p>
            {/* Include other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

