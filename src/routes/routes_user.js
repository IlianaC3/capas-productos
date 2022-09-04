require('dotenv').config();
const express = require('express');
const us = express();
const passport = require('../controllers/passport')
const logger = require('../operations/logger')

us.set('view engine', 'ejs');
us.set('views', 'public');

us.post('/login', passport.authenticate('authentication'), (req, res) => {
   logger.info('Autorización login')
   let msg = '';
   if(req.user.email === -1) {
      msg = 'Usuario no existe';
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', {data: msg});
      });
   } else if (req.user.email === 0) {
      msg = 'Contraseña incorrecta';
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', {data: msg});
      });
   } else {
      res.redirect('/');
   }
})

us.post('/signup', passport.authenticate('registration'), (req, res) => {
   logger.info('Resgistro usuario')
   let msg = '';
   if(req.user.data === -1) {
      msg = 'No se pudo crear el usuario'
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', {data: msg});
       });
      
   } else if (req.user.data === 0) {
      msg = 'Usuario ya existe'
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', { data: msg });
      });
   } else {
      // console.log(req.user)
      msg = req.user.data;
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('success', { data: msg });
      })
   }
})


module.exports = us