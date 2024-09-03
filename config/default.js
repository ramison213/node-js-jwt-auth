module.exports = {
    logger: {
        colorsEnabled: process.env.COLORS_ENABLED || 0,
        logLevel: process.env.LOG_LEVEL || 'warn'
    },
    server: {
        port: process.env.PORT || 3001
    },
    data: {
        dbSource: process.env.DATA_BASE_SOURCE
    }
}