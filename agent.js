'use strict';

class AgentBootHook {

  constructor(agent) {
    this.agent = agent;
  }

  async didLoad() {
    // 请将你的插件项目中 app.beforeStart 中的代码置于此处。
    await require('./lib/loader')(this.agent);
  }

}

module.exports = AgentBootHook;
