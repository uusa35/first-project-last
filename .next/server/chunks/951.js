"use strict";
exports.id = 951;
exports.ids = [951];
exports.modules = {

/***/ 62558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _redux_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(92897);
/* harmony import */ var lodash_truncate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19346);
/* harmony import */ var lodash_truncate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_truncate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8190);
/* __next_internal_client_entry_do_not_use__ default auto */ 



const TextTrans = ({ ar, en, className = ``, style = {}, length = 99 })=>{
    const { isRTL } = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_1__/* .useAppSelector */ .C)((state)=>state.locale);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: `capitalize ${className}`,
        style: style,
        suppressHydrationWarning: _src_constants__WEBPACK_IMPORTED_MODULE_3__/* .suppressText */ .P5,
        children: lodash_truncate__WEBPACK_IMPORTED_MODULE_2___default()(isRTL ? ar : en, {
            length
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextTrans);


/***/ }),

/***/ 96656:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ getNationalEvents),
/* harmony export */   x: () => (/* binding */ getNationalEvent)
/* harmony export */ });
async function getNationalEvents(search) {
    const res = await fetch(`${"https://visit-kwt.com/api/"}search/nationalevent?${search ?? ``}`, {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
async function getNationalEvent(id) {
    const res = await fetch(`${"https://visit-kwt.com/api/"}nationalevent/${id}`, {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}


/***/ })

};
;