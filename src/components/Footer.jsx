import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap'
import { FaceBookIcon, InstaIcon,} from './icons'
import "./css/Footer.css";

const Footer = () => {
    return (
      <Container className="d-flex align-items-start justify-content-around mt-10" 
        style={{minHeight: "25vh", marginTop: "10px"}}>
          <>
            <div className="social-icons">
            { FaceBookIcon } 
            </div>
            <div className="social-icons">
            { InstaIcon }
            </div>
            <div>
            <footer>
              <section className="footer-links">
                <h2>Customer Care</h2>
                <a href="">Account</a>
                <a href="">Orders</a>
                <a href="">Policies</a>
                <a href="">Credit</a>
                <a href="">Help</a>
              </section>
              <br/>
              <section className="footer-links">
                <h2>Sales</h2>
                <a href="">Become a Seller</a>
                <a href="">Manage Your Products</a>
                <a href="">Advertise</a>
              </section>
              <section className="footer-links">
                <h2 id>About Us</h2>
                <a href="">Careers</a>
                <a href="">Blog</a>
                <a href="">Our History</a>
                <a href="">Press Releases</a>
                <a href="">Take a Tour</a>
              </section>
            </footer>
            </div>
          </>
      </Container>
    )
}

export default Footer