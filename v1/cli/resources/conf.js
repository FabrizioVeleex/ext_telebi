Backend = function(){
    if (!location.origin) {
        location.origin = location.protocol + "//" +location.hostname + (location.port ? ':' + location.port: '');
    }
    return {
        REST_VERSION : '/v1/',
        REST_API : '/v1/cli/',
        API_URL :location.origin
    }
}()