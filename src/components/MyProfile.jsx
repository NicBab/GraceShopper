import React from 'react'

const MyProfile = () => {

}

export default MyProfile







// import React from 'react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
// import { Card, Nav, Button } from 'react-bootstrap'
// import { getAllUsers } from '../api';
// import './css/MyProfile.css'

// const MyProfile = () => {
//     const [user, setUser] = useState([])

//     useEffect(() => {
//         getAllUsers()
//     }, [])

//     return (
//       <>
//         <div className="prof">MyProfile</div>
//           <Card>
//             <Card.Header>
//                 <Nav variant="tabs" defaultActiveKey="#first">
//                     <Nav.Item>
//                         <Nav.Link href="/MyCart">MyCart</Nav.Link>
//                     </Nav.Item>
                
//                     <Nav.Item>
//                         <Nav.Link href="/MyOrders">MyOrders</Nav.Link>
//                     </Nav.Item>
//                 </Nav>
//             </Card.Header>

//             <Card.Body>
//                 <Card.Title>Welcome, {user}</Card.Title>
//                 <Card.Text>{user.username}username</Card.Text>
//                 <Card.Text>{user.email}email</Card.Text>
//               <Link to="/Home"><Button variant="primary">LogOut</Button></Link>
//             </Card.Body>
//         </Card>
//       </>
//     )
// }

// export default MyProfile;