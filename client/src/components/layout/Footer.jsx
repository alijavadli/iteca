import React from 'react';
import logo from '../../assets/logo.svg';
import CallIcon from '../../assets/icons/call.svg';
import SmsIcon from '../../assets/icons/sms.svg';
import facebook from '../../assets/socials/facebook.svg';
import instagram from '../../assets/socials/instagram.svg';
import linkedin from '../../assets/socials/linkedin.svg';
import youtube from '../../assets/socials/youtube.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-1">
            <img className='logo' src={logo} alt="logo" />
          </div>
          <div className="col-2 d-flex justify-content-center">
            <div className="menu-items">
              <div className="item-title">
                <a href="/">About the exhibition</a>
              </div>
              <div className="item-desc">
                <a href="/">User Agreement</a>
              </div>
            </div>
          </div>
          <div className="col-2 d-flex justify-content-center">
            <div className="menu-items">
              <div className="item-title">
                <a href="/">Exhibition plan</a>
              </div>
              <div className="item-desc">
                <a href="/">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="col-2 d-flex justify-content-center">
            <div className="menu-items">
              <div className="item-title">
                <a href="/">FAQ</a>
              </div>
              <div className="item-desc">
                <a href="/">Useful Links</a>
              </div>
            </div>
          </div>
          <div className="col-3 d-flex justify-content-center">
            <div className="menu-items">
              <div className="item-contact">
                <a href="/">
                  <img src={CallIcon} className='me-2' alt="call-icon" />
                  +7 727 258-34-34
                </a>
              </div>
              <div className="item-contact">
                <img src={SmsIcon} className='me-2' alt="sms-icon" />
                <a href="/">oil-gas@iteca.kz</a>
              </div>
            </div>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <div className="menu-items">
              <div className="item-title">
                <a href="/">Follow us</a>
              </div>
              <div className="item-socials">
                <a href="/">
                  <img src={facebook} alt="facebook" />
                </a>
                <a href="/">
                  <img src={instagram} alt="instagram" />
                </a>
                <a href="/">
                  <img src={linkedin} alt="linkedin" />
                </a>
                <a href="/" className='me-0'>
                  <img src={youtube} alt="youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
