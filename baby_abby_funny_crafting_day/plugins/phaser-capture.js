(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        root.Phaser.Plugin.Capture = factory();
    }
}(this, function () {
    function Capture(game, parent) {
        Phaser.Plugin.call(this, game, parent);
        this.pendingScreenshot = null;
        this.game = game;
    };
    Capture.prototype.screenshot = function (callback, options) {
        if (!callback) {
            return;
        }
        options = options || {}
        this.pendingScreenshot = {
            format: options.format || 'image/png'
            , callback: callback
        , }
    };
    Capture.prototype.postRender = function () {
        if (this.pendingScreenshot) {
            var dataUrl = game.canvas.toDataURL(this.pendingScreenshot.format);
            if (this.pendingScreenshot.callback) {
                this.pendingScreenshot.callback(dataUrl);
                this.pendingScreenshot = null;
            }
        }
    };
    return Capture;
}));
