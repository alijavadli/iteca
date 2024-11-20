import { useAtom } from 'jotai';
import {
    unequippedAreaStateAtom,
    outsideAreaStateAtom,
    serviceQuantitiesAtom
} from '../../../store/atoms';

export const ActiveServicesProvider = ({ data, children }) => {
    const [unequippedAreaState] = useAtom(unequippedAreaStateAtom);
    const [outsideAreaState] = useAtom(outsideAreaStateAtom);
    const [serviceQuantities] = useAtom(serviceQuantitiesAtom);

    const getActiveServices = () => {
        if (!data?.services) return [];

        let services = [];

        // Unequipped Area Service
        if (unequippedAreaState.isActive && unequippedAreaState.quantity) {
            const mainService = data.services.find(service => service.id === 'ISSP');
            if (mainService) {
                services.push({
                    ...mainService,
                    quantity: unequippedAreaState.quantity
                });

                // Stand Configuration Service
                const configService = data.services.find(service => service.block_id === 7);
                const configQuantity = serviceQuantities[7];

                if (configService) {
                    if (configQuantity?.additionalOption) {
                        const selectedOption = configService.options.find(opt =>
                            opt.name === configQuantity.additionalOption
                        );
                        if (selectedOption) {
                            services.push({
                                ...configService,
                                images: selectedOption.images,
                                name: selectedOption.name,
                                quantity: "1"
                            });
                        }
                    } else if (configService.options[0]) {
                        services.push({
                            ...configService,
                            images: configService.options[0].images,
                            name: configService.options[0].name,
                            quantity: "1"
                        });
                    }
                }
            }
        }

        // Outside Area Service
        if (outsideAreaState.isActive && outsideAreaState.quantity) {
            const mainService = data.services.find(service => service.block_id === 4);
            if (mainService) {
                services.push({
                    ...mainService,
                    quantity: outsideAreaState.quantity
                });

                // Stand Configuration Service
                const configService = data.services.find(service => service.block_id === 7);
                const configQuantity = serviceQuantities[7];

                if (configService) {
                    if (configQuantity?.additionalOption) {
                        const selectedOption = configService.options.find(opt =>
                            opt.name === configQuantity.additionalOption
                        );
                        if (selectedOption) {
                            services.push({
                                ...configService,
                                images: selectedOption.images,
                                name: selectedOption.name,
                                quantity: "1"
                            });
                        }
                    } else if (configService.options[0]) {
                        services.push({
                            ...configService,
                            images: configService.options[0].images,
                            name: configService.options[0].name,
                            quantity: "1"
                        });
                    }
                }
            }
        }

        return services;
    };

    return children(getActiveServices());
};
