'use strict';

class AppBootHook {

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
    await require('./lib/loader')(this.app);
  }

}

module.exports = AppBootHook;