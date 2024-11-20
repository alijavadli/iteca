import React, { useState } from 'react';
import { useExhibitionData } from './hooks/useExhibitionData';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Steps } from './components/steps/Steps';
import { StepsNavigation } from './components/steps/StepsNavigation';
import { ManagerCard } from './components/common/ManagerCard';
import { ServiceImage } from './components/common/ServiceImage';
import { ActiveServicesProvider } from './components/steps/step1/ActiveServicesProvider';

function App() {
    const { data, loading, error } = useExhibitionData();
    const [activeStep, setActiveStep] = useState(1);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-danger">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Header />
            <main className="py-4 flex-grow-1">
                <div className="container-fluid">
                    <h1>
                        APPLICATION FOR PARTICIPATION IN {data?.exhib_code || 'KIOGE 2024'}
                    </h1>
                </div>
                <div className="row-line gray-2"></div>
                <div className="container-fluid">
                    <StepsNavigation
                        stepsObj={data?.steps[0]}
                        activeStep={activeStep}
                    />
                    <div className="row">
                        <div className="col-lg-9">
                            <Steps
                                data={data}
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                            />
                        </div>
                        <div className="col-lg-3">
                            <ManagerCard manager={data?.manager} />
                            <div className="service-images mt-4">
                                {activeStep === 1 && (
                                    <ActiveServicesProvider data={data}>
                                        {(activeServices) =>
                                            activeServices.map((service) => {
                                                const uniqueKey = `${service.id || service.block_id}-${service.name}`;
                                                return (
                                                    <ServiceImage
                                                        key={uniqueKey}
                                                        images={service.images}
                                                        quantity={service.quantity}
                                                        name={service.name}
                                                    />
                                                );
                                            })
                                        }
                                    </ActiveServicesProvider>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
