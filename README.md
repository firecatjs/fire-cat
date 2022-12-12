<p align="center">
  <img alt="logo" src="https://cdn.jsdelivr.net/npm/fire-cat@2.0.2/logo-new.png" width="220" max-width="100%">
</p>

<h1 align="center">
Fire Cat
</h1>
<h4 align="center">
koa-based upper frame encapsulation
</h4>


## Language
[English Doc](https://jon-millent.github.io/fire-cat/#/en/)
[中文文档](https://jon-millent.github.io/fire-cat/#/)

## FireCat

`controller`
```typescript
import {ApiDescription, FireCatController, Get, Request} from "fire-cat";
import {Context} from "fire-cat/lib/types";

export class HomeController extends FireCatController {

  @Get('')
  @Request()
  @ApiDescription('index page')
  index(ctx: Context) {
    ctx.body = 'hello world'
  }

  @Get('ping')
  @Request()
  @ApiDescription('ping page')
  ping(ctx: Context) {
    ctx.body = 'pang'
  }

}
```

`entry`
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
