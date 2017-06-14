# egg-sequelize

Sequelize plugin in egg

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-sequelize.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-sequelize
[travis-image]: https://img.shields.io/travis/eggjs/egg-sequelize.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-sequelize
[codecov-image]: https://codecov.io/gh/eggjs/egg-sequelize/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eggjs/egg-sequelize
[david-image]: https://img.shields.io/david/eggjs/egg-sequelize.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-sequelize
[snyk-image]: https://snyk.io/test/npm/egg-sequelize/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-sequelize
[download-image]: https://img.shields.io/npm/dm/egg-sequelize.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-sequelize

Egg's sequelize plugin.

## Install

```bash
$ npm i --save egg-sequelize

# And one of the following:
$ npm install --save pg pg-hstore
$ npm install --save mysql # For both mysql and mariadb dialects
$ npm install --save tedious # MSSQL
```


## Usage & configuration

- `config.default.js`
```js
exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'test',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',

  migrationsPath: './migrations', // defined your migrations file path
};
```
- `config/plugin.js`
``` js
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}
```
- `package.json`
```json
{
  "scripts": {
    "migrate:new": "egg-sequelize migration:create",
    "migrate:up": "egg-sequelize db:migrate",
    "migrate:down": "egg-sequelize db:migrate:undo"
  }
}
```


More documents please refer to [Sequelize.js](http://sequelize.readthedocs.io/en/v3/)

## Model files

Please put models under `app/model` dir.

## Conventions

| model file      | class name            |
| --------------- | --------------------- |
| `user.js`       | `app.model.User`      |
| `person.js`     | `app.model.Person`    |
| `user_group.js` | `app.model.UserGroup` |

- Tables always has timestamp fields: `created_at datetime`, `updated_at datetime`.
- Use underscore style column name, for example: `user_id`, `comments_count`.

## Examples

### Standard

Define a model first.

```js
// app/model/user.js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('user', {
    login: STRING,
    name: STRING(30),
    password: STRING(32),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    classMethods: {
      * findByLogin(login) {
        return yield this.findOne({ login: login });
      },
    },
  });
};

```

Now you can use it in your controller:

```js
// app/controller/user.js
module.exports = app => {
  return class UserController extends app.Controller {
    * index() {
      const users = yield this.ctx.model.User.findAll();
      this.ctx.body = users;
    }
  }
}
```

### Full example



```js
// app/model/post.js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  return app.model.define('Post', {
    name: STRING(30),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    classMethods: {
      associate() {
        app.model.Post.belongsTo(app.model.User, { as: 'user' });
      }
    }
  });
};
```


```js
// app/controller/post.js
module.exports = app => {
  return class PostController extends app.Controller {
    * index() {
      const posts = yield this.ctx.model.Post.findAll({
        attributes: [ 'id', 'user_id' ],
        include: { model: this.ctx.model.User, as: 'user' },
        where: { status: 'publish' },
        order: 'id desc',
      });

      this.ctx.body = posts;
    }

    * show() {
      const post = yield this.ctx.model.Post.findById(this.params.id);
      const user = yield post.getUser();
      post.setDataValue('user', user);
      this.ctx.body = post;
    }

    * destroy() {
      const post = yield this.ctx.model.Post.findById(this.params.id);
      yield post.destroy();
      this.ctx.body = { success: true };
    }
  }
}
```

## Sync model to db

Mention, If you want to sync models you defined to db(mysql or etc.), you should put sync operation in `app.js`.

```js
// {app_root}/app.js
  module.exports = app => {
    app.beforeStart(function* () {
      yield app.model.sync({force: true});
    });
  };
```

## Migrations

If you have added scripts of egg-sequelize into your `package.json`, now you can:

| Command | Description |
|-----|------|
| npm run migrate:new | Generate a new Migration file to ./migrations/ |
| npm run migrate:up | Run Migration |
| npm run migrate:down | Rollback once Migration |

For example:

```bash
$ npm run migrate:up
```

For `test` environment:

```bash
$ NODE_ENV=test npm run migrate:up
```

or for `production` environment:

```bash
$ NODE_ENV=production npm run migrate:up
```

And you may need to read [Sequelize - Migrations](http://docs.sequelizejs.com/en/v3/docs/migrations/) to learn about how to write Migrations.

## Recommended example

- https://github.com/eggjs/examples/tree/master/sequelize-example/

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

