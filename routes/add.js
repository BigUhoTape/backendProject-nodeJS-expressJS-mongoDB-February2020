const {Router} = require('express');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const router = Router();

router.get('/', auth, (req,res) => {
    res.render('add', {
        title: 'Add courses page',
        isAdd: true
    });
});

// router.post('/', async (req, res) => {
//    const course = new Course(req.body.title, req.body.price, req.body.img);
//    await course.save();
//
//    res.redirect('/courses');
// });

router.post('/', auth, async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    });

    try {
        await course.save(); // save() сохраняет обьект в бд
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;