// let config = require('../config/config.js');
let auth = require('../lib/auth');
// let authConfig = config.auth;

let mongoose = require('mongoose');
// let path = require('path');
// let sanitize = require('google-caja-sanitizer').sanitize;
// let _ = require('lodash');
let routesUtilities = require('../utilities/routes.js');
// let reqUtils = require('../lib/req-utils');
// let shareLib = require('../lib/share');
// let tag = require('../lib/tag');
// let FormError = require('../lib/error').FormError;
// let formModel = require('../model/form');

let Form = mongoose.model('Form');

module.exports = function(app) {
  app.get('/form-management/', auth.verifyRole('manager', 'admin'), function(
    req,
    res
  ) {
    res.render('form-management', routesUtilities.getRenderObject(req));
  });

  app.get(
    '/submitted-forms/json',
    auth.ensureAuthenticated,
    auth.verifyRole(true, 'admin', 'manager'),
    function(req, res) {
      Form.find(
        {
          status: 0.5,
        },
        'title formType tags mapping _v updatedOn updatedBy'
      ).exec(function(err, forms) {
        if (err) {
          console.error(err);
          return res.status(500).send(err.message);
        }
        res.status(200).json(forms);
      });
    }
  );

  app.get('/released-forms/json', auth.ensureAuthenticated, function(req, res) {
    Form.find(
      {
        status: 1,
      },
      'title formType tags mapping _v updatedOn updatedBy'
    ).exec(function(err, forms) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.status(200).json(forms);
    });
  });

  app.get('/released-forms/normal/json', auth.ensureAuthenticated, function(
    req,
    res
  ) {
    Form.find(
      {
        // TODO: filter the status with 1 when enforce normal forms
        // with the release progess.
        // status: 1,
        status: {
          $ne: 2,
        },
        formType: 'normal',
      },
      'title formType tags mapping _v updatedOn updatedBy'
    ).exec(function(err, forms) {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      res.status(200).json(forms);
    });
  });

  app.get(
    '/released-forms/discrepancy/json',
    auth.ensureAuthenticated,
    function(req, res) {
      Form.find(
        {
          status: 1,
          formType: 'discrepancy',
        },
        'title formType tags mapping _v updatedOn updatedBy'
      ).exec(function(err, forms) {
        if (err) {
          console.error(err);
          return res.status(500).send(err.message);
        }
        res.status(200).json(forms);
      });
    }
  );
};
