const { server: srvConfig, data: dataConfig } = require('config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = srvConfig.port;
const dbSource = dataConfig.dbSource;
const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})
