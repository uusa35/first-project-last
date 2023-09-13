"use strict";
(() => {
var exports = {};
exports.id = 802;
exports.ids = [802];
exports.modules = {

/***/ 70640:
/***/ ((module) => {

module.exports = require("cookies");

/***/ }),

/***/ 90730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 43076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 17601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Fget_2Ftoken_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fget_2Ftoken_ts_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/get/token.ts
var token_namespaceObject = {};
__webpack_require__.r(token_namespaceObject);
__webpack_require__.d(token_namespaceObject, {
  "default": () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(56429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(47153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(37305);
// EXTERNAL MODULE: external "cookies"
var external_cookies_ = __webpack_require__(70640);
var external_cookies_default = /*#__PURE__*/__webpack_require__.n(external_cookies_);
;// CONCATENATED MODULE: ./pages/api/get/token.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function handler(req, res) {
    const cookies = new (external_cookies_default())(req, res);
    const token = cookies.get("token");
    if (token && token !== "undefined" && token.length >= 1) {
        res.status(200).json({
            is_auth: true,
            token
        });
    } else {
        res.status(200).json({
            is_auth: false
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fget%2Ftoken&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Fget%2Ftoken.ts&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Fget_2Ftoken_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fget_2Ftoken_ts_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(token_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(token_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/get/token",
        pathname: "/api/get/token",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: token_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(17601)));
module.exports = __webpack_exports__;

})();