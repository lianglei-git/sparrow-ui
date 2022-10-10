var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// 打包文件
var minimist = require('minimist');
var rollupConfig = require('../config/rollup.config');
var Rollup = require('rollup');
var config = require('../config/webpack.config');
var webpack = require('webpack');
var argv = minimist(process.argv.slice(2));
var webOptions = config();
var compilers = webpack(webOptions);
var siteFunc = function () { return compilers.run(); };
var uiRollupBuild = function (bundle, config) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Array.isArray(config.output)) return [3 /*break*/, 1];
                config.output.map(function (i) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, bundle.generate(i)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, bundle.write(i)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 4];
            case 1: return [4 /*yield*/, bundle.generate(config.output)];
            case 2:
                _a.sent();
                return [4 /*yield*/, bundle.write(config.output)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var uiFunc = function (_a) {
    var _b = _a === void 0 ? { isCustom: undefined, entryPath: '' } : _a, isCustom = _b.isCustom, entryPath = _b.entryPath;
    return __awaiter(_this, void 0, void 0, function () {
        var copy, file, bundle;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    copy = Object.assign(rollupConfig);
                    file = null;
                    if (isCustom) {
                        if (Array.isArray(copy)) {
                            copy[0].input = entryPath;
                            file = copy[0].output.file;
                        }
                        else {
                            copy.input = entryPath;
                            file = copy.output.file;
                        }
                    }
                    if (!Array.isArray(copy)) return [3 /*break*/, 1];
                    copy.forEach(function (config) { return __awaiter(_this, void 0, void 0, function () {
                        var bundle;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Rollup.rollup(config)];
                                case 1:
                                    bundle = _a.sent();
                                    return [4 /*yield*/, uiRollupBuild(bundle, config)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, Rollup.rollup(copy)];
                case 2:
                    bundle = _c.sent();
                    return [4 /*yield*/, uiRollupBuild(bundle, copy)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [2 /*return*/, Promise.resolve(file)];
            }
        });
    });
};
var runIFELSE = function (sets) {
    for (var _i = 0, sets_1 = sets; _i < sets_1.length; _i++) {
        var _a = sets_1[_i], is = _a[0], fn = _a[1];
        if (is) {
            if (fn()) {
                break;
            }
        }
    }
};
runIFELSE(new Set([
    [argv.ui, uiFunc],
    [argv.site, siteFunc],
]));
module.exports = uiFunc;
