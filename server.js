/**
 * Created by v.litvak on 10.11.2016.
 */

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(__dirname));

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});