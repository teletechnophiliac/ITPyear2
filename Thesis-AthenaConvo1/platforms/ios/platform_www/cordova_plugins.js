cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.mbppower.camerapreview/www/CameraPreview.js",
        "id": "com.mbppower.camerapreview.CameraPreview",
        "pluginId": "com.mbppower.camerapreview",
        "clobbers": [
            "cordova.plugins.camerapreview"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.mbppower.camerapreview": "0.0.8",
    "cordova-plugin-whitelist": "1.2.1"
}
// BOTTOM OF METADATA
});