/**
 * 
 * @param {object} options
 * @example url: '' 
 * @example data: {} 
 * @example type: 'get' 
 * @example success: function(){} 
 */
function bAjax(options = {}) {
    options.url = options.url || '';
    options.type = options.type || 'get';
    options.type = options.type.toLowerCase();
    options.data = options.data || '';
    options.processData = options.processData || true;
    options.contentType = options.contentType || true;
    if (typeof options.data == 'object' && options.processData) {
        var arr = [];
        for (var prop in options.data) {
            arr.push(prop + '=' + options.data[prop]);
        }
        options.data = arr.join("&");
    }
    var xhr = new XMLHttpRequest();
    if (options.type == 'get') {
        options.url += '?' + options.data;
        options.data = null;
    }
    xhr.open(options.type, options.url);
    if (options.type == 'post' && options.contentType) {
        xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    }
    xhr.send(options.data);
    xhr.onreadystatechange = function() {
        let res = xhr.responseText;
        if (xhr.getResponseHeader("content-Type").indexOf('json')) {
            res = JSON.parse(res);
        }
        options.success && options.success(res);
    }
}