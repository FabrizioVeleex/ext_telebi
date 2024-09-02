Backend = function () {
    if (!location.origin) {
        location.origin = location.protocol + "//" + location.hostname + (location.port ? ':' + location.port : '');
    }
    return {
        REST_WIDGET_SWITCHUO: '/v1/widgets/switchuo/',
        REST_VERSION: '/v1/',
        REST_API: '/v1/home/',
        API_URL: location.origin,
        API_MAIL: '/v1/openmail/',
        API_WIDGET: location.origin + '/bpportal/widget/',
    }
}();
