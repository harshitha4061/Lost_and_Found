const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item-controller");
const { getUploadUrl } = require("../Cloudinary/cloudinary");

console.log('Cloudinary API Key:', process.env.API_KEY);
console.log('Cloudinary Cloud Name:', process.env.CLOUD_NAME);

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router.get('/', (req, res) => {
    try {
        res.status(200).render('home.pug');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/lost', (req, res) => {
    try {
        res.status(200).render('lost.pug');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/found', (req, res) => {
    try {
        res.status(200).render('found.pug');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/addfounditem", async (req, res) => {
    try {
        const data = req.body;
        cloudinary.uploader.upload("C:/Users/harsh/Downloads/"+data['image'], async function (error, result) {
            if (error) {
                console.error(error);
            } else {
                data['imgUrl'] = result.url;
                data['found'] = true;
                await itemController.addItem(data);
                res.status(200).render('home.pug');
            }
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/addlostitem", async (req, res) => {
    try {
        const data = req.body;
        cloudinary.uploader.upload("C:/Users/harsh/Downloads/"+data['image'], async function (error, result) {
            if (error) {
                console.error(error);
            } else {
                data['imgUrl'] = result.url;
                data['found'] = false;
                await itemController.addItem(data);
                res.status(200).render('home.pug');
            }
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/items', async (req, res) => {
    try {
        const items = await itemController.getAllItems();
        res.status(200).render('items.pug', { items });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching items');
    }
});


router.post('/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await itemController.deleteItem(itemId);
        res.redirect('/items');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
