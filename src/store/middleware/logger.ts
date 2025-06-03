import { Middleware } from '@reduxjs/toolkit';

const logger: Middleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    return result;
};

export default logger;