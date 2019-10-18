const express = require('express');
var ObjectId = require('mongodb').ObjectId;

const Router = express.Router();
const {
    mongo
} = require('../db');
const {
    fromatData,
    token
} = require('../utils');

// 后台管理系统添加新商品||更新商品
Router.post('/addgoods', async (req, res) => {
    let {
        dateli,
        _id,
        title,
        imgsrc,
        prite,
        goods_kucun,
        action2,
        action0,
        action1,
        disalber
    } = req.body;
    let result;
    if (_id == "") {
        await mongo.create('datlere', [{
            dateli,
            title,
            imgsrc,
            prite,
            goods_kucun,
            action2,
            action0,
            action1,
            disalber
        }]);
        result = fromatData(
        )
    } else {
        let mongoid = ObjectId(_id);
        await mongo.update('datlere', {
            "_id": mongoid
        },
            {
                $set: {
                    dateli,
                    title,
                    imgsrc,
                    prite,
                    goods_kucun,
                    action2,
                    action0,
                    action1,
                    disalber
                }
            }
        );
        result = fromatData()
    }

    res.send(result);

})


Router.get('/', async (req, res) => {
    let result = await mongo.find('datlere', {});
    res.send(result);

});

// 删除用户
Router.post('/deletegoods', async (req, res) => {

    let { _id } = req.body;
    let mongoid = ObjectId(_id);
    let result = await mongo.remove('datlere',
        { "_id": mongoid }
    );
    res.send(result);

});


module.exports = Router;