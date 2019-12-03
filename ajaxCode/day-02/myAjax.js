function myAjax(options) {
    options.url = options.url || '';
    options.type = options.type || 'get';
    options.data = options.data || '';
    var xhr = new XMLHttpRequest();
    if (typeof options.data == "object") {
        let arr = [];
        for(let prop in options.data) {
            arr.push(`${prop}=${options.data[prop]}`);
        }
        options.data = arr.join('&');
    }
    if (options.type.toLowerCase() == 'get') {
        options.url += '?' + options.data;
        options.data = null;
    }
    xhr.open(options.type, options.url);
    if (options.type.toLowerCase() == 'post') {
        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.send(options.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let res = xhr.responseText;
            if (xhr.getResponseHeader('content-Type').indexOf('json')) {
                res = JSON.parse(res);
            }
            options.success && options.success(res);
        }
    }
}