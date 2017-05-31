var express = require("express"),
     request = require("request"),
     bodyParser = require("body-parser"),
     compression = require('compression'),
     mongoose = require('mongoose'),
     path = require('path'),
     PORT = process.env.PORT || 3000,
     IP = process.env.IP,
     app = express();


app.set('port', process.env.PORT || 3000);

app.use(compression(), bodyParser.urlencoded({extended: true}), express.static(path.join(__dirname, 'public')));

 /************************************
  * DATA
  ************************************/
var messageSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    email: String
});


var Message = mongoose.model('Message', messageSchema);


 /************************************
  * ROUTES
  ************************************/

  /**
   * GET ROUTES
   */

   /** Home **/
    app.get("/*", function(req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });

 /************************************
  * LISTENING PORT SETUP
  ************************************/
 app.listen(PORT, IP, function() {
  console.log("listening on port " + PORT);
});
