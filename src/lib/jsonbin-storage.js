class JSONBinStorage {
    constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || '$2a$10$TWV99gKUm1V0FqY2K6Mcqu.rTUQjiVq9x5P61uEuLYJsEULdloipy';
        this.baseUrl = 'https://api.jsonbin.io/v3';
        this.bins = {
            products: process.env.NEXT_PUBLIC_JSONBIN_PRODUCTS_BIN_ID,
            categories: process.env.NEXT_PUBLIC_JSONBIN_CATEGORIES_BIN_ID,
            customers: process.env.NEXT_PUBLIC_JSONBIN_CUSTOMERS_BIN_ID,
        };
    }

    async makeRequest(url, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Master-Key': this.apiKey,
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`JSONBin request failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async getData(dataType) {
        if (!this.bins[dataType]) {
            throw new Error(`No bin ID configured for data type: ${dataType}`);
        }

        try {
            const url = `${this.baseUrl}/b/${this.bins[dataType]}/latest`;
            const result = await this.makeRequest(url);
            return result.record || [];
        } catch (error) {
            console.error(`Error fetching ${dataType} from JSONBin:`, error);
            return this.getLocalStorageFallback(dataType);
        }
    }

    async setData(dataType, data) {
        if (!this.bins[dataType]) {
            throw new Error(`No bin ID configured for data type: ${dataType}`);
        }

        try {
            const url = `${this.baseUrl}/b/${this.bins[dataType]}`;
            await this.makeRequest(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            this.setLocalStorageBackup(dataType, data);

            return true;
        } catch (error) {
            console.error(`Error updating ${dataType} in JSONBin:`, error);
            this.setLocalStorageBackup(dataType, data);
            return false;
        }
    }

    getLocalStorageFallback(dataType) {
        if (typeof window === 'undefined') return [];

        const storageKey = `admin${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`;
        const stored = localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    setLocalStorageBackup(dataType, data) {
        if (typeof window === 'undefined') return;

        const storageKey = `admin${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`;
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    async getProducts() {
        return this.getData('products');
    }

    async setProducts(products) {
        return this.setData('products', products);
    }

    async getCategories() {
        return this.getData('categories');
    }

    async setCategories(categories) {
        return this.setData('categories', categories);
    }

    async getCustomers() {
        return this.getData('customers');
    }

    async setCustomers(customers) {
        return this.setData('customers', customers);
    }

    async migrateFromLocalStorage() {
        const migrations = [];
        const products = this.getLocalStorageFallback('products');
        if (products.length > 0) {
            migrations.push(this.setProducts(products));
        }
        const categories = this.getLocalStorageFallback('categories');
        if (categories.length > 0) {
            migrations.push(this.setCategories(categories));
        }
        const customers = this.getLocalStorageFallback('customers');
        if (customers.length > 0) {
            migrations.push(this.setCustomers(customers));
        }

        try {
            await Promise.all(migrations);
            console.log('Successfully migrated data from localStorage to JSONBin');
            return true;
        } catch (error) {
            console.error('Error during migration:', error);
            return false;
        }
    }
}
const jsonBinStorage = new JSONBinStorage();

export default jsonBinStorage;
