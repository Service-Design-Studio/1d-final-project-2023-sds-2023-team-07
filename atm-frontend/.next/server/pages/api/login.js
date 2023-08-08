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
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "(api)/./src/components/url.ts":
/*!*******************************!*\
  !*** ./src/components/url.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst URL = \"https://backend-dbs-grp7-ml42q3c3ya-as.a.run.app/login\";\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (URL);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvY29tcG9uZW50cy91cmwudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU1BLE1BQU07QUFFWixpRUFBZUEsR0FBR0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2F0bS1mcm9udGVuZC8uL3NyYy9jb21wb25lbnRzL3VybC50cz9hMDg1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFVSTCA9IFwiaHR0cHM6Ly9iYWNrZW5kLWRicy1ncnA3LW1sNDJxM2MzeWEtYXMuYS5ydW4uYXBwL2xvZ2luXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFVSTDtcbiJdLCJuYW1lcyI6WyJVUkwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/components/url.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/login.page.ts":
/*!*************************************!*\
  !*** ./src/pages/api/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _components_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/url */ \"(api)/./src/components/url.ts\");\n\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).end();\n    }\n    try {\n        const response = await fetch(`${_components_url__WEBPACK_IMPORTED_MODULE_0__[\"default\"]}/login`, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify(req.body),\n            credentials: \"include\"\n        });\n        const data = await response.json(); // Used 'any' for simplicity. You can replace it with a specific type later.\n        if (!response.ok) {\n            throw new Error(data.message || \"Failed to post data to /login\");\n        }\n        res.status(200).json(data);\n    } catch (error) {\n        res.status(500).json({\n            message: error.message\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2xvZ2luLnBhZ2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDbUM7QUFFcEIsZUFBZUMsUUFDNUJDLEdBQW1CLEVBQ25CQyxHQUFvQjtJQUVwQixJQUFJRCxJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUN6QixPQUFPRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsR0FBRztJQUM1QjtJQUVBLElBQUk7UUFDRixNQUFNQyxXQUFXLE1BQU1DLE1BQU0sQ0FBQyxFQUFFUix1REFBR0EsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQ0ksUUFBUTtZQUNSSyxTQUFTO2dCQUNQLGdCQUFnQjtZQUNsQjtZQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUNWLElBQUlRLElBQUk7WUFDN0JHLGFBQWE7UUFDZjtRQUVBLE1BQU1DLE9BQVksTUFBTVAsU0FBU1EsSUFBSSxJQUFJLDRFQUE0RTtRQUVySCxJQUFJLENBQUNSLFNBQVNTLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUlDLE1BQU1ILEtBQUtJLE9BQU8sSUFBSTtRQUNsQztRQUVBZixJQUFJRSxNQUFNLENBQUMsS0FBS1UsSUFBSSxDQUFDRDtJQUN2QixFQUFFLE9BQU9LLE9BQU87UUFDZGhCLElBQUlFLE1BQU0sQ0FBQyxLQUFLVSxJQUFJLENBQUM7WUFBRUcsU0FBUyxNQUFpQkEsT0FBTztRQUFDO0lBQzNEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdG0tZnJvbnRlbmQvLi9zcmMvcGFnZXMvYXBpL2xvZ2luLnBhZ2UudHM/MzhmYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBVUkwgZnJvbSBcIkAvY29tcG9uZW50cy91cmxcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2Vcbikge1xuICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmVuZCgpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1VSTH0vbG9naW5gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXEuYm9keSksXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBkYXRhOiBhbnkgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIFVzZWQgJ2FueScgZm9yIHNpbXBsaWNpdHkuIFlvdSBjYW4gcmVwbGFjZSBpdCB3aXRoIGEgc3BlY2lmaWMgdHlwZSBsYXRlci5cblxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gcG9zdCBkYXRhIHRvIC9sb2dpblwiKTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IChlcnJvciBhcyBFcnJvcikubWVzc2FnZSB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlVSTCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJlbmQiLCJyZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY3JlZGVudGlhbHMiLCJkYXRhIiwianNvbiIsIm9rIiwiRXJyb3IiLCJtZXNzYWdlIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/login.page.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/login.page.ts"));
module.exports = __webpack_exports__;

})();