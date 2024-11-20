import React from 'react';
import { SummaryBlock } from '../../../components/common/SummaryBlock';

export const RegistrationFee = ({ service }) => {
    const activePrice = service.prices.find(price => price.status === "active");
    const currentTotal = Number(activePrice?.price?.replace(/,/g, '') || '0');

    return (
        <div className='service-block mb-4'>
            <div className="d-flex justify-content-between align-items-center">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={true}
                        disabled
                    />
                    <label className="form-check-label">{service.name}</label>
                </div>
                
                <div className="mandatory-service">
                    <SummaryBlock
                        amount={currentTotal}
                    />
                </div>
            </div>
            <div className="row-line"></div>
        </div>
    );
};
