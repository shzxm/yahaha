var app = require('./scripts/app');
var update = require('./scripts/update')
$app.autoKeyboardEnabled = true;
$app.keyboardToolbarEnabled = true;

await update.checkVersion();
await app.initAppView();
