import { useState, useEffect } from 'react';
import jsonBinStorage from '@/lib/jsonbin-storage';

export function useDataStorage(dataType) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadData();
    }, [dataType]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await jsonBinStorage.getData(dataType);
            setData(result);
        } catch (err) {
            setError(err.message);
            console.error(`Error loading ${dataType}:`, err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const saveData = async (newData) => {
        try {
            setError(null);
            const success = await jsonBinStorage.setData(dataType, newData);
            if (success) {
                setData(newData);
                return true;
            } else {
                setData(newData);
                return true;
            }
        } catch (err) {
            setError(err.message);
            console.error(`Error saving ${dataType}:`, err);
            return false;
        }
    };

    const addItem = async (newItem) => {
        const updatedData = [...data, newItem];
        return await saveData(updatedData);
    };

    const updateItem = async (id, updatedItem) => {
        const updatedData = data.map(item =>
            item.id === id ? { ...item, ...updatedItem } : item
        );
        return await saveData(updatedData);
    };

    const deleteItem = async (id) => {
        const updatedData = data.filter(item => item.id !== id);
        return await saveData(updatedData);
    };

    return {
        data,
        loading,
        error,
        saveData,
        addItem,
        updateItem,
        deleteItem,
        refresh: loadData
    };
}

export function useProducts() {
    return useDataStorage('products');
}

export function useCategories() {
    return useDataStorage('categories');
}

export function useCustomers() {
    return useDataStorage('customers');
}
