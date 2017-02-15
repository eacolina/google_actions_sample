
  import { Meteor } from 'meteor/meteor';

  app = Express(); // create Express server
  const APIAiAssistant = require('actions-on-google').ApiAiAssistant; // create api assitant object to  process API AI requests
  app.get('/test', function(req, res) { // test endpoint
    res.status(200).send("Hello World!")
  });

  app.post('/ga-webhook',function(req, res){
    const assistant = new APIAiAssistant({request:req,response:res});
    const actionMap = new Map();
    console.log(req)

    function welcomeIntent(assistant){
      assistant.tell("Welcome and go away");
    }

    function addUser(assistant){
      var id = Math.floor(1000 + Math.random() * 9000);
      Meteor.call('random.insert', id);
      assistant.tell("A user has been added to the database");
    }


    actionMap.set('input.welcome',welcomeIntent);
    assistant.handleRequest(actionMap);
  })