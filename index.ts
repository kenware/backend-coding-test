import buildSchemas from './src/schemas';
import logger from './src/utils/logger';
import appModule from './src/app';
import openDb from './src/database';

const port = 8010;

(async () => {
  const db = await openDb();
  buildSchemas(db);
  const app = appModule(db);

  app.listen(port, () => logger.info(`App started and listening on port ${port}`));
})();
