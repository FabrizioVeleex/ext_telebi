Backend = function(){
    if (!location.origin) {
        location.origin = location.protocol + "//" +location.hostname + (location.port ? ':' + location.port: '');
    }
    return {
        REST_VERSION : '/v1/',
        REST_API : '/v1/sgv/',
        API_URL :location.origin,
        API_MAIL :'/v1/openmail/'
    }
}();