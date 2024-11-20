import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UnequippedArea } from './UnequippedArea';
import { ElectricalConnection } from './ElectricalConnection';
import { StandardStandSetup } from './StandardStandSetup';
import { OutsideArea } from './OutsideArea';
import { RegistrationFee } from './RegistrationFee';
import { StandConfiguration } from './StandConfiguration';
import { Insurance } from './Insurance';
import { step1SubtotalAtom } from '../../../store/atoms';
import { useAtom } from 'jotai';

export const Step1 = ({ data }) => {
    const [, setStep1Subtotal] = useAtom(step1SubtotalAtom);
    const calculateTotalAmount = useCallback(() => {
        let total = 0;

        const mandatoryServices = data?.services?.filter(service =>
            service.step === 1 && (service.block_id === 5 || service.block_id === 6)
        ) || [];

        mandatoryServices.forEach(service => {
            const activePrice = service.prices.find(price => price.status === "active");
            total += Number(activePrice?.price?.replace(/,/g, '') || '0');
        });

        return total;
    }, [data?.services]);

    useEffect(() => {
        const updateTotal = () => {
            let total = calculateTotalAmount();
            const summaryBlocks = document.querySelectorAll('.summary-block:not(.mandatory-service .summary-block) .amount');
            summaryBlocks.forEach(block => {
                const amount = Number(block.textContent.replace(/[^0-9.-]+/g, '') || '0');
                total += amount;
            });
            setStep1Subtotal(total);
        };
        updateTotal();
        const interval = setInterval(updateTotal, 500);
        return () => clearInterval(interval);
    }, [calculateTotalAmount, setStep1Subtotal]);

    const stepData = data?.services?.filter(service => service.step === 1) || [];
    const getServiceComponent = useCallback((service) => {
        if (service.id) {
            switch (service.id) {
                case 'ISSP':
                    return <UnequippedArea service={service} />;
                case 'EQSP1':
                    return <StandardStandSetup service={service} />;
                default:
                    break;
            }
        }
        switch (service.block_id) {
            case 2:
                return <ElectricalConnection service={service} />;
            case 4:
                return <OutsideArea service={service} />;
            case 5:
                return <RegistrationFee service={service} />;
            case 6:
                return <Insurance service={service} />;
            case 7:
                return <StandConfiguration service={service} />;
            default:
                return null;
        }
    }, []);

    const groupedServices = stepData.reduce((acc, service) => {
        const section = service.section;
        if (!acc[section]) {
            acc[section] = {
                services: [],
                headline: service.headline,
                headline_comment: service.headline_comment
            };
        }
        acc[section].services.push(service);
        return acc;
    }, {});

    if (!stepData.length) {
        return <div className="alert alert-info">No services available for Step 1</div>;
    }

    return (
        <div className="step-1">
            {Object.entries(groupedServices).map(([section, { services, headline, headline_comment }]) => (
                <div
                    key={section}
                    className={`step-section section-${section} mb-4 p-4`}
                >
                    {headline && (
                        <div className="section-header mb-4">
                            <h4 className="section-title mb-2">{headline}</h4>
                            {headline_comment && (
                                <p className="section-subtitle text-muted small mb-0">
                                    {headline_comment}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="section-content">
                        {services.map(service => (
                            <div
                                key={service.block_id || service.id}
                                className="service-wrapper"
                                data-service-id={service.block_id || service.id}
                            >
                                {getServiceComponent(service)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

Step1.propTypes = {
    data: PropTypes.shape({
        services: PropTypes.arrayOf(
            PropTypes.shape({
                step: PropTypes.number,
                section: PropTypes.number,
                id: PropTypes.string,
                block_id: PropTypes.number,
                headline: PropTypes.string,
                headline_comment: PropTypes.string,
            })
        ),
    }),
};
