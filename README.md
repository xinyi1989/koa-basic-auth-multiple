
## Installation

```js
$ npm install koa-basic-auth-multiple
```

## Example

  Password protect downstream middleware:

```js
const auth = require('koa-basic-auth-multiple');
const Koa = require('koa');
const app = new Koa();

// custom 401 handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

// require auth
app.use(auth([{ name: 'tj', pass: 'tobi' },{ name: 'tj2', pass: 'tobi2' }]));

// secret response
app.use(async (ctx) => {
  ctx.body = 'secret';
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});
```

  Example request:

    $ curl -H "Authorization: basic dGo6dG9iaQ==" http://localhost:3000/ -i
    HTTP/1.1 200 OK
    X-Powered-By: koa
    Content-Type: text/plain; charset=utf-8
    Content-Length: 6
    Date: Sat, 30 Nov 2013 19:35:17 GMT
    Connection: keep-alive

    secret

## License

  MIT
