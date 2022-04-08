## start
### Quick start

The `fire-cat` template project is recommended
```git
git clone https://github.com/Jon-Millent/fire-cat-started.git
````

Or install it yourself into an existing project

```yarn
yarn add fire-cat
````

````npm
npm install fire-cat
````

### Project directory structure
````file-tree
*build
*src
    * config [config file]
    * controller [controller]
    * router [route]
    index.ts
````

### start up
```shell
npm run dev
````
````text
🐳️app is running at http://127.0.0.1:3000
````

## fire-cat
### Controller
#### FireCatController

Controllers are generally used with `decorators`, controllers without decorators have no soul
```typescript
class MyController extends FireCatController {
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
````
### Decorators
#### Request
```typescript
Request()
````
The Request decorator merges user request parameters so you don't have to distinguish between `get` and `post` requests
````text
class MyController extends FireCatController {
  @Request()
  @Get('hello')
  hello(ctx: Context) {
    // can get parameters
    console.log(ctx.response.body)
    ctx.body = "hello world"
  }
  
  @Request()
  @Post('hello2')
  hello2(ctx: Context) {
    // can also get parameters
    console.log(ctx.response.body)
    ctx.body = "hello world"
  }
}
````
#### Get
````text
Get(path: string)
````
The `get` decorator is used to register a `get` request to the route
```typescript
class MyController extends FireCatController {
  @Get('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
````
#### Post
````text
Post(path: string)
````
The post decorator is used to register a post request to the route
```typescript
class MyController extends FireCatController {
  @Post('hello')
  hello(ctx: Context) {
    ctx.body = "hello world"
  }
}
````
### Routing
routing control
```typescript
// initialize
const fireCatRouter = new FireCatRouter()
````

#### Registering controller routes
````text
controller(path: string, control: FireCatController)
````
Registering the controller to the specified route will automatically map the routes in the controller
```typescript
const fireCatRouter = new FireCatRouter()

fireCatRouter.controller('/book', new MyController())
````

#### Register packet routing
````text
group(path: string, wrap: (router: FireGroupRouter) => void)
````
packet routing

```typescript
const fireCatRouter = new FireCatRouter()

fireCatRouter.group('/book', (book) => {
  book.get('/foo', ()=> {})
  book.get('/bar', ()=> {})
  book.controller('/book', new SomeContoler())
})
````

### verify
`fire-cat` provides a basic authentication solution
First of all, you have to inherit the controller and implement the processing after the verification fails.
```typescript
import {FireCatVerifyWrap} from "fire-cat";
import {Context} from "fire-cat/lib/types";

class AppVerifyController extends FireCatController {
  async wrap(ctx: Context, message: string) {
    ctx.body = {
      msg: message
    }
  }
}
````

Then register a custom validation interceptor
```typescript
export const AppVerify = FireCatVerifyWrap(async (message, ctx, next)=> {
  if (message) {
    await new AppVerifyController().wrap(ctx, message.message)
  } else {
    await next()
  }
})
````

You can implement validation in the controller. Validation is based on `fastest-validator`, `schema` creates rules, please refer to [fastest-validator documentation](https://github.com/icebob/fastest-validator)
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
````

```typescript
// /controllre/book/index.ts
import {Post, Request} from "fire-cat";

export default class BookController extends FireCatController {
  @Request()
  @Post('create')
  @AppVerify(schema.createBook) // Verify
  async createBook(ctx: Context) {
    // After passing, it will enter the controller
    // ...
  }
}
````

## custom decorator
Many times, we use the koa middleware to implement the function of the interceptor. In `fire-cat`, you only need to use the decorator to easily implement this function.
### Create custom decorator
```typescript
import {FireCatDecorator} from "fire-cat";

// verify login
export const AuthLogin = function () {
  return FireCatDecorator.register({
    wrap(ctx, next) {
      // Simulate parsing out user data
      ctx.state.userInfo = {
        id: 1,
        name: 'fake',
        some: 'bar'
      }
      next()
    }
  })
}
````
Then you can use this interceptor inside the controller
```typescript
class MyController extends FireCatController {
  @Post('hello')
  @AuthLogin()
  hello(ctx: Context) {
    console.log(ctx.state.userInfo)
    ctx.body = "hello world"
  }
}
````
## Best Practices
### Implement your own controller
The advantage of implementing your own controller is that you can flexibly extend the controller method.
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
````
Then you can use it happily
```typescript
class MyController extends AppController {
  @Post('hello')
  hello(ctx: Context) {
    ctx.body = this.success({
      list: [1, 2, 3]
    })
  }
}
````

## deploy
### Pack
`npm run build`

### Server start
`pm2 start ecosystem.config.js`