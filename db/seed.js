exports.seed = function(knex, Promise) {
  var robots = [
    {id: 1, name:"c3po", description:"specializes in language translation", created_at: new Date("1976-06-06 13:23:23"), updated_at: new Date("1976-06-06 13:23:23") },
    {id: 2, name:"r2d2", description:"holds a secret message",              created_at: new Date("1977-07-07 23:10:10"), updated_at: new Date("1977-07-07 23:10:10") },
    {id: 3, name:"bb8",  description:"rolls around",                        created_at: new Date("2016-01-01 07:59:59"), updated_at: new Date("2016-01-01 07:59:59") },
  ];

  var robotPromises = [];

  // destroy all records in the table...
  // var destruction_promise = knex('robots').del()
  // robotPromises.push(destruction_promise);

  // add a new record for each robot...
  // var insertion_promise = knex('robots').insert(
  //   robots, 'id' // auto-increment the id instead of setting it
  // )
  // robotPromises.push(insertion_promise);

  // check to see if the robot exists else create a new one
  robots.forEach(function(bot){
    var robot_name = bot["name"]
    console.log('Robot name: ' + robot_name);

    knex('robots').where({name: robot_name}).then(function(robots){
      if (robots.length > 0) {
        console.log('Found existing robot named '+robot_name);
      } else {

        var insertion_promise = knex('robots').insert([{'name': robot_name}], 'id')
        robotPromises.push(insertion_promise);

        //knex('robots').insert([{'name': robot_name}], 'id').then(function(bot_id){ // , 'id' facilitates the auto-incrementing and avoids error... Unhandled rejection error: insert into "robots" ("name") values ($1) - duplicate key value violates unique constraint "robots_pkey"
        //  console.log('Created new robot named '+robot_name+' with id #'+bot_id)
        //}) // knex .insert

      } // if robot exists

    }) // knex('robots')


  }) // for each robot

  return Promise.all(robotPromises);
};
