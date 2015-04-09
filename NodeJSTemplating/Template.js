var fs = require('fs'),
    sanitizer = require('sanitize-html'),
    Promise = require('promise');

var Template = function () {
    var TemplateObject = {},
        _parseRE = /{{([^}}]+)?}}/g,
        _match,
        _ReadFile = function (path) {
            var _readFile = function (path, success, fail) {
                fs.readFile(path, { 'encoding': 'utf8' }, function (err, data) {
                    if (err) fail(err);
                    
                    success(data);
                });
            };
            
            return new Promise(function (resolve, reject) {
                _readFile(path, resolve, reject);
            });
       };
    
    TemplateObject.Render = function (template, data) {
        var _tag, _tagValue, 
            _result = '';
        
        return _ReadFile(template).then(function (templateContent) {
            _result = templateContent;

            while (_match = _parseRE.exec(_result)) {
                _tag = _match[0];
                _tagValue = sanitizer(data[_match[1].trim()]);
                _result = _result.replace(_tag, _tagValue);
            }
            
            return _result;
        });
    };
    
    return TemplateObject;
};

module.exports = Template();