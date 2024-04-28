"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'movie_list',
    entities: ["src/entity/*{.js}"],
    migrations: ["src/migration/*{.js}"],
    logging: true,
    synchronize: true,
    migrationsRun: true,
    migrationsTableName: 'history',
});
