require('dotenv').config();
const { server: srvConfig, data: dataConfig } = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('./utils/logger')(path.basename(__filename));
const { router } = require('./routers/index');

const port = srvConfig.port;
const dbSource = dataConfig.dbSource;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

mongoose.connect(dbSource)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => {
        logger.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

try {
    app.listen(port, () => {
        logger.info(`Server is now listening on port ${port}`);
    });
} catch (error) {
    logger.error('Failed to start the server:', error);
}
