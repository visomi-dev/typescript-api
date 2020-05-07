import { Sequelize } from 'sequelize';

import env from '../constants/env';

const sequelize = new Sequelize(env.POSTGRES_DB_URL);

export default sequelize;
