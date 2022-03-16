<p align="center">
  <img alt="logo" src="https://cdn.jsdelivr.net/gh/jon-millent/fire-cat/logo.png" width="200" max-width="100%">
</p>

<h1 align="center">
Fire Cat
</h1>
<h4 align="center">
基于koa的上层框架封装
</h4>


## 语言
[English](https://github.com/Jon-Millent/fire-cat/blob/main/README.md)
[中文](https://github.com/Jon-Millent/fire-cat/blob/main/README.zh-cn.md)


## FireCat
```typescript
import {FireCat} from "fire-cat";
import {fireCatRouter} from "./router";

const app = new FireCat();

app.koa.use(fireCatRouter.router.routes());
app.koa.listen('3010');

console.log(
  `🐳️app is running at http://127.0.0.1:3010`,
);
```

## 使用项目模板起步
### clone
`git clone https://github.com/Jon-Millent/fire-cat-started.git`

### 开发
`npm run dev`

### 打包
`npm run build`

### 部署
`pm2 start ecosystem.config.js`

## FireCatController
控制器

```typescript
class MyController extends FireCatController {
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```

#### 装饰器

##### Request
##### `Request()`
Request装饰器会合并处理用户请求参数，这样你就不用区分get和post请求的差异
```typescript
class MyController extends FireCatController {
  @Request()
  @Get('hello')
  hello(ctx: Context) {
    // 能够拿到参数
    console.log(ctx.response.body)
    ctx.body = "hello world"
  }
  
  @Request()
  @Post('hello2')
  hello2(ctx: Context) {
    // 也能够拿到参数
    console.log(ctx.response.body)
    ctx.body = "hello world"
  }
}
```

##### Get
##### `Get(path: string)`
get装饰器用来注册一个get请求到路由上
```typescript
class MyController extends FireCatController {
  @Get('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```

##### Post
##### `Post(path: string)`
post装饰器用来注册一个post请求到路由上
```typescript
class MyController extends FireCatController {
  @Post('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
```

## FireCatRouter
路由控制
```typescript
// 初始化
const fireCatRouter = new FireCatRouter()
```

### controller
#### `controller(path: string, contol: FireCatController)`
注册控制器到指定路由上，会自动映射控制器里面的路由

```typescript
const fireCatRouter = new FireCatRouter()

fireCatRouter.controller('/book', new MyController())
```

### group
#### `group(path: string, wrap: (router: FireGroupRouter) => void)`
分组路由

```typescript
const fireCatRouter = new FireCatRouter()

fireCatRouter.group('/book', (book) => {
  book.get('/foo', ()=> {})
  book.get('/bar', ()=> {})
  book.controller('/book', new SomeContoler())
})
```
