import React, { useState } from 'react';
import CallIcon from '../../assets/icons/call.svg'
import SmsIcon from '../../assets/icons/sms.svg'
import HomeIcon from '../../assets/icons/home.svg'
import FlagIcon from '../../assets/icons/flag.svg'
import ArrowDownIcon from '../../assets/icons/arrow-down.svg'

export const ManagerCard = ({ manager }) => { 
    const [isExpanded, setIsExpanded] = useState(false);

    if (!manager) return null;

    return (
        <div className="manager-card">
            <div 
                className="manager-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h6 className="card-subtitle mb-3">Your manager:</h6>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <img
                            src={manager.avatar}
                            alt="Manager"
                            className="rounded-circle me-3"
                            width="48"
                            height="48"
                        />
                        <div>
                            <div className="fullname">
                                {manager.fullname}
                            </div>
                            <div className="position">
                                Sales Manager
                            </div>
                        </div>
                    </div>
                    <div className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}>
                        <img className="icon" src={ArrowDownIcon} alt="arrow-down-icon" />
                    </div>
                </div>
            </div>
            
            <div className={`manager-details ${isExpanded ? 'expanded' : ''}`}>
                <div className="contact-info">
                    <div className="info-item">
                        <img className="icon" src={CallIcon} alt="call-icon" />
                        <a href={`tel:${manager.phone}`}>+77272583434</a>
                    </div>
                    <div className="info-item">
                        <img className="icon" src={SmsIcon} alt="sms-icon" />
                        <a href={`mailto:${manager.email}`}>leslie.alexander@iteca.events</a>
                    </div>
                    <div className="info-item">
                        <img className="icon" src={HomeIcon} alt="home-icon" />
                        <span>Almaty</span>
                    </div>
                    <div className="info-item">
                        <img className="icon" src={FlagIcon} alt="flag-icon" />
                        <span>The Republic of Kazakhstan</span>
                    </div>
                </div>
            </div>
        </div>
    );
};