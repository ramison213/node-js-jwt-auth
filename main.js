const { server: srvConfig, data: dataConfig } = require('config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('./utils/logger')(path.basename(__filename));

const port = srvConfig.port;
const dbSource = dataConfig.dbSource;
const app = express();
app.use(express.json());

app.listen(port, () => {
    logger.info(`Server is now listening on port ${port}`);
})
