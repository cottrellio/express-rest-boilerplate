import express from 'express';
import bodyParser from 'body-parser';

import db from './db';
import router from './router';

// App Setup.
const port = process.env.PORT || 3000;
const app = express();

// Middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

// Server.
app.listen(port, function() {
  console.log(`App running on port ${port}...`);
});

export { app };