var express = require('express');
var router = express.Router();

var robots = [
  {id: 1, name:"c3po", description:"specializes in language translation", created_at: new Date("1976-06-06 13:23:23"), updated_at: new Date("1976-06-06 13:23:23") },
  {id: 2, name:"r2d2", description:"holds a secret message",              created_at: new Date("1977-07-07 23:10:10"), updated_at: new Date("1977-07-07 23:10:10") },
  {id: 3, name:"bb8",  description:"rolls around",                        created_at: new Date("2016-01-01 07:59:59"), updated_at: new Date("2016-01-01 07:59:59") },
]; // temporary variable assignment to pre-empt future database connection


router.route('/robots')

    /* INDEX */

    .get(function(req, res, next) {
      console.log("FOUND", robots.length, "ROBOTS")
      res.render('robots/index', {
        page_title: 'Robots',
        robots: robots
      });
    })

    /* CREATE */

    .post(function(req, res, next) {
        console.log("CAPTURING FORM DATA:", req.body);
        console.log("CREATED A NEW ROBOT");
        res.redirect('/robots');
    });

/* NEW (this must come above the SHOW action or else express will think 'new' is the robot :id). */

router.get('/robots/new', function(req, res, next) {
  res.render('robots/new', {
    page_title: 'Add a new Robot'
  });
});

/* EDIT */

router.get('/robots/:id/edit', function(req, res, next) {
    var robot_id = req.params.id;
    var robot = robots.find(function(r){ return r.id == robot_id; });

    if ( typeof(robot) == "undefined" ) {
        console.log("ERROR - COULDN'T FIND ROBOT #"+robot_id)
        res.redirect('/robots')
    } else {
        console.log("EDITING A ROBOT", robot)
        res.render('robots/edit', {
          page_title: 'Edit Robot #'+robot.id,
          robot: robot
        });
    };
});

router.route('/robots/:id')

    /* SHOW */

    .get(function(req, res, next) {
        var robot_id = req.params.id;
        var robot = robots.find(function(r){ return r.id == robot_id; });
        if ( typeof(robot) == "undefined" ) {
            console.log("ERROR - COULDN'T FIND ROBOT #"+robot_id)
            res.redirect('/robots')
        } else {
            res.render('robots/show', {
              page_title: 'Robot #'+robot.id,
              robot: robot
            });
        };
    })

    /* UPDATE */

    .put(function(req, res, next) {
        console.log("CATURED FORM DATA", req.body)
        var robot_id = req.params.id
        console.log("UPDATED ROBOT #"+robot_id)
        res.redirect('/robots')
    })

    /* DESTROY */

    .delete(function(req, res, next) {

        var robot_id = req.params.id
        console.log("DELETING ROBOT #"+robot_id)
        res.redirect('/robots')
    });

module.exports = router;
