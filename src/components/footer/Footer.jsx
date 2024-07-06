import React from "react";
import "./footer.css";
import {
  AiFillGithub,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your online-learning Platform. All rights reserved. <br /> Made
          with ❤️ <a href="">Abhishek Saha</a>
        </p>
        <div className="social-links">
          <a href="">
            <AiFillGithub />
          </a>
          <a href="">
            <AiFillFacebook />
          </a>
          <a href="">
            <AiFillLinkedin />
          </a>
          <a href="">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
