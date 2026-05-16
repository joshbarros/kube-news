"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@standard-schema+utils@0.3.0";
exports.ids = ["vendor-chunks/@standard-schema+utils@0.3.0"];
exports.modules = {

/***/ "(ssr)/../../node_modules/.pnpm/@standard-schema+utils@0.3.0/node_modules/@standard-schema/utils/dist/index.js":
/*!***************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@standard-schema+utils@0.3.0/node_modules/@standard-schema/utils/dist/index.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SchemaError: () => (/* binding */ SchemaError),\n/* harmony export */   getDotPath: () => (/* binding */ getDotPath)\n/* harmony export */ });\n// src/getDotPath/getDotPath.ts\nfunction getDotPath(issue) {\n  if (issue.path?.length) {\n    let dotPath = \"\";\n    for (const item of issue.path) {\n      const key = typeof item === \"object\" ? item.key : item;\n      if (typeof key === \"string\" || typeof key === \"number\") {\n        if (dotPath) {\n          dotPath += `.${key}`;\n        } else {\n          dotPath += key;\n        }\n      } else {\n        return null;\n      }\n    }\n    return dotPath;\n  }\n  return null;\n}\n\n// src/SchemaError/SchemaError.ts\nvar SchemaError = class extends Error {\n  /**\n   * The schema issues.\n   */\n  issues;\n  /**\n   * Creates a schema error with useful information.\n   *\n   * @param issues The schema issues.\n   */\n  constructor(issues) {\n    super(issues[0].message);\n    this.name = \"SchemaError\";\n    this.issues = issues;\n  }\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL0BzdGFuZGFyZC1zY2hlbWErdXRpbHNAMC4zLjAvbm9kZV9tb2R1bGVzL0BzdGFuZGFyZC1zY2hlbWEvdXRpbHMvZGlzdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSTtBQUM3QixVQUFVO0FBQ1Y7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUUiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb3N1ZWJhcnJvczE5OTUvUFJPSkVDVFMvRVZFTlRTL0ZBQlJJQ0lPLVZFUk9ORVovQ0xBVURFLUNPREUtUEFSQS1ERVZPUFMva3ViZS1uZXdzL25vZGVfbW9kdWxlcy8ucG5wbS9Ac3RhbmRhcmQtc2NoZW1hK3V0aWxzQDAuMy4wL25vZGVfbW9kdWxlcy9Ac3RhbmRhcmQtc2NoZW1hL3V0aWxzL2Rpc3QvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2dldERvdFBhdGgvZ2V0RG90UGF0aC50c1xuZnVuY3Rpb24gZ2V0RG90UGF0aChpc3N1ZSkge1xuICBpZiAoaXNzdWUucGF0aD8ubGVuZ3RoKSB7XG4gICAgbGV0IGRvdFBhdGggPSBcIlwiO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpc3N1ZS5wYXRoKSB7XG4gICAgICBjb25zdCBrZXkgPSB0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIiA/IGl0ZW0ua2V5IDogaXRlbTtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBrZXkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgaWYgKGRvdFBhdGgpIHtcbiAgICAgICAgICBkb3RQYXRoICs9IGAuJHtrZXl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb3RQYXRoICs9IGtleTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb3RQYXRoO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vLyBzcmMvU2NoZW1hRXJyb3IvU2NoZW1hRXJyb3IudHNcbnZhciBTY2hlbWFFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICAvKipcbiAgICogVGhlIHNjaGVtYSBpc3N1ZXMuXG4gICAqL1xuICBpc3N1ZXM7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc2NoZW1hIGVycm9yIHdpdGggdXNlZnVsIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gaXNzdWVzIFRoZSBzY2hlbWEgaXNzdWVzLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaXNzdWVzKSB7XG4gICAgc3VwZXIoaXNzdWVzWzBdLm1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9IFwiU2NoZW1hRXJyb3JcIjtcbiAgICB0aGlzLmlzc3VlcyA9IGlzc3VlcztcbiAgfVxufTtcbmV4cG9ydCB7XG4gIFNjaGVtYUVycm9yLFxuICBnZXREb3RQYXRoXG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/.pnpm/@standard-schema+utils@0.3.0/node_modules/@standard-schema/utils/dist/index.js\n");

/***/ })

};
;