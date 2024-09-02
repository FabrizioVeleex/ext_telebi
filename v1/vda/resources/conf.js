Backend = function(){
    if (!location.origin) {
        location.origin = location.protocol + "//" +location.hostname + (location.port ? ':' + location.port: '');
    }
    return {
        REST_VERSION : '/v1/',
        REST_API : '/v1/vda/',
        API_URL :location.origin,
        API_MAIL :location.origin+'/bpportal/libs/ZimbraL.php',
        API_ADDRESS:'/bpportal/modules/VDA/libs/',
        API_GLOBAL:'/bpportal/modules/GLOBAL/',
        API_WIDGET:location.origin+'/bpportal/widget/',
        ROOT_ADDRESS :'/bpportal/'
    }
}()