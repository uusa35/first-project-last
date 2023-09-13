"use strict";
exports.id = 864;
exports.ids = [864];
exports.modules = {

/***/ 99201:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  MainContext: () => (/* binding */ MainContext),
  MainContextLayout: () => (/* binding */ MainContextLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/@heroicons/react/24/outline/esm/HomeIcon.js
var HomeIcon = __webpack_require__(69719);
// EXTERNAL MODULE: ./node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js
var XMarkIcon = __webpack_require__(57048);
// EXTERNAL MODULE: ./node_modules/@heroicons/react/24/outline/esm/Bars3Icon.js
var Bars3Icon = __webpack_require__(46140);
// EXTERNAL MODULE: ./src/constants.ts
var constants = __webpack_require__(8190);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var next_navigation = __webpack_require__(57114);
;// CONCATENATED MODULE: ./i18n.config.ts
const i18n = {
    defaultLocale: "ar",
    locales: [
        "en",
        "ar"
    ]
};

// EXTERNAL MODULE: ./src/redux/hooks.ts
var hooks = __webpack_require__(92897);
// EXTERNAL MODULE: ./src/redux/slices/localeSlice.ts
var localeSlice = __webpack_require__(60217);
;// CONCATENATED MODULE: ./src/components/LocaleSwitcher.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





function LocaleSwitcher() {
    const pathName = (0,next_navigation.usePathname)();
    const dispatch = (0,hooks/* useAppDispatch */.T)();
    const { lang } = (0,next_navigation.useParams)();
    const redirectedPathName = (locale)=>{
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };
    const handleClick = (locale)=>dispatch((0,localeSlice/* setLocale */.i)(locale));
    return /*#__PURE__*/ jsx_runtime_.jsx("ul", {
        className: "flex w-full justify-between items-center gap-x-3",
        children: i18n.locales.map((locale)=>{
            return /*#__PURE__*/ jsx_runtime_.jsx("li", {
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    onClick: ()=>handleClick(locale),
                    href: redirectedPathName(locale),
                    className: `${lang == locale ? `bg-gray-800` : `bg-gray-400`} rounded-md border  px-3 py-2 text-white  hover:opacity-60`,
                    children: locale
                })
            }, locale);
        })
    });
}

// EXTERNAL MODULE: ./public/images/logo.png
var logo = __webpack_require__(29405);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(52451);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/react-burger-menu/lib/BurgerMenu.js
var BurgerMenu = __webpack_require__(58244);
// EXTERNAL MODULE: ./node_modules/lodash/first.js
var first = __webpack_require__(88340);
var first_default = /*#__PURE__*/__webpack_require__.n(first);
;// CONCATENATED MODULE: ./src/components/SideMenu.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 











function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
function SideMenu() {
    const [sidebarOpen, setSidebarOpen] = (0,react_.useState)(false);
    const { home: { main }, translation, about: { aboutus }, nationalevent } = (0,react_.useContext)(MainContext);
    const { lang } = (0,next_navigation.useParams)();
    const segments = (0,next_navigation.useSelectedLayoutSegments)();
    const navigation = [
        {
            name: main,
            href: constants/* appLinks */.VM.home(lang),
            icon: HomeIcon/* default */.Z
        },
        {
            name: aboutus,
            href: constants/* appLinks */.VM.about(lang),
            icon: HomeIcon/* default */.Z
        },
        {
            name: nationalevent,
            href: constants/* appLinks */.VM.nationaleventIndex(lang),
            icon: HomeIcon/* default */.Z
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: `fixed top-0 w-full md:w-1/2 lg:w-5/12 xl:w-1/3 bg-white z-50`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(BurgerMenu.slide, {
                right: lang === "ar",
                isOpen: sidebarOpen,
                onClose: ()=>setSidebarOpen(false),
                customBurgerIcon: false,
                customCrossIcon: false,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex min-h-screen grow flex-col gap-y-5 overflow-y-auto px-6 bg-white",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex w-full justify-between items-start my-6",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: constants/* appLinks */.VM.home(lang),
                                    className: "flex h-16 shrink-0 items-center ",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                        className: "h-10 w-10",
                                        src: logo/* default */.Z,
                                        alt: "ar-expo",
                                        fill: false,
                                        placeholder: "blur",
                                        loading: "lazy",
                                        blurDataURL: constants/* logoBlured */.eZ
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(XMarkIcon/* default */.Z, {
                                    className: "w-5 h-5 text-gray-800 cursor-pointer",
                                    onClick: ()=>setSidebarOpen(false)
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                            className: "flex flex-1 flex-col",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                role: "list",
                                className: "flex flex-1 flex-col gap-y-7",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "-mx-6 mt-auto",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                            href: constants/* appLinks */.VM.home(lang),
                                            className: "flex flex-row items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-black hover:bg-expo-light",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                    className: "h-10 w-10 rounded-full",
                                                    src: logo/* default */.Z,
                                                    alt: "ar-expo",
                                                    fill: false,
                                                    placeholder: "blur",
                                                    loading: "lazy",
                                                    blurDataURL: constants/* logoBlured */.eZ
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "",
                                                            children: "Your profile"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            "aria-hidden": "true",
                                                            children: "Tom Cook"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(LocaleSwitcher, {})
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                            role: "list",
                                            className: "-mx-2 space-y-1",
                                            children: navigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                        href: item.href,
                                                        className: classNames(first_default()(segments) === item.name ? "bg-expo-dark text-white" : "text-expo-light hover:text-white hover:bg-expo-dark", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"),
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(item.icon, {
                                                                className: classNames(first_default()(segments) === item.name ? "text-expo-dark" : "group-hover:text-white", "h-6 w-6 shrink-0"),
                                                                "aria-hidden": "true"
                                                            }),
                                                            item.name
                                                        ]
                                                    })
                                                }, item.name))
                                        })
                                    })
                                ]
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "sticky top-0 z-40 flex   items-center gap-x-6 bg-white px-4 py-4  sm:px-6",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        type: "button",
                        className: "-m-2.5 p-2.5 text-gray-700",
                        onClick: ()=>setSidebarOpen(true),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "sr-only",
                                children: "Open sidebar"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Bars3Icon/* default */.Z, {
                                className: "h-6 w-6",
                                "aria-hidden": "true"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex-1 text-sm font-semibold leading-6 text-gray-900",
                        children: "Ar Expo"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: constants/* appLinks */.VM.home(lang),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "sr-only",
                                children: "Your profile"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                className: "h-8 w-8 rounded-full bg-gray-50",
                                src: logo/* default */.Z,
                                alt: "expo",
                                fill: false,
                                placeholder: "blur",
                                loading: "lazy",
                                blurDataURL: constants/* logoBlured */.eZ
                            })
                        ]
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/MainAside.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





const MainAside = async ()=>{
    const { lang } = (0,next_navigation.useParams)();
    return /*#__PURE__*/ jsx_runtime_.jsx("aside", {
        className: `hidden md:block md:w-1/2 lg:w-7/12 xl:w-2/3 min-h-screen text-expo-dark
     bg-fixed bg-center bg-cover bg-no-repeat  border border-gray-900 flex-row justify-center items-center`,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "grid grid-rows-3 h-full",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "row-span-1 flex justify-start items-start bg-gray-100",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "text-xl",
                        children: "header"
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: constants/* appLinks */.VM.home(lang),
                    className: "row-span-1 flex justify-center items-center",
                    children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        className: "h-20 w-20 object-center rounded-md",
                        src: logo/* default */.Z,
                        alt: "ar expo",
                        fill: false,
                        placeholder: "blur",
                        loading: "lazy",
                        blurDataURL: constants/* logoBlured */.eZ
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "row-span-1 flex justify-start items-end bg-gray-100",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "text-xl",
                        children: "footer"
                    })
                })
            ]
        })
    });
};
/* harmony default export */ const components_MainAside = (MainAside);

;// CONCATENATED MODULE: ./src/components/MainContentLayout.tsx
/* __next_internal_client_entry_do_not_use__ MainContextLayout,MainContext auto */ 



const MainContext = /*#__PURE__*/ (0,react_.createContext)({});
const MainContextLayout = ({ children, trans })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(MainContext.Provider, {
        value: trans,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-row",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(SideMenu, {}),
                /*#__PURE__*/ jsx_runtime_.jsx("main", {
                    className: "w-full md:w-1/2 lg:w-5/12 xl:w-1/3 min-h-screen ",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("section", {
                        className: "mx-auto flex justify-center items-center mt-14 px-4 sm:px-6 lg:px-8 lg:py-6 ",
                        children: children
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(components_MainAside, {})
            ]
        })
    });
};



/***/ }),

/***/ 19472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ getDictionary)
/* harmony export */ });
/* harmony import */ var _i18n_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28932);


const dictionaries = {
    en: ()=>__webpack_require__.e(/* import() */ 36).then(__webpack_require__.t.bind(__webpack_require__, 60036, 19)).then((module)=>module.default),
    ar: ()=>__webpack_require__.e(/* import() */ 778).then(__webpack_require__.t.bind(__webpack_require__, 3778, 19)).then((module)=>module.default)
};
// export const getDictionary = async (locale: Locale) => {
//     return locale == 'ar' ? dictionaries.ar() : dictionaries.en();
// };
const getDictionary = async (locale)=>dictionaries[_i18n_config__WEBPACK_IMPORTED_MODULE_0__/* .i18n */ .a.locales.includes(locale) ? locale : _i18n_config__WEBPACK_IMPORTED_MODULE_0__/* .i18n */ .a.defaultLocale]();


/***/ }),

/***/ 53698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ e0)
/* harmony export */ });
/* unused harmony export MainContext */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/usama/Sites/ar-expo/src/components/MainContentLayout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["MainContextLayout"];

const e1 = proxy["MainContext"];


/***/ })

};
;