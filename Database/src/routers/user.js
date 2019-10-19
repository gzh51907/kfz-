const express = require('express');

const Router = express.Router();
const {
    mongo
} = require('../db');
const {
    fromatData,
    token
} = require('../utils');

// 后台管理系统添加新用户
Router.post('/addBg', async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let result;

    let exist = await mongo.find('user', {
        username
    });

    if (exist.length) {
        result = fromatData({
            code: 0
        })
    } else {
        await mongo.create('user', [{
            username,
            password,
            regtime: new Date().toLocaleDateString(),
            nameWrite: "1",
            passwordWrite: "1",
        }]);
        result = fromatData()
    }

    res.send(result);
})

// 后台管理系统修改密码
Router.post('/alterBg', async (req, res) => {
    let {
        username,
        password
    } = req.body;
    console.log(username, password);


    let result = await mongo.update('user', {
        username
    }, {
        $set: {
            username,
            password
        }
    });
    res.send(result);
})


// 后台管理系统查询用户
Router.get('/searchBg', async (req, res) => {
    let {
        username
    } = req.query
    console.log(req.query);

    let result = await mongo.find('user', {
        username: RegExp(username)
    });

    res.send(result);

});





// 注册
// /user/reg
Router.post('/reg', async (req, res) => {
    let {
        username,
        password
    } = req.body;
    let result;

    console.log(req.body);

    try {
        await mongo.create('user', [{
            username,
            password,
            regtime: new Date().toLocaleDateString()
        }]);
        result = fromatData()
    } catch (err) {
        result = fromatData({
            code: 0
        })
    }

    res.send(result);
})

Router.get('/check', async (req, res) => {
    let {
        username
    } = req.query;

    let result = await mongo.find('user', {
        username
    });
    if (result.length) {
        res.send(fromatData({
            code: 0
        }));
    } else {
        res.send(fromatData());
    }
})
//登录
Router.get('/login', async (req, res) => {
    let {
        username,
        password,
        mdl
    } = req.query;

    let result = await mongo.find('admin', {
        username,
        password

    });
    console.log(result);

    if (result.length) {
        let Authorization;
        //如果用户需要免登录操作，则生成一个token并返回给前端
        if (mdl) {
            Authorization = token.create(username);
        }
        res.send(fromatData({
            data: Authorization
        }));
    } else {
        res.send(fromatData({
            code: 0
        }));
    }
})

Router.post('/', async (req, res) => {
    let result = await mongo.create('goods', [{
        username: "pengyh",
        age: 18,
        password: "123456789"
    }]);
    res.send(result);
});

Router.get('/', async (req, res) => {
    let result = await mongo.find('user', {});
    res.send(result);

});

// 后台管理系统删除用户
Router.post('/delete', async (req, res) => {

    let username = req.body;
    console.log(username);

    let result = await mongo.remove('user',
        username = username
    );
    res.send(result);

});


Router.patch('/', async (req, res) => {
    console.log(req.query);

    let result = await mongo.update('user', {
        username
    }, {
        $set: {
            username,
            password
        }
    });
    res.send(result);

});

Router.route('/:id')
    .get((req, res) => {

    })
    .patch((req, res) => {

    })
    .delete((req, res) => {

    })

module.exports = Router;