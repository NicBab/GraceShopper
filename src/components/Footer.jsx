import React from 'react';
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaceBookIcon, InstaIcon, GitHubIcon } from './icons'
import "./css/Footer.css";

const onGitClick = () => {
  window.open("https://github.com/NicBab/GraceShopper")
}

const Footer = () => {
    return (
      <>
      <Container className="d-flex align-items-start justify-content-around mt-10" 
        style={{minHeight: "8vh", marginTop: "10px"}}>
          <>
            <div className="social-icons">
              { FaceBookIcon } 
            </div>

            <div className="social-icons">
              { InstaIcon }
            </div>

            <div className="social-icons" onClick={onGitClick} style={{cursor: 'pointer'}}>
                { GitHubIcon } 
            </div>
            </>
          </Container>

          <Container className="d-flex align-items-end justify-content-around mt-10" 
            style={{minHeight: "10vh", marginTop: "10px"}}>
              <>
            <div>
            <footer className="site-footer">
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
      </>
    )
}

export default Footer