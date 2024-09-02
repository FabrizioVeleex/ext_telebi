Backend = function () {
    if (!location.origin) {
        location.origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '');
    }
    return {
        REST_VERSION: '/api/v1/',
        REST_API: '/api/v1/spl/',
        API_URL: location.origin
    }
}();