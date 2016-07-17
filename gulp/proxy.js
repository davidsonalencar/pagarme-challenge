/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Setting to enable module rewrite in browserSync
 */
(function () {
    'use strict';

    //-- Initializations
    var modRewrite = require('connect-modrewrite');

    //-- Export mod rewrite
    module.exports = [
        modRewrite([
            '^/docs/[^\\.]*$ /docs/index.html [L]',
            '^[^\\.]*$ /index.html [L]'
        ])
    ];
})();