# DB

### IMPORTANT - The directories migrations, schemas and seeds are not `.ts` because the sequelize-cli only accept `.js`

For run migrations run:
`yarn sequelize db:migrate`

For rollback migrations run:
`yarn sequelize db:migrate:undo:all`

For run seeds run:
`yarn sequelize db:seed:all`

For create new model run:
`yarn sequelize model:generate --name <ModelName> --attributes <attributeName>:string`
