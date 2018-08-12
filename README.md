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
  // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  // ignore: 'index.js', // ignore `app/${baseDir}/index.js` when load models
};
```

- `config/plugin.js`

``` js
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
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

  User.findByLogin = async (login) => {
    return this.findOne({
      where: {
        login: login
      }
    });
  }

  User.prototype.logSignin = async () => {
    return this.update({ last_sign_in_at: new Date() });
  }

  return User;
};

```

Now you can use it in your controller:

```js
// app/controller/user.js
module.exports = app => {
  return class UserController extends app.Controller {
    async index() {
      const users = await this.ctx.model.User.findAll();
      this.ctx.body = users;
    }

    async show() {
      const user = await this.ctx.model.User.findByLogin(this.ctx.params.login);
      await user.logSignin();
      this.ctx.body = user;
    }
  }
}
```

### Associate

Define all your associations in `Model.associate()` and egg-sequelize will execute it after all models loaded. See example below.

### Multiple Datasources

egg-sequelize support load multiple datasources independently. You can use `config.sequelize.datasources` to configure and load multiple datasources.

```js
// config/config.default.js
exports.sequelize = {
  datasources: [
    {
      delegate: 'model', // load all models to app.model and ctx.model
      baseDir: 'model', // load models from `app/model/*.js`
      database: 'biz',
      // other sequelize configurations
    },
    {
      delegate: 'admninModel', // load all models to app.adminModel and ctx.adminModel
      baseDir: 'admin_model', // load models from `app/admin_model/*.js`
      database: 'admin',
      // other sequelize configurations
    },
  ],
};
```

### Customize Sequelize

By default, egg-sequelize will use sequelize@4, you can cusomize sequelize version by pass sequelize instance with `config.sequelize.Sequelize` like this:

```js
// config/config.default.js
exports.sequelize = {
  sequelize: require('sequelize');
};
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
    async index() {
      const posts = await this.ctx.model.Post.findAll({
        attributes: [ 'id', 'user_id' ],
        include: { model: this.ctx.model.User, as: 'user' },
        where: { status: 'publish' },
        order: 'id desc',
      });

      this.ctx.body = posts;
    }

    async show() {
      const post = await this.ctx.model.Post.findById(this.params.id);
      const user = await post.getUser();
      post.setDataValue('user', user);
      this.ctx.body = post;
    }

    async destroy() {
      const post = await this.ctx.model.Post.findById(this.params.id);
      await post.destroy();
      this.ctx.body = { success: true };
    }
  }
}
```

## Sync model to db

**We strongly recommend you to use [Sequelize - Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) to create or migrate database.**

**This code should only be used in development.**

```js
// {app_root}/app.js
  module.exports = app => {
    if (app.config.env === 'local' || app.config.env === 'unittest') {
      app.beforeStart(async () => {
        await app.model.sync({force: true});
      });
    }
  };
```

## Recommended example

- https://github.com/eggjs/examples/tree/master/sequelize-example/

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

