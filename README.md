<p align="center">
  <img alt="logo" src="https://cdn.jsdelivr.net/gh/jon-millent/fire-cat/logo-new.png" width="200" max-width="100%">
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
```typescript
import {FireCat} from "fire-cat";
import {fireCatRouter} from "./router";

const app = new FireCat();

app.koa.use(fireCatRouter.router.routes());
app.koa.listen('3010');

console.log(
  `🐳️app is running at http://127.0.0.1:3010`,
);
