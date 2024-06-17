## 开始
### 快速开始

推荐使用`fire-cat`模板项目
```git
git clone https://github.com/Jon-Millent/fire-cat-started.git
```

或者自己安装到现有项目里

```yarn
yarn add fire-cat
```

```npm
npm install fire-cat
```

### 项目目录结构
```file-tree
* build
* src
    * config [配置文件]
    * controller [控制器]
    * router [路由]
    index.ts
```

### 启动
```shell
npm run dev
```
```text
🐳️app is running at http://127.0.0.1:3000
```

## fire-cat
### 控制器
#### FireCatController

控制器一般搭配`装饰器`使用，没有装饰器的控制器是没有灵魂的
```typescript
class MyController extends FireCatController {
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```
### 装饰器

### 请求装饰器
fire-cat 内置了 `Get`, `Post`, `Del` 等请求装饰器，这些请求装饰器推荐写在装饰器的最顶层。

#### Get
```text
Get(path: string)
```
`get`装饰器用来注册一个`get`请求到路由上
```typescript
class MyController extends FireCatController {
  @Get('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```
#### Post
```text
Post(path: string)
```
post装饰器用来注册一个post请求到路由上
```typescript
class MyController extends FireCatController {
  @Post('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```

#### Request
```typescript
Request()
```
Request装饰器会合并处理用户请求参数，这样你就不用区分`get`和`post`请求的差异
```typescript
class MyController extends FireCatController {
  @Get('hello')
  @Request()
  hello(ctx: Context) {
    // 能够拿到参数
    console.log(ctx.request.body)
    ctx.body = "hello world"
  }

  @Post('hello2')
  @Request()
  hello2(ctx: Context) {
    // 也能够拿到参数
    console.log(ctx.request.body)
    ctx.body = "hello world"
  }
}
```

### 路由
路由控制
```typescript
// 初始化
const fireCatRouter = new FireCatRouter()
```

#### 注册控制器路由
```text
controller(path: string, control: FireCatController)
```
注册控制器到指定路由上，会自动映射控制器里面的路由
```typescript
const fireCatRouter = new FireCatRouter()

fireCatRouter.controller('/book', new MyController())
```

#### 注册分组路由
```text
group(path: string, wrap: (router: FireGroupRouter) => void)
```
分组路由

```typescript
const fireCatRouter = new FireCatRouter()

fireCatRouter.group('/book', (book) => {
  book.get('/foo', ()=> {})
  book.get('/bar', ()=> {})
  book.controller('/book', new SomeContoler())
})
```

### 验证
`fire-cat`提供了基本的验证的解决方案
首先你要继承控制器，实现对验证失败后的处理
```typescript
import {FireCatVerifyWrap, Context} from "fire-cat";

class AppVerifyController extends FireCatController {
  async wrap(ctx: Context, message: string) {
    ctx.body = {
      msg: message
    }
  }
}
```

然后注册自定义的验证拦截器
```typescript
export const AppVerify = FireCatVerifyWrap(async (message, ctx, next)=> {
  if (message) {
    await new AppVerifyController().wrap(ctx, message.message)
  } else {
    await next()
  }
})
```

就可以在控制器实现验证，验证基于`fastest-validator`，`schema`创建规则请参见 [fastest-validator文档](https://github.com/icebob/fastest-validator)
```typescript
// /controllre/book/schema.ts
import {createSchema} from "fire-cat";
export default {
  createBook: createSchema({
    name: {
      type: 'string',
      empty: false,
      max: 255,
    },
    auther: {
      type: 'string',
      empty: false,
      max: 100,
    }
  }),
}
```

```typescript
// /controllre/book/index.ts
import {Post, Request} from "fire-cat";

export default class BookController extends FireCatController {
  @Post('create')
  @Request()
  @AppVerify(schema.createBook) // 验证
  async createBook(ctx: Context) {
    // 通过后才会进入到控制器里面
    // ...
  }
}
```

## 自定义装饰器
很多时候，我们使用koa中间件来实现拦截器的功能，在`fire-cat`中，你只需要使用装饰器，就可以简单实现这个功能。
### 创建自定义装饰器
```typescript
import {FireCatDecorator} from "fire-cat";

// 验证登陆
export const AuthLogin = function () {
  return FireCatDecorator.registerImplement(async (ctx, next) => {
    // 模拟解析出用户数据
    ctx.state.userInfo = {
      id: 1,
      name: 'fake',
      some: 'bar'
    }
    await next()
  })
}
```
然后你就可以在控制器里面使用这个拦截器了  
注意⚠️：一定要在async的方法里面 await next()
```typescript
class MyController extends FireCatController {
  @Post('hello')
  @AuthLogin()
  hello(ctx: Context) {
    console.log(ctx.state.userInfo)
    ctx.body = "hello world"
  }
}
```

## 文档服务
### 开启文档服务
```typescript
fireCatRouter.enableDocument()
```
自定义文档服务路径
```typescript
fireCatRouter.enableDocument('/document')
```
自定义文档描述
```typescript
fireCatRouter.enableDocument('/document', {
  title: '接口文档',
  description: '这是接口文档',
  date: '2022-05-20',
  version: '1.0.0'
})
```

#### ApiDescription
```text
ApiDescription(des: string)
```
对请求进行描述，会渲染到最终的文档里面
```typescript
class MyController extends FireCatController {
  @ApiDescription('这是一个请求')
  @Post('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```

## 最佳实践
### 实现自己的控制器
实现自己的控制器的好处，是可以灵活拓展控制器方法。
```typescript
import {FireCatController} from "fire-cat";

export class AppController extends FireCatController {
  success(props: object) {
    return {
      code: 200,
      data: props
    }
  }
  error(props: object) {
    return {
      code: 500,
      data: props
    }
  }
}
```
然后你就可以愉快的使用
```typescript
class MyController extends AppController {
  @Post('hello')
  hello(ctx: Context) {
    ctx.body = this.success({
      list: [1, 2, 3]
    })
  }
}
```

## 部署
### 打包
`npm run build`

### 服务端启动
`pm2 start ecosystem.config.js`
