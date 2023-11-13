import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useLocalStorage(key: string) {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeData = await AsyncStorage.getItem(key);
                if (storeData) {
                    setData(storeData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [key]);
    return data;
}