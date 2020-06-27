module.exports = /******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = require('../../../../ssr-module-cache.js'); // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ var threw = true;
    /******/ try {
      /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete installedModules[moduleId];
      /******/
    } // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      });
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function (
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    });
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default'];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, 'a', getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 5));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './pages/api/login.js':
      /*!****************************!*\
  !*** ./pages/api/login.js ***!
  \****************************/
      /*! exports provided: default */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");\n/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__["default"] = (async (req, res) => {\n  const {\n    user\n  } = await req.body;\n  console.log(\'username\', user); // const url = `https://api.github.com/users/${username}`;\n\n  try {\n    // const response = await fetch(url);\n    // if (response.ok) {\n    // const { id } = await response.json();\n    // return res.status(200).json({ token: id });\n    return res.status(200).json({\n      token: true\n    }); // } else {\n    // const error = new Error(response.statusText);\n    // error.response = response;\n    // throw error;\n    // }\n  } catch (error) {\n    const {\n      response\n    } = error;\n    return response ? res.status(response.status).json({\n      message: response.statusText\n    }) : res.status(400).json({\n      message: error.message\n    });\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvbG9naW4uanM/MDM4NCJdLCJuYW1lcyI6WyJyZXEiLCJyZXMiLCJ1c2VyIiwiYm9keSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJqc29uIiwidG9rZW4iLCJlcnJvciIsInJlc3BvbnNlIiwibWVzc2FnZSIsInN0YXR1c1RleHQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWUsc0VBQU9BLEdBQVAsRUFBWUMsR0FBWixLQUFvQjtBQUNqQyxRQUFNO0FBQUVDO0FBQUYsTUFBVyxNQUFNRixHQUFHLENBQUNHLElBQTNCO0FBQ0FDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JILElBQXhCLEVBRmlDLENBR2pDOztBQUVBLE1BQUk7QUFDRjtBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQU9ELEdBQUcsQ0FBQ0ssTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLFdBQUssRUFBRTtBQUFULEtBQXJCLENBQVAsQ0FORSxDQU9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxHQVpELENBWUUsT0FBT0MsS0FBUCxFQUFjO0FBQ2QsVUFBTTtBQUFFQztBQUFGLFFBQWVELEtBQXJCO0FBQ0EsV0FBT0MsUUFBUSxHQUNYVCxHQUFHLENBQUNLLE1BQUosQ0FBV0ksUUFBUSxDQUFDSixNQUFwQixFQUE0QkMsSUFBNUIsQ0FBaUM7QUFBRUksYUFBTyxFQUFFRCxRQUFRLENBQUNFO0FBQXBCLEtBQWpDLENBRFcsR0FFWFgsR0FBRyxDQUFDSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUksYUFBTyxFQUFFRixLQUFLLENBQUNFO0FBQWpCLEtBQXJCLENBRko7QUFHRDtBQUNGLENBdkJEIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL2xvZ2luLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoIGZyb20gJ2lzb21vcnBoaWMtdW5mZXRjaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IHJlcS5ib2R5O1xuICBjb25zb2xlLmxvZygndXNlcm5hbWUnLCB1c2VyKTtcbiAgLy8gY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt1c2VybmFtZX1gO1xuXG4gIHRyeSB7XG4gICAgLy8gY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuXG4gICAgLy8gaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgLy8gY29uc3QgeyBpZCB9ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIC8vIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHRva2VuOiBpZCB9KTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyB0b2tlbjogdHJ1ZSB9KTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgIC8vIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgLy8gfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHsgcmVzcG9uc2UgfSA9IGVycm9yO1xuICAgIHJldHVybiByZXNwb25zZVxuICAgICAgPyByZXMuc3RhdHVzKHJlc3BvbnNlLnN0YXR1cykuanNvbih7IG1lc3NhZ2U6IHJlc3BvbnNlLnN0YXR1c1RleHQgfSlcbiAgICAgIDogcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/login.js\n'
        );

        /***/
      },

    /***/ 5:
      /*!**********************************!*\
  !*** multi ./pages/api/login.js ***!
  \**********************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! /Users/pezannekhambatta/Desktop/Isomorphic - React Redux Admin Dashboard/isomorphic/packages/isomorphic-next/pages/api/login.js */ './pages/api/login.js'
        );

        /***/
      },

    /***/ 'isomorphic-unfetch':
      /*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        eval(
          'module.exports = require("isomorphic-unfetch");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpc29tb3JwaGljLXVuZmV0Y2hcIj9lYmI2Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Imlzb21vcnBoaWMtdW5mZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzb21vcnBoaWMtdW5mZXRjaFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///isomorphic-unfetch\n'
        );

        /***/
      },

    /******/
  }
);
