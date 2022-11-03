import Router from 'koa-router';
import pageModel from '../models/page';

const router = new Router();

// 获取全部实例列表
router.get('/getAllPages', async (ctx, next) => {
  const pageList = await pageModel.find();
  ctx.body = {
    errno: 0,
    data: {
      pageList,
    },
  };
});

// 获取某一实例列表
router.get('/getPage', async (ctx, next) => {
  const id = ctx.query.id;
  const item = await pageModel.findById(id);

  ctx.body = {
    errno: 0,
    data: item,
  };
});

// 新建可视化图表
router.post('/createPage', async (ctx, next) => {
  const body = ctx.request.body;

  if (!body.title || typeof body.title != 'string') {
    ctx.body = {
      errno: 1,
      errmsg: '格式错误',
    };
    return;
  }

  const result = await pageModel.create({
    title: body.title,
    img: '',
    id: body.id,
    pageData: {},
  });

  ctx.body = {
    errno: 0,
    data: result,
  };
});

// 更新可视化图表
router.post('/updatePage', async (ctx, next) => {
  const body = ctx.request.body;

  const item = await pageModel.findById(body.id);
  if (body.title) {
    item.title = body.title;
  } else if (body.pageData) {
    item.pageData = body.pageData;
    item.img = body.img;
  }
  item.save();

  ctx.body = {
    errno: 0,
  };
});

// 删除可视化图表
router.post('/deletePage', async (ctx, next) => {
  const body = ctx.request.body;

  const item = await pageModel.findById(body.id);
  item.remove();

  ctx.body = {
    errno: 0,
  };
});

// 复制、导入可视化图表
// router.post('/import/:id', async (ctx, next) => {
//   const body = ctx.request.body;

//   const originItem = await pageModel.findById(ctx.params.id);

//   const newItem = await pageModel.create({
//     title: body.title ? body.title : originItem.title + '_导入',
//     img: originItem.img,
//     uid: body.uid,
//     view: 0,
//     chartData: originItem.chartData,
//   });

//   ctx.body = {
//     errno: 0,
//   };
// });

export default router;
