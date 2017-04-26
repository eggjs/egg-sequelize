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
  modelDir: 'app/model', // specify model dir path
  modelAccessName: 'model' // custom model access path, default `app.model`
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
      const post.user = yield post.getUser();
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

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)

