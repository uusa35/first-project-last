exports.id = 425;
exports.ids = [425];
exports.modules = {

/***/ 58597:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 20383))

/***/ }),

/***/ 38732:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 56975:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 12748));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 81747))

/***/ }),

/***/ 20383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57114);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _appImages_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29405);
/* harmony import */ var _src_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8190);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52451);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function Loading() {
    const { lang } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useParams)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "h-screen w-screen flex justify-center items-center",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "w-1/12 p-2 shadow-xl rounded-xl border border-gray-100",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                className: "w-full h-auto object-contain",
                src: _appImages_logo_png__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
                alt: "ar-expo",
                fill: false,
                placeholder: "blur",
                loading: "lazy",
                blurDataURL: _src_constants__WEBPACK_IMPORTED_MODULE_3__/* .logoBlured */ .eZ
            })
        })
    });
}


/***/ }),

/***/ 81747:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layouts_MainLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/redux/hooks.ts
var hooks = __webpack_require__(92897);
// EXTERNAL MODULE: ./src/redux/slices/localeSlice.ts
var localeSlice = __webpack_require__(60217);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(34751);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Close.js
var Close = __webpack_require__(99280);
// EXTERNAL MODULE: ./node_modules/react-i18next/dist/es/index.js + 14 modules
var es = __webpack_require__(27870);
;// CONCATENATED MODULE: ./src/components/ToastAppContainer.tsx






const ToastAppContainer = ()=>{
    const { t } = (0,es/* useTranslation */.$G)();
    const { locale: { isRTL }, toastMessage: { type, content, showToast } } = (0,hooks/* useAppSelector */.C)((state)=>state);
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.Suspense, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_toastify_esm/* ToastContainer */.Ix, {
            position: isRTL ? `top-center` : "top-center",
            toastClassName: `shadow-inner font-extrabold text-white text-center p-8  mx-10 mt-10 w-[80%] lg:mt-0 lg:mx-0 lg:w-full`,
            autoClose: 2000,
            hideProgressBar: false,
            newestOnTop: true,
            transition: react_toastify_esm/* Flip */.BW,
            limit: 1,
            closeOnClick: true,
            rtl: isRTL,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            // bodyStyle={{ height: 'auto' }}
            // style={{
            //   width: 'max-content',
            //   minWidth: '350px',
            //   minHeight: '40px',
            //   display: 'flex',
            //   alignSelf: 'center',
            // }}
            theme: "colored",
            // progressClassName={`bg-red-900`}
            // toastClassName={`p-0 m-0 w-full`}
            //bodyClassName={`p-0 m-0 w-full`}
            // toastStyle={{
            //   backgroundColor: type === `error` ? `red` : '#12b764',
            //   color: `white`,
            //   fontSize: '14px',
            // }}
            closeButton: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex items-center",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Close/* default */.Z, {
                    style: {
                        color: `white`
                    }
                })
            })
        })
    });
};
/* harmony default export */ const components_ToastAppContainer = (ToastAppContainer);

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__(64731);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
// EXTERNAL MODULE: ./node_modules/yup/lib/index.js
var lib = __webpack_require__(81288);
;// CONCATENATED MODULE: ./src/components/layouts/MainLayout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






const MainLayout = ({ lang, children })=>{
    const { locale } = (0,hooks/* useAppSelector */.C)((state)=>state);
    const dispatch = (0,hooks/* useAppDispatch */.T)();
    (0,react_.useEffect)(()=>{
        if (lang !== locale.lang) {
            dispatch((0,localeSlice/* setLocale */.i)(lang));
        }
        moment_default().locale(lang);
        lib/* setLocale */.i_({
            mixed: {
                required: "validation.required"
            },
            number: {
                min: ({ min })=>({
                        key: "validation.min",
                        values: {
                            min
                        }
                    }),
                max: ({ max })=>({
                        key: "validation.max",
                        values: {
                            max
                        }
                    })
            },
            string: {
                email: "validation.email",
                min: ({ min })=>({
                        key: `validation.min`,
                        values: min
                    }),
                max: ({ max })=>({
                        key: "validation.max",
                        values: max
                    }),
                matches: "validation.matches"
            }
        });
    }, [
        lang
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `w-full min-h-screen `,
        children: [
            children,
            /*#__PURE__*/ jsx_runtime_.jsx(components_ToastAppContainer, {})
        ]
    });
};
/* harmony default export */ const layouts_MainLayout = (MainLayout);


/***/ }),

/***/ 8190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D0: () => (/* binding */ isLocal),
/* harmony export */   JW: () => (/* binding */ apiUrl),
/* harmony export */   P5: () => (/* binding */ suppressText),
/* harmony export */   VM: () => (/* binding */ appLinks),
/* harmony export */   eZ: () => (/* binding */ logoBlured)
/* harmony export */ });
/* unused harmony exports baseUrl, appVersion, imageUrl, convertSearchParamsToString, setLang, setToken, deleteToken, getToken, toEn */
const baseUrl = `${"https://visit-kwt.com"}`;
const appVersion = (/* unused pure expression or super */ null && (`0.0.1`));
const apiUrl = `${baseUrl}/api/`;
const imageUrl = (/* unused pure expression or super */ null && (`https://loremflickr.com/`));
const isLocal = "production" !== "production";
const suppressText = true;
const appLinks = {
    home: (lang)=>`/${lang}`,
    about: (lang)=>`/${lang}/about`,
    nationaleventIndex: (lang, search)=>`/${lang}/nationalevent?${search ?? ""}`,
    nationalEventShow: (lang, id, slug)=>`/${lang}/nationalevent/${id}?slug=${slug ?? ``}`
};
const convertSearchParamsToString = (search)=>Object.keys(search).map((key)=>{
        return `${key}=${encodeURIComponent(search[key])}`;
    }).join("&");
const setLang = (lang)=>fetch(`/api/set/lang`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lang
        })
    });
const setToken = (token)=>fetch(`/api/set/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
    });
const deleteToken = ()=>fetch(`/api/delete/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
const getToken = ()=>fetch(`/api/get/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
const toEn = (s)=>s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (a)=>a.charCodeAt(0) & 15);
const logoBlured = `
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAE6CAMAAACbLJ/BAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcZlpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS3fJWVUAAAD/dFJOUwD9KSAlRek/WPb0vTV0ggPm2GDIsMUB/G/+zxL7wSjtRAb639MV8PeE7qLrBS2oHFuk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    
`;


/***/ }),

/***/ 92897:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ useAppSelector),
/* harmony export */   T: () => (/* binding */ useAppDispatch)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8250);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = ()=>(0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector;


/***/ }),

/***/ 12748:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ provider)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js
var redux_toolkit_cjs_production_min = __webpack_require__(91388);
// EXTERNAL MODULE: ./node_modules/redux-logger/dist/redux-logger.js
var redux_logger = __webpack_require__(71690);
// EXTERNAL MODULE: ./src/redux/slices/localeSlice.ts
var localeSlice = __webpack_require__(60217);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.cjs.production.min.js
var rtk_query_react_cjs_production_min = __webpack_require__(23298);
// EXTERNAL MODULE: ./node_modules/next-redux-wrapper/lib/index.js
var lib = __webpack_require__(59556);
// EXTERNAL MODULE: ./src/constants.ts
var constants = __webpack_require__(8190);
;// CONCATENATED MODULE: ./src/redux/api/index.ts



const apiSlice = (0,rtk_query_react_cjs_production_min.createApi)({
    reducerPath: "api",
    baseQuery: (0,rtk_query_react_cjs_production_min.fetchBaseQuery)({
        baseUrl: `${constants/* apiUrl */.JW}`,
        prepareHeaders: async (headers, { getState, type, endpoint, extra })=>{
            const { setting } = getState();
            headers.set("Access-Control-Allow-Headers", "X-Requested-With,Accept,Authentication,Content-Type");
            // headers.set('lang', lang);
            headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "application/json");
            headers.set("Cache-Control", "no-store");
            // if (auth.isAuth && auth.user.api_token) {
            //   headers.set('Authorization', `Bearer ${auth.user.api_token}`);
            //   headers.set('api_token', `${auth.user.api_token}`);
            // }
            return headers;
        },
        // credentials: 'include',
        credentials: "same-origin"
    }),
    // tagTypes: ['Cart', 'Branch', 'Area', 'Product', 'Wishlist'],
    keepUnusedDataFor: 0,
    refetchOnReconnect: true,
    extractRehydrationInfo (action, { reducerPath }) {
        if (action.type === lib.HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder)=>({})
});

;// CONCATENATED MODULE: ./src/redux/api/productApi.ts

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getProducts: builder.query({
                query: ({ category_id, page, limit, lang, url, destination = {} })=>({
                        url: `items`,
                        params: {
                            category_id,
                            page,
                            limit
                        },
                        headers: {
                            url,
                            lang,
                            ...destination,
                            limit
                        },
                        validateStatus: (response, result)=>response.status == 200 && result.status
                    })
            }),
            getSearchProducts: builder.query({
                query: ({ lang, key = ``, destination = {}, url, category_id })=>({
                        url: `search`,
                        params: {
                            key,
                            ...category_id && {
                                category_id: category_id
                            }
                        },
                        headers: {
                            url,
                            ...destination,
                            lang
                        },
                        validateStatus: (response, result)=>response.status == 200 && result.status
                    })
            }),
            getProduct: builder.query({
                query: ({ id, lang, url, destination = {} })=>({
                        url: `itemDetails`,
                        params: {
                            product_id: id
                        },
                        headers: {
                            url,
                            lang,
                            ...destination
                        },
                        validateStatus: (response, result)=>response.status == 200 && result.status
                    }),
                providesTags: [
                    "Product"
                ]
            }),
            getTopSearch: builder.query({
                query: ({ lang, destination = {}, url })=>({
                        url: `topSearches`,
                        headers: {
                            url,
                            ...destination,
                            lang
                        },
                        validateStatus: (response, result)=>response.status == 200 && result.status
                    })
            })
        })
});
const { useGetProductsQuery, useLazyGetProductsQuery, useGetProductQuery, useGetTopSearchQuery, useGetSearchProductsQuery, useLazyGetSearchProductsQuery } = productApi;

;// CONCATENATED MODULE: ./src/redux/slices/settingSlice.ts

const initialState = {
    method: "delivery",
    title: "Ar Expo",
    openSideMenu: false
};
const settingSlice = (0,redux_toolkit_cjs_production_min.createSlice)({
    name: "setting",
    initialState,
    reducers: {
        setMethod: (state, action)=>{
            return {
                ...state,
                method: action.payload
            };
        },
        toggleMethod: (state, action)=>{
            return {
                ...state,
                method: state.method == "delivery" ? "pickup" : "delivery"
            };
        }
    }
});
const { setMethod, toggleMethod } = settingSlice.actions;

;// CONCATENATED MODULE: ./src/redux/api/categoryApi.ts

const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getCategories: builder.query({
                query: ()=>({
                        url: `search/category`,
                        validateStatus: (response, result)=>response.status == 200
                    })
            })
        })
});
const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = categoryApi;

;// CONCATENATED MODULE: ./src/redux/api/authApi.ts

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            checkPhone: builder.mutation({
                query: ({ body, url })=>({
                        url: `phone-check`,
                        method: `POST`,
                        headers: {
                            url
                        },
                        body,
                        validateStatus: (response, result)=>result.status
                    })
            }),
            sendotp: builder.mutation({
                query: ({ phone, url })=>({
                        url: `v2/user/reset/send-otp`,
                        method: `POST`,
                        headers: {
                            url
                        },
                        body: {
                            phone
                        },
                        validateStatus: (response, result)=>result
                    })
            }),
            verifyCode: builder.mutation({
                query: ({ body, url })=>({
                        url: `verify`,
                        method: `POST`,
                        headers: {
                            url
                        },
                        body,
                        validateStatus: (response, result)=>result.status
                    })
            }),
            register: builder.mutation({
                query: ({ body, url })=>({
                        url: `register`,
                        method: `POST`,
                        headers: {
                            url
                        },
                        body,
                        validateStatus: (response, result)=>result.status
                    })
            }),
            login: builder.mutation({
                query: ({ body, url })=>({
                        url: `login`,
                        method: `POST`,
                        headers: {
                            url
                        },
                        body,
                        validateStatus: (response, result)=>result.status
                    })
            }),
            resetPassword: builder.mutation({
                query: ({ body, url })=>({
                        url: `v2/user/reset/password`,
                        method: `POST`,
                        headers: {
                            url
                        },
                        body,
                        validateStatus: (response, result)=>result
                    })
            })
        })
});
const { useCheckPhoneMutation, useVerifyCodeMutation, useSendotpMutation, useRegisterMutation, useLoginMutation, useResetPasswordMutation } = authApi;

;// CONCATENATED MODULE: ./src/redux/slices/toastMessageSlice.ts

const toastMessageSlice_initialState = {
    title: ``,
    content: ``,
    showToast: false,
    type: `default`
};
const toastMessageSlice = (0,redux_toolkit_cjs_production_min.createSlice)({
    name: "toastMessage",
    initialState: toastMessageSlice_initialState,
    reducers: {
        showToastMessage: (state, action)=>{
            return {
                content: action.payload.content,
                showToast: true,
                type: action.payload.type,
                title: action.payload.title ?? ``
            };
        },
        hideToastMessage: (state, action)=>{
            return {
                title: ``,
                content: ``,
                type: `info`,
                showToast: false
            };
        }
    }
});
const { showToastMessage, hideToastMessage } = toastMessageSlice.actions;

;// CONCATENATED MODULE: ./src/redux/slices/rootReducer.ts








const rootReducer = (0,redux_toolkit_cjs_production_min.combineReducers)({
    [localeSlice/* localeSlice */.x.name]: localeSlice/* localeSlice */.x.reducer,
    [settingSlice.name]: settingSlice.reducer,
    [toastMessageSlice.name]: toastMessageSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer
});

// EXTERNAL MODULE: ./node_modules/redux-persist/lib/index.js
var redux_persist_lib = __webpack_require__(22502);
// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js + 3 modules
var redux_saga_core_npm_proxy_esm = __webpack_require__(19428);
// EXTERNAL MODULE: ./node_modules/redux-persist/lib/storage/index.js
var storage = __webpack_require__(66001);
// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js + 1 modules
var redux_saga_effects_npm_proxy_esm = __webpack_require__(47726);
// EXTERNAL MODULE: ./node_modules/redux-persist/lib/constants.js
var lib_constants = __webpack_require__(45563);
;// CONCATENATED MODULE: ./src/redux/sagas/rootSaga.ts


function* rootSaga() {
    yield (0,redux_saga_effects_npm_proxy_esm/* all */.$6)([]);
    yield (0,redux_saga_effects_npm_proxy_esm/* take */.qn)(lib_constants.REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
    yield (0,redux_saga_effects_npm_proxy_esm/* take */.qn)(lib_constants.PURGE);
}

// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/query/rtk-query.cjs.production.min.js
var rtk_query_cjs_production_min = __webpack_require__(31011);
;// CONCATENATED MODULE: ./src/redux/store.ts














const persistConfig = {
    key: "root",
    storage: storage/* default */.Z,
    blacklist: [
        "api"
    ],
    // whitelist: [
    // ],
    // stateReconciler: hardSet,
    debug: constants/* isLocal */.D0
};
const persistedReducer = (0,redux_persist_lib.persistReducer)(persistConfig, rootReducer);
const sagaMiddleware = (0,redux_saga_core_npm_proxy_esm/* default */.ZP)();
const appLogger = (0,redux_logger.createLogger)({
    collapsed: constants/* isLocal */.D0,
    duration: constants/* isLocal */.D0,
    diff: constants/* isLocal */.D0
});
let store = (0,redux_toolkit_cjs_production_min.configureStore)({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: constants/* isLocal */.D0 ? (gDM)=>gDM({
            serializableCheck: {
                ignoredActions: [
                    redux_persist_lib.FLUSH,
                    lib.HYDRATE,
                    redux_persist_lib.REHYDRATE,
                    redux_persist_lib.PAUSE,
                    redux_persist_lib.PERSIST,
                    redux_persist_lib.PURGE,
                    redux_persist_lib.REGISTER
                ]
            }
        }).concat([
            apiSlice.middleware,
            categoryApi.middleware,
            productApi.middleware,
            sagaMiddleware,
            appLogger
        ]) : (gDM)=>gDM({
            serializableCheck: {
                ignoredActions: [
                    redux_persist_lib.FLUSH,
                    lib.HYDRATE,
                    redux_persist_lib.REHYDRATE,
                    redux_persist_lib.PAUSE,
                    redux_persist_lib.PERSIST,
                    redux_persist_lib.PURGE,
                    redux_persist_lib.REGISTER
                ]
            }
        }).concat([
            apiSlice.middleware,
            categoryApi.middleware,
            productApi.middleware,
            sagaMiddleware
        ])
});
sagaMiddleware.run(rootSaga);
const initializeStore = (preloadedState)=>{
    let _store = store;
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = {
            ...store.getState(),
            ...preloadedState
        };
        // Reset the current store
        store = undefined;
    }
    // For SSG and SSR always create a new store
    if (true) return _store;
    // Create the store once in the client
    if (!store) store = _store;
    return _store;
};
(0,rtk_query_cjs_production_min.setupListeners)(store.dispatch);
const makeStore = ()=>store;
const persistor = (0,redux_persist_lib.persistStore)(store);
const wrapper = (0,lib.createWrapper)(makeStore, {
    debug: constants/* isLocal */.D0
});
const useStore = (initialState)=>useMemo(()=>initializeStore(initialState), [
        initialState
    ]);


// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var react_redux_lib = __webpack_require__(8250);
;// CONCATENATED MODULE: ./src/redux/provider.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const Providers = ({ children })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_redux_lib.Provider, {
        store: store,
        children: [
            " ",
            children,
            " "
        ]
    });
};
/* harmony default export */ const provider = (Providers);


/***/ }),

/***/ 60217:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ setLocale),
/* harmony export */   x: () => (/* binding */ localeSlice)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91388);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    isRTL: false,
    dir: "ltr",
    lang: "en",
    label: "english",
    otherLang: "ar"
};
const localeSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "locale",
    initialState,
    reducers: {
        setLocale: (state, action)=>{
            return {
                dir: action.payload === "ar" ? "rtl" : "ltr",
                isRTL: action.payload === "ar" ? true : false,
                lang: action.payload,
                label: action.payload === "ar" ? "arabic" : "english",
                otherLang: action.payload === "ar" ? "en" : "ar"
            };
        }
    }
});
const { setLocale } = localeSlice.actions;


/***/ }),

/***/ 10675:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  generateStaticParams: () => (/* binding */ generateStaticParams),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app/[lang]/layout.tsx","import":"Tajawal","arguments":[{"weight":"400","subsets":["latin"]}],"variableName":"tajawal"}
var layout_tsx_import_Tajawal_arguments_weight_400_subsets_latin_variableName_tajawal_ = __webpack_require__(37352);
var layout_tsx_import_Tajawal_arguments_weight_400_subsets_latin_variableName_tajawal_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Tajawal_arguments_weight_400_subsets_latin_variableName_tajawal_);
// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(54315);
// EXTERNAL MODULE: ./i18n.config.ts
var i18n_config = __webpack_require__(28932);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/redux/provider.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/usama/Sites/ar-expo/src/redux/provider.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const provider = (__default__);
;// CONCATENATED MODULE: ./src/components/layouts/MainLayout.tsx

const MainLayout_proxy = (0,module_proxy.createProxy)(String.raw`/Users/usama/Sites/ar-expo/src/components/layouts/MainLayout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: MainLayout_esModule, $$typeof: MainLayout_$$typeof } = MainLayout_proxy;
const MainLayout_default_ = MainLayout_proxy.default;


/* harmony default export */ const MainLayout = (MainLayout_default_);
;// CONCATENATED MODULE: ./app/[lang]/layout.tsx






const metadata = {
    title: "Ar Expo",
    description: "Ar Expo Group"
};
async function generateStaticParams() {
    return i18n_config/* i18n */.a.locales.map((locale)=>({
            lang: locale
        }));
}
// const trans = async () =>
//   await getDictionary(params.lang).then((r: any) => r.data);
function RootLayout({ children, params }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        className: "min-h-screen bg-white",
        lang: params.lang,
        dir: params.lang === "ar" ? "rtl" : "ltr",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: `${(layout_tsx_import_Tajawal_arguments_weight_400_subsets_latin_variableName_tajawal_default()).className}`,
            dir: params.lang === "ar" ? "rtl" : "ltr",
            children: /*#__PURE__*/ jsx_runtime_.jsx(provider, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(MainLayout, {
                    lang: params.lang,
                    children: children
                })
            })
        })
    });
}


/***/ }),

/***/ 23759:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/usama/Sites/ar-expo/app/[lang]/loading.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 28932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ i18n)
/* harmony export */ });
const i18n = {
    defaultLocale: "ar",
    locales: [
        "en",
        "ar"
    ]
};


/***/ }),

/***/ 29405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/logo.4d7901fc.png","height":314,"width":300,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAHlBMVEWZaUuZaUqZaUuZaUuZaEuZaEuZaUuZaUuZaUuZaUs9+lxcAAAACnRSTlM2ZFZ7L5CvJwc+6zIGhgAAAAlwSFlzAAALEwAACxMBAJqcGAAAADJJREFUeJwdwYkNACAMA7FLQh/2XxgJmxYdJ1SpT1T4rmdlzjcDXD55DYLEraQouUeuBx9hANJaYb2FAAAAAElFTkSuQmCC","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 57481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"256x256"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 54315:
/***/ (() => {



/***/ })

};
;