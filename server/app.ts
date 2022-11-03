import path from 'path';
import Koa from 'koa';
import koaBody from 'koa-body';
import cors from 'koa2-cors';
import mongoose from 'mongoose';
import koaStatic from 'koa-static';

// 路由文件
import pageRouter from './routes/page';

const app = new Koa();
// 解析 POST 请求
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, './public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    },
  })
);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/graduation', { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('[server] MongoDB connect error: ' + err);
  } else {
    console.log('[server] MongoDB connected!');
  }
});

app.use(koaStatic(path.join(__dirname, './public')));
app.use(cors());

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());
app.listen(3002);

// const demoRouter = require('./routes/demo');
// const connectRouter = require('./routes/connect');
// const apiRouter = require('./routes/api');
// const userRouter = require('./routes/user');

// app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
// app.use(userRouter.routes()).use(userRouter.allowedMethods());
// app.use(connectRouter.routes()).use(connectRouter.allowedMethods());
// app.use(demoRouter.routes()).use(demoRouter.allowedMethods());
