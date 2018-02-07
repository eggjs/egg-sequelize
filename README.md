# egg-sequelize

[Sequelize](http://sequelizejs.com) plugin for Egg.js.

> NOTE: This plugin just for integrate Sequelize into Egg.js, more documentation please visit http://sequelizejs.com.

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

## Install

```bash
$ npm i --save egg-sequelize
$ npm install --save mysql2 # For both mysql and mariadb dialects

# Or use other database backend.
$ npm install --save pg pg-hstore # PostgreSQL
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

> NOTE: `app.model` is an [Instance of Sequelize](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor), so you can use methods like: `app.model.sync, app.model.query ...`

```js
// app/model/user.js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    login: STRING,
    name: STRING(30),
    password: STRING(32),
    age: INTEGER,
    last_sign_in_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByLogin = function* (login) {
    return yield this.findOne({
      where: {
        login: login
      }
    });
  }

  User.prototype.logSignin = function* () {
    yield this.update({ last_sign_in_at: new Date() });
  }

  return User;
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

    * show() {
      const user = yield this.ctx.model.User.findByLogin(this.ctx.params.login);
      yield user.logSignin();
      this.ctx.body = user;
    }
  }
}
```

### Full example

```js
// app/model/post.js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Post = app.model.define('Post', {
    name: STRING(30),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Post.associate = function() {
    app.model.Post.belongsTo(app.model.User, { as: 'user' });
  }

  return Post;
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

**We strongly recommend you to use [migrations](https://github.com/eggjs/egg-sequelize#migrations) to create or migrate database.**

**This code should only be used in development.**

```js
// {app_root}/app.js
  module.exports = app => {
    if (app.config.env === 'local') {
      app.beforeStart(function* () {
        yield app.model.sync({force: true});
      });
    }
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

For `unittest` environment:

```bash
$ EGG_SERVER_ENV=unittest npm run migrate:up
```

or for `prod` environment:

```bash
$ EGG_SERVER_ENV=prod npm run migrate:up
```

or for others environment:

```bash
$ EGG_SERVER_ENV=pre npm run migrate:up
```

This will load database config from `config/config.pre.js`.

Write migrations with **Generator** friendly, you should use `co.wrap` method:

```js
'use strict';
const co = require('co');

module.exports = {
  up: co.wrap(function *(db, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize;

    yield db.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });

    yield db.addIndex('users', ['email'], { indicesType: 'UNIQUE' });
  }),

  down: co.wrap(function *(db, Sequelize) {
    yield db.dropTable('users');
  }),
};
```

And you may need to read [Sequelize - Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) to learn about how to write Migrations.

## Recommended example

- https://github.com/eggjs/examples/tree/master/sequelize-example/

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

