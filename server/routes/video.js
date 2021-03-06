const express = require('express');
const router = express.Router();

const multer = require('multer');
let ffmpeg = require('fluent-ffmpeg');

const {Video} = require('../models/Video');
const {Subscriber} = require('../models/Subscriber');
const {auth} = require('../middleware/auth');

// ------------------------
//          Video
// ------------------------

// STOARGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/video_clip/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }

        cb(null, true);
    }
});

let upload = multer({storage: storage}).single('file');

router.post('/uploadfiles', (req, res) => {
    // 영상을 서버에 저장

    upload(req, res, err => {
        if (err) {return res.json({success: false, err});}
        return res.json({
            success: true,
            url: res.req.file.path,
            fileName: res.req.file.filename
        });
    });
});

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성과 러닝 타임도 가져오기

    let filePath = '';
    let fileDuration = '';

    // 영상 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.log('metadata', metadata);
        console.log('metadata format duration', metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('will generate' + filenames.join(', '));
            console.log(filenames);
            filePath = 'uploads/thumbnails/' + filenames[0];
        })
        .on('end', function () {
            console.log('screenshots taken');
            return res.json({
                success: true,
                url: filePath,
                fileDuration: fileDuration
            });
        })
        .on('error', function (err) {
            console.log('ffmpeg error', err);
            return res.json({success: false, err});
        })
        .screenshots({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });
});

router.post('/uploadVideo', (req, res) => {
    // 영상 정보들을 저장한다.
    const video = new Video(req.body);

    video.save((err, doc) => {
        if (err) {return res.json({success: false, err})}
        res.status(200).json({success: true});
    });
});

router.get('/getVideos', (req, res) => {
    // 영상을 DB에서 클라이언트로 보낸다.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) {return res.status(400).send(err);}
            res.status(200).json({success: true, videos});
        });
});

router.post('/getVideo', (req, res) => {
    Video.findOne({'_id': req.body.videoId})
        .populate('writer')
        .exec((err, video) => {
            if (err) {return res.status(400).send(err);}

            Video.findOneAndUpdate({'_id' : video._id}, {'views' : video.views + 1})
                .populate('writer')
                .exec((err, video) => {
                    if (err) {
                        return res.json({success: false, err});
                    }

                    return res.status(200).send({success: true, video});
                });
        });
});

router.post('/getSubscriptionVideos', (req, res) => {
    // 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
    Subscriber
        .find({'userFrom': req.body.userFrom})
        .exec((err, subscriberInfo) => {
            if (err) {return res.status(400).send(err);}
            let subscribedUser = [];

            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo);
            });

            // 찾은 사람들의 영상을 가지고 온다.
            Video
                .find({'writer': {$in: subscribedUser}})
                .populate('writer')
                .exec((err, videos) => {
                    if (err) {return res.status(400).send(err);}
                    res.status(200).json({success: true, videos});
                });
        });
});

module.exports = router;