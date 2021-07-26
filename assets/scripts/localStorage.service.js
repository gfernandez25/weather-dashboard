var localStorageService = {};
var _this = localStorageService;

_this.setLocalStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

_this.getLocalStorage = function (key, expectedType = 'string') {
    var value = localStorage.getItem(key);
    return !!value ? JSON.parse(value) : _setDefaultWhenNoValue(expectedType);
}

function _setDefaultWhenNoValue(expectedType) {
    var defaultType;

    switch (expectedType) {
        case 'object':
            defaultType = {};
            break;
        case 'array':
            defaultType = [];
            break;
        default:
            defaultType = "";
    }

    return defaultType
}
