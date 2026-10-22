const logger = {
    info: (message, meta = {}) => {
        const timestamp = new Date().toISOString();
        console.log(JSON.stringify({ timestamp, level: 'INFO', message, ...meta }));
    },
    error: (message, error = {}, meta = {}) => {
        const timestamp = new Date().toISOString();
        console.error(JSON.stringify({
            timestamp,
            level: 'ERROR',
            message,
            errorMessage: error.message || error,
            errorStack: error.stack,
            ...meta
        }));
    },
    warn: (message, meta = {}) => {
        const timestamp = new Date().toISOString();
        console.warn(JSON.stringify({ timestamp, level: 'WARN', message, ...meta }));
    },
    debug: (message, meta = {}) => {
        if (process.env.NODE_ENV !== 'production') {
            const timestamp = new Date().toISOString();
            console.log(JSON.stringify({ timestamp, level: 'DEBUG', message, ...meta }));
        }
    }
};

export default logger;
