
var koa = require('koa');
var auth = require('./');
var app = koa();

// custom 401 handling

app.use(function *(next){
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.set('WWW-Authenticate', 'Basic');
      this.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

// require auth

app.use(auth({ name: 'tj', pass: 'tobi' }));

// secret response

app.use(function *(){
  this.body = 'secret';
});

app.listen(3000);
console.log('listening on port 3000');