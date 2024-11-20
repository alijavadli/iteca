import React from 'react';
import { MarketingServices } from './MarketingServices';
import { PartnershipOpportunities } from './PartnershipOpportunities';

export const Step2 = ({ data }) => {
    const step2Services = data?.services?.filter(service => service.step === 2) || [];

    return (
        <div className="step-2">
            {step2Services.map((section, index) => (
                <div 
                    key={section.block_id || index} 
                    className={`step-section section-${section.section} mb-4 p-4`}
                >
                    {section.headline && (
                        <div className="section-header mb-4">
                            <h4 className="section-title mb-2">{section.headline}</h4>
                            {section.headline_comment && (
                                <p className="section-subtitle text-muted small mb-0">
                                    {section.headline_comment}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="section-content">
                        {section.block_id === 8 ? (
                            <MarketingServices service={section} />
                        ) : section.block_id === 15 ? (
                            <PartnershipOpportunities service={section} />
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
};