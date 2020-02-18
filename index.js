const express = require('express');
const path = require('path');
const csrf = require('csurf');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const MongoSession = require('connect-mongodb-session')(session);
const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const cardRouter = require('./routes/card');
const orderRouter = require('./routes/orders');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const MONGODB_URI = `mongodb+srv://Ivan:sofebo39@cluster0-2gt0p.mongodb.net/shop`;
const app = express(); // запуск сервера

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const store = new MongoSession({
    collection: 'sessions',
    uri: MONGODB_URI
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('5e3fe9c227cef83dda54a789');
//         req.user = user;
//         next();
//     } catch (e) {
//         console.log(e);
//     }
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret session',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/',homeRouter);
app.use('/add',addRouter);
app.use('/courses',coursesRouter);
app.use('/card', cardRouter);
app.use('/orders', orderRouter);
app.use('/auth', authRouter);


const PORT = process.env.PORT || 3000; // динамический порт

// при обновлении страницы происходит GET-запрос

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

        // const candidate = await User.findOne();
        //
        // if (!candidate) {
        //     const user = new User({
        //         email: 'Vostrikov@gmail.com',
        //         name: 'Ivan',
        //         cart: {items: []}
        //     });
        //     await user.save();
        // }

        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
