import { useEffect, useState } from 'react';

const API_URL = 'https://demo7919674.mockable.io';

type ResponseData = {
    name: string;
    field: number;
}[];

export const useModesQuery = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modes, setModes] = useState<ResponseData>([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
                setModes(data);
            })
            .catch(() => {
                setIsLoading(false);
                setError('Error while fetching data');
            });
    }, []);

    return { isLoading, error, modes };
};
