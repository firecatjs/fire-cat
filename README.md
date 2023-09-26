<div align="center">
<p align="center">
  <img alt="logo" src="https://cdn.jsdelivr.net/npm/fire-cat@2.0.9/logo-new.png" width="220" max-width="100%">
</p>

<h1 align="center">
Fire Cat
</h1>

koa-based upper frame encapsulation

![npm](https://img.shields.io/npm/v/fire-cat)
![GitHub](https://img.shields.io/github/license/jon-millent/fire-cat)
![npm](https://img.shields.io/npm/dm/fire-cat)


</div>



## Language
[English Doc](https://jon-millent.github.io/fire-cat/#/en/)
[中文文档](https://jon-millent.github.io/fire-cat/#/)

## Features
* Support package deployment
* Simple and easy to use

## Installation
Using npm:
```shell
npm i fire-cat
```
Using yarn:
```shell
yarn add fire-cat
```

## Use project templates
```shell
git clone https://github.com/Jon-Millent/fire-cat-started.git
```
```sheell
cd fire-cat-started
```

```sheell
yarn
```

## Usage

#### Create controller
`controller.ts`
```typescript
import {ApiDescription, FireCatController, Get, Request, Context} from "fire-cat";

export class HomeController extends FireCatController {

  @Get('/')
  @Request()
  @ApiDescription('index page')
  index(ctx: Context) {
    ctx.body = 'hello world'
  }

  @Get('/ping')
  @Request()
  @ApiDescription('ping page')
  ping(ctx: Context) {
    ctx.body = 'pang'
  }

}
```
#### Custom interceptor
```typescript
import {FireCatDecorator} from "fire-cat";

export const AuthLogin = function () {
  return FireCatDecorator.registerImplement((ctx, next) => {
    ctx.state.userInfo = {
      id: 1,
      name: 'fake',
      some: 'bar'
    }
    next()
  })
}
```

#### Use interceptors
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

#### Bind route
`router.ts`
```typescript
import {FireCatRouter} from "fire-cat";
import {HomeController} from "controller.ts";

const fireRouter = new FireCatRouter()

fireRouter.controller('/', new HomeController())

export default fireRouter
```

#### Start your application
`app.ts`
```typescript
import {FireCat} from "fire-cat";
import {fireCatRouter} from "router.ts";

const app = new FireCat();

app.koa.use(fireCatRouter.router.routes());
app.koa.listen('3010');

console.log(
  `🐳️app is running at http://127.0.0.1:3010`,
);
```

## Document
[English Doc](https://jon-millent.github.io/fire-cat/#/en/)
[中文文档](https://jon-millent.github.io/fire-cat/#/)


## license
### [MIT](https://github.com/Jon-Millent/fire-cat/blob/main/LICENSE)
