const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const merchantApi = require('./router/merchantAPI');
const customerApi = require('./router/customerAPI');
const feedbackApi = require('./router/feedbackAPI');
const analyticsApi = require('./router/analyticsAPI');
const invoice = require('./router/InvoiceGenerator');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors());
app.use('/merchant', merchantApi);
app.use('/customer', customerApi);
app.use('/feedback', feedbackApi);
app.use('/analytics', analyticsApi);
app.use('/invoice', invoice);

const host = '0.0.0.0';
const port = process.env.PORT || 8000;
app.listen(port, host, () => {
    console.log(`Server is listening on ${host} at ${port}`);
});
