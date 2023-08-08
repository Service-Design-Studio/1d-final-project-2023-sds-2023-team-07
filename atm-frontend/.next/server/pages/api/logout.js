"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/logout";
exports.ids = ["pages/api/logout"];
exports.modules = {

/***/ "(api)/./src/components/url.ts":
/*!*******************************!*\
  !*** ./src/components/url.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst URL = \"https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/login\";\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (URL);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvY29tcG9uZW50cy91cmwudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLE1BQU07QUFFWixpRUFBZUEsR0FBR0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2F0bS1mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL3VybC50cz9hMDg1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFVSTCA9IFwiaHR0cHM6Ly9iYWNrZW5kLWRicy1ncnA3LW1sNDJxM2MzeWEtYXMuYS5ydW4uYXBwL2xvZ2luXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFVSTDtcbiJdLCJuYW1lcyI6WyJVUkwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/components/url.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/logout.page.ts":
/*!**************************************!*\
  !*** ./src/pages/api/logout.page.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _components_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/url */ \"(api)/./src/components/url.ts\");\n\nasync function handler(req, res) {\n    if (req.method !== \"DELETE\") {\n        return res.status(405).end();\n    }\n    try {\n        const response = await fetch(`${_components_url__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/logout`, {\n            method: \"DELETE\",\n            credentials: \"include\"\n        });\n        const data = await response.json(); // Used 'any' for simplicity. Consider replacing with a specific type/interface if you know the response shape.\n        if (!response.ok) {\n            throw new Error(data.message || \"Failed to delete data to /logout\");\n        }\n        res.status(200).json(data);\n    } catch (error) {\n        res.status(500).json({\n            message: error.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2xvZ291dC5wYWdlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQ21DO0FBRXBCLGVBQWVDLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBb0I7SUFFcEIsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFVBQVU7UUFDM0IsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLEdBQUc7SUFDNUI7SUFFQSxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLENBQUMsRUFBRVIsdURBQUdBLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUNJLFFBQVE7WUFDUkssYUFBYTtRQUNmO1FBRUEsTUFBTUMsT0FBWSxNQUFNSCxTQUFTSSxJQUFJLElBQUksK0dBQStHO1FBRXhKLElBQUksQ0FBQ0osU0FBU0ssRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSUMsTUFBTUgsS0FBS0ksT0FBTyxJQUFJO1FBQ2xDO1FBRUFYLElBQUlFLE1BQU0sQ0FBQyxLQUFLTSxJQUFJLENBQUNEO0lBQ3ZCLEVBQUUsT0FBT0ssT0FBTztRQUNkWixJQUFJRSxNQUFNLENBQUMsS0FBS00sSUFBSSxDQUFDO1lBQUVHLFNBQVMsTUFBaUJBLE9BQU87UUFBQztJQUMzRDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXRtLWZyb250ZW5kLy4vc3JjL3BhZ2VzL2FwaS9sb2dvdXQucGFnZS50cz81YTQxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IFVSTCBmcm9tIFwiQC9jb21wb25lbnRzL3VybFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZVxuKSB7XG4gIGlmIChyZXEubWV0aG9kICE9PSBcIkRFTEVURVwiKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5lbmQoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtVUkx9L2xvZ291dGAsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGE6IGFueSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8gVXNlZCAnYW55JyBmb3Igc2ltcGxpY2l0eS4gQ29uc2lkZXIgcmVwbGFjaW5nIHdpdGggYSBzcGVjaWZpYyB0eXBlL2ludGVyZmFjZSBpZiB5b3Uga25vdyB0aGUgcmVzcG9uc2Ugc2hhcGUuXG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGRlbGV0ZSBkYXRhIHRvIC9sb2dvdXRcIik7XG4gICAgfVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oZGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2UgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJVUkwiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwiZW5kIiwicmVzcG9uc2UiLCJmZXRjaCIsImNyZWRlbnRpYWxzIiwiZGF0YSIsImpzb24iLCJvayIsIkVycm9yIiwibWVzc2FnZSIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/logout.page.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/logout.page.ts"));
module.exports = __webpack_exports__;

})();