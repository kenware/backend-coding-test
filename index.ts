'use strict';

const port = 8010;
import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

import buildSchemas from './src/schemas';
import logger from './src/utils/logger';
import appModule from './src/app';

db.serialize(() => {
    buildSchemas(db);

    const app = appModule(db);

    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});