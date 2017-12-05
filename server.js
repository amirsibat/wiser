import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'

import {MONGOURL} from './utils/constants'
import router from './app/routes'


const app = new Koa();
// connect to local mongodb database
const db = mongoose.connection;
mongoose.connect(MONGOURL);
db.on('error', (error) => {
    console.error('Database connection error!');
    throw error
});
db.once('connected', function() {
    console.log('Connected to database')
});

// Body parser
app.use(bodyParser());

// A universal interceptor that prints the ctx each time a request is made on the server
if (process.env.NODE_ENV !== 'production') {
    app.use(async (ctx, next) => {
        console.log(ctx);
    await next()
})
}

// Error handling
app.use(async function(ctx, next) {
    try {
        await next()
    } catch (err) {
        // error 401 handling
        if (err.status === 401) {
            ctx.status = 401;
            ctx.set('WWW-Authenticate', 'Basic');
            ctx.body = 'No Way Jose'
        }
        ctx.app.emit('error', err, ctx);
    }
});

// Load the router into the Koa app
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server listening on', port));
