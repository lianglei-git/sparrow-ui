"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Loading", {
  enumerable: true,
  get: function get() {
    return _loading.Loading;
  }
});
Object.defineProperty(exports, "Message", {
  enumerable: true,
  get: function get() {
    return _message.Message;
  }
});
Object.defineProperty(exports, "Modal", {
  enumerable: true,
  get: function get() {
    return _modal.Modal;
  }
});
Object.defineProperty(exports, "Notify", {
  enumerable: true,
  get: function get() {
    return _notification.Notify;
  }
});
exports["default"] = void 0;

var _common = require("./_utils/common");

var _message = require("./message");

var _modal = require("./modal");

var _loading = require("./loading");

var _notification = require("./notification");

require("./common/styles");

require("./drawer");

require("./switch");

require("./alert");

require("./button");

require("./timeline");

require("./breadcrumb");

require("./progress");

require("./affix");

require("./backtop");

require("./tooltip");

require("./popover");

require("./pop-confirm");

require("./slider");

require("./avatar");

require("./badge");

require("./card");

require("./collapse");

require("./divider");

require("./input");

require("./search");

require("./password");

require("./textarea");

require("./InputNumber");

require("./checkbox");

require("./radio");

var Spui = {
  Modal: _modal.Modal,
  Message: _message.Message,
  Loading: _loading.Loading,
  Notify: _notification.Notify
};
(0, _common.getGlobalThis)().Spui = Spui;
var _default = Spui;
exports["default"] = _default;