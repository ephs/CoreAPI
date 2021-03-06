const express = require('express');
const router = express.Router();
const jwtValidator = require('express-jwt');
const config = require('../config/config');

const auth = jwtValidator({
    secret: config.secret,
    userProperty: 'payload'
});

const sessionManager = require('../controllers/sessionManager');
const authManager = require('../controllers/authManager');
const onLoad = require('../controllers/onLoad');

router.post('/login', authManager.login);
router.get('/onLoad', onLoad.onLoad);

router.get('/sessions/available',auth, sessionManager.getAvailableSessions);
router.get('/sessions/signedup',auth,sessionManager.getSignedupSessions);
router.get('/sessions/past',auth, sessionManager.getPastSessions);
router.post('/sessions/signup',auth, sessionManager.joinSession);
router.post('/sessions/leave',auth, sessionManager.leaveSession);

module.exports = router;

//Example secured route:
//router.get('/profile', auth, posts);
