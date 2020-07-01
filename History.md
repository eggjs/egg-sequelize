
5.2.2 / 2020-07-01
==================

**fixes**
  * [[`665bbd6`](http://github.com/eggjs/egg-sequelize/commit/665bbd6ce3bee55ba3f7024a701cf5f1b87f1f21)] - fix: exception when change your config.delegate to other name, you will get an TypeError (#84) (bianchui <<bianchui@gmail.com>>)

5.2.1 / 2019-12-25
==================

**fixes**
  * [[`c2c9cf6`](http://github.com/eggjs/egg-sequelize/commit/c2c9cf693e96da31d32d478134cb67743608951f)] - fix: retry when db is busy. (#85) (金炳 <<1520006273@qq.com>>)
  * [[`47e9550`](http://github.com/eggjs/egg-sequelize/commit/47e955058340df7f984d1a206c2af9e4fd1491fd)] - fix: README.md (#81) (zfx <<502545703@qq.com>>)

**others**
  * [[`683298d`](http://github.com/eggjs/egg-sequelize/commit/683298dde706b34bdbdb6abd0cab6a7164495967)] - docs: add comment in index.d.ts (#78) (supperchong <<2267805901@qq.com>>)

5.2.0 / 2019-07-10
==================

**features**
  * [[`f760569`](http://github.com/eggjs/egg-sequelize/commit/f760569891daa99c72e2ccd905038cc9125d59f2)] - feat: add model.ctx (dead-horse <<dead_horse@qq.com>>)

5.1.0 / 2019-06-14
==================

**features**
  * [[`2632827`](http://github.com/eggjs/egg-sequelize/commit/263282739cafb22501069afe3304a8e2a76dbd7c)] - feat: :support connection uri with mysql. (#74) (Jeff <<jeff.tian@outlook.com>>)

5.0.1 / 2019-06-11
==================

**fixes**
  * [[`0fe964e`](http://github.com/eggjs/egg-sequelize/commit/0fe964e8f428285469513d5059b79edb39021d3c)] - fix: fix declaration error (#73) (吖猩 <<whxaxes@gmail.com>>)

**others**
  * [[`d813747`](http://github.com/eggjs/egg-sequelize/commit/d8137476aa6b593718ad67e1438d7c0086d7e63c)] - chore: fix default sequelize version in readme (#72) (Chao Xu @老干部 <<xuchao_zju@yeah.net>>)

5.0.0 / 2019-05-10
==================

**fixes**
  * [[`8deb42f`](http://github.com/eggjs/egg-sequelize/commit/8deb42f8d01e6982ecfdb9eff2628656f8a3c519)] - fix: fix version (dead-horse <<dead_horse@qq.com>>)

**others**
  * [[`c9f78b0`](http://github.com/eggjs/egg-sequelize/commit/c9f78b08f2d05eaa97dc5c5e807368a9c6188762)] - deps: sequelize upgrade to v5.0.0 (#71) (Akshay Kr Singh <<akshay.scythe@gmail.com>>)
  * [[`04c9e72`](http://github.com/eggjs/egg-sequelize/commit/04c9e72ffb1b19dbfcc42275e68fe5113eb5e2fc)] - docs: fix arrow function (#68) (TZ | 天猪 <<atian25@qq.com>>)

4.3.1 / 2019-01-08
==================

**fixes**
  * [[`ceaa7de`](http://github.com/eggjs/egg-sequelize/commit/ceaa7de7c66bf20d0d4e5d1fce912731feb7f6f0)] - fix: fix authenticate retry (#67) (Yiyu He <<dead_horse@qq.com>>)

4.3.0 / 2019-01-07
==================

**features**
  * [[`69c5750`](http://github.com/eggjs/egg-sequelize/commit/69c57508ee6c69a765af30f99ca3d73a9c764102)] - feat: support multiple data sources config (#66) (microud <<201458501212@ytu.edu.cn>>)

**others**
  * [[`15f08dd`](http://github.com/eggjs/egg-sequelize/commit/15f08dd830ef5eda8e3988f6c1da336d03861219)] - docs: port should be number (#64) (Haoliang Gao <<sakura9515@gmail.com>>)

4.2.0 / 2018-11-12
==================

**features**
  * [[`c4998e1`](http://github.com/eggjs/egg-sequelize/commit/c4998e1c9d60596a84086f8098764fb45624cbc1)] - feat: multi datasource support load same models (#63) (Yiyu He <<dead_horse@qq.com>>)

**others**
  * [[`b41598e`](http://github.com/eggjs/egg-sequelize/commit/b41598e7c33bb03403d2a3cbfaf172911a1187dc)] - chore: logger typo (#62) (TZ | 天猪 <<atian25@qq.com>>)

4.1.0 / 2018-08-31
==================

**features**
  * [[`cc30ec2`](http://github.com/eggjs/egg-sequelize/commit/cc30ec2f8883a5e8bd3d1b200f58fe1b2d476fa8)] - feat: support subproperty for delegate (#61) (Army <<army8735@qq.com>>)

4.0.7 / 2018-08-20
==================

**fixes**
  * [[`758c5ff`](http://github.com/eggjs/egg-sequelize/commit/758c5ffbc1884709f87d0354c63e280065360b06)] - fix: avoid set sequelize.ignore by mistake (dead-horse <<dead_horse@qq.com>>)

4.0.6 / 2018-08-20
==================

**fixes**
  * [[`a708411`](http://github.com/eggjs/egg-sequelize/commit/a70841113cbf239a547ecb5cfbb58016c41dc877)] - fix: make ctx.model or app.model configurable (dead-horse <<dead_horse@qq.com>>)
  * [[`63a2567`](http://github.com/eggjs/egg-sequelize/commit/63a25678ac73751031b39e5651ebd5abf69bc900)] - fix: use sequelize.exclude instead of sequelize.ignore (dead-horse <<dead_horse@qq.com>>)

4.0.5 / 2018-08-20
==================

**fixes**
  * [[`ff2bcbe`](http://github.com/eggjs/egg-sequelize/commit/ff2bcbe1516c57217844ee75282027d1da812e25)] - fix: avoid console log display conflict (dead-horse <<dead_horse@qq.com>>)
  * [[`a3ace2b`](http://github.com/eggjs/egg-sequelize/commit/a3ace2b0e90d156dc8fc85a9f8e5896a3bdf7cdd)] - fix: ctx.model extends app.model (dead-horse <<dead_horse@qq.com>>)

4.0.4 / 2018-08-17
==================

**fixes**
  * [[`708d020`](http://github.com/eggjs/egg-sequelize/commit/708d0207125cdfd99f0e968b76e42cd0440d1afd)] - fix: clean config (dead-horse <<dead_horse@qq.com>>)

4.0.3 / 2018-08-17
==================

**fixes**
  * [[`826f512`](http://github.com/eggjs/egg-sequelize/commit/826f512d9fbb12bd9f4f256ff063fbd5ef11c250)] - fix: improve tsd (shangyu <<shangyu.lin@qq.com>>)

**others**
  * [[`174d397`](http://github.com/eggjs/egg-sequelize/commit/174d3979e1abdb42317dad6e1ff7d9937c665615)] - docs: add tutorials (dead-horse <<dead_horse@qq.com>>)
  * [[`f1be646`](http://github.com/eggjs/egg-sequelize/commit/f1be64626959f719af32b4fbc03311bc332abe98)] - docs: fix example code path (dead-horse <<dead_horse@qq.com>>)
  * [[`975873f`](http://github.com/eggjs/egg-sequelize/commit/975873fdb67f21655833ad6ea1fff025f0042f51)] - docs: add default sequelize options (dead-horse <<dead_horse@qq.com>>)
  * [[`a6325bf`](http://github.com/eggjs/egg-sequelize/commit/a6325bf8a35366a3cf2bc41208043b100d4b68c1)] - chore: add sub model describe (dead-horse <<dead_horse@qq.com>>)

4.0.2 / 2018-08-14
==================

**fixes**
  * [[`a966ee4`](http://github.com/eggjs/egg-sequelize/commit/a966ee48809b91d896532f256fb4906ae9783a01)] - fix: fix default logging (dead-horse <<dead_horse@qq.com>>)

4.0.1 / 2018-08-13
==================

**fixes**
  * [[`a165ac1`](http://github.com/eggjs/egg-sequelize/commit/a165ac18014d8d53c6b9ba0c13634a2820a7c1ba)] - fix: remove bin file (dead-horse <<dead_horse@qq.com>>)

4.0.0 / 2018-08-13
==================

**features**
  * [[`654fdf9`](http://github.com/eggjs/egg-sequelize/commit/654fdf91a82ff68d54906f122e7f6b22007074ca)] - feat: support config.ignore (dead-horse <<dead_horse@qq.com>>)
  * [[`4c727a6`](http://github.com/eggjs/egg-sequelize/commit/4c727a66a2e7f8d0e18949bf1e90b87c2f6e217c)] - feat: support config.Sequelize (dead-horse <<dead_horse@qq.com>>)
  * [[`86d660d`](http://github.com/eggjs/egg-sequelize/commit/86d660d5557aa33aa113c91a1468c997a7dc2cc3)] - feat: support config.datasources to define more database (dead-horse <<dead_horse@qq.com>>)

**others**
  * [[`976ab6c`](http://github.com/eggjs/egg-sequelize/commit/976ab6cf8061c7926ebbc050d835581ec4434a34)] - deps: remove unused dependencies (dead-horse <<dead_horse@qq.com>>)
  * [[`0e59892`](http://github.com/eggjs/egg-sequelize/commit/0e598926780401379dac70a2530b844bf35b250f)] - docs: add migration in readme (dead-horse <<dead_horse@qq.com>>)
  * [[`4d1ac62`](http://github.com/eggjs/egg-sequelize/commit/4d1ac6247e337e110be31e46d58fb6bc4c0a25ae)] - docs: add multiple datasources in readme (dead-horse <<dead_horse@qq.com>>)
  * [[`bfd0c26`](http://github.com/eggjs/egg-sequelize/commit/bfd0c26dc451fee3a7adfc30268e3036cef8fb92)] - refactor: remove sequelize-cli integration (dead-horse <<dead_horse@qq.com>>)
  * [[`a5670ca`](http://github.com/eggjs/egg-sequelize/commit/a5670ca8fdc5c6134bfa56a761b582eadc690f45)] - refactor: use async function and only support egg@2 (dead-horse <<dead_horse@qq.com>>)
  * [[`e4b525e`](http://github.com/eggjs/egg-sequelize/commit/e4b525e18b0f39f517a560de7fe9bf819bddeddf)] - refactor: remove log rewrite (dead-horse <<dead_horse@qq.com>>)

3.1.5 / 2018-07-03
==================

**features**
  * [[`987e394`](http://github.com/eggjs/egg-sequelize/commit/987e3940da2bc392e1bb6da77055942c3ecf5b0e)] - feat(sequelize-cli): upgrade to 4.0.0 (#52) (Lpmvb <<xiangdemei@yahoo.com>>)

**others**
  * [[`ff79aba`](http://github.com/eggjs/egg-sequelize/commit/ff79aba467d13efbc017e08247925fcb93e6aaff)] - Retry 3 times on startup when database connect fail in temporary, to avoid Egg start failed. (#57) (Jason Lee <<huacnlee@gmail.com>>)

3.1.4 / 2018-05-02
==================

**fixes**
  * [[`1fb8585`](http://github.com/eggjs/egg-sequelize/commit/1fb858533132efb1ff2b2409ffa3656cb7b48b21)] - fix: add index.d.ts to pkg.files (#51) (duncup <<dlmsoft.wolf@gmail.com>>)

3.1.3 / 2018-04-13
==================

**fixes**
  * [[`c8a1c60`](http://github.com/eggjs/egg-sequelize/commit/c8a1c60244606158b1b3a4193433e764a60e0966)] - fix: using `sequelize.Options` for  sequelize config. (#48) (ZhengFang <<215566435@qq.com>>)

**others**
  * [[`2d63647`](http://github.com/eggjs/egg-sequelize/commit/2d6364795d62d91b7d498b2c3ec6fa3be8dc9b58)] - chore:TypeScript support. (#47) (duncup <<dlmsoft.wolf@gmail.com>>)

3.1.2 / 2018-02-27
==================

  * fix: auto create cli folder (#41)
  * docs: fix demo code (#42)

3.1.1 / 2018-02-06
==================

  * fix: EGG_SERVER_ENV support for seuqlieze cli (#40)
  * docs: fix db sync doc (#31)
  * docs: add README for `app.model` (#34)
  * docs(README): fix a typo (#33)

3.1.0 / 2017-08-03
==================

  * deps: update dependencies (#26)
  * refactor: rewrite cli script with plain js instead of Shell to support multi-platform. (#25)
  * docs: add a migration example for show up use `co.wrap`. (#24)
  * docs: fix migration url (#22)
  * docs: update history (#21)

3.0.1 / 2017-06-19
==================

  * fix: init associate should after load of models (#20)

3.0.0 / 2017-06-19
==================

  * feat: Upgrade Sequelize V4. (#18)
  * docs: add sync docs (#17)
  * docs(readme): fix the full example with association (#16)

2.1.4 / 2017-05-11
==================

  * fix(migration): always use production config (#14)

2.1.3 / 2017-05-11
==================

  * fix: Migration load config.seuqelize for function type config support.

2.1.2 / 2017-05-11
==================

  * fix: egg-sequelize bin to find correct sequelize-cli path in node_modules.

2.1.1 / 2017-05-10
==================

  * feat: add `egg-sequelize` bin for Sequelize migrations support. (#11)

2.0.2 / 2017-04-27
==================

  * fix: ignore non Sequelize files in app/model path for Model loader. (#10)
  * docs: add Suggestions and License (#8)
  * feat: use underscore style column name as default (#7)
  * docs: add info about how to enable sequelize plugin (#6)

2.0.1 / 2017-03-14
==================

  * fix: Allow all of Sequelize options in `config.sequelize` (#5)

2.0.0 / 2017-03-13
==================

  * feat: [BREAKING_CHANGE] Update default Sequelize configs (#4)

1.0.0 / 2017-02-19
==================

  * chore: complete unittest (#2)
  * feat: use loader API to load models (#3)

