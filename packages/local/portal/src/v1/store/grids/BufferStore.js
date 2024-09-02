/**
 * deefinire -> url: ?????
 */
Ext.define('portal.v1.store.grids.BufferStore', {
    extend: 'Ext.data.BufferedStore',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'portal.util.Locale'
    ],
    pageSize: 200,
    leadingBufferZone: 300,
    autoLoad: false,
    remoteSort: true,
    remoteFilter: true,
    listeners: {
        beforeload: 'onBeforeLoad',
        load: 'onLoadStore'
    },
    proxy: {
        type: 'rest',
        simpleSortMode: true,
        url: Backend.REST_API + '/nourl',
        extraParams: {},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        },
        listeners: {
            exception: function (proxy, response, operation, eOpts) {
                if (response.status === 403) {
                    return
                }
                if (proxy.responseType === 'json' && response.responseJson) {
                    if (response.responseJson.msg) {
                        Ext.Msg.show({
                            title: Locale.t('global.attenzione'),
                            msg: response.responseJson.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                } else {
                    //  console.log(response.statusText) //TODO FIX errore
                }
                /*
               Ext.Msg.show({
                    title: Locale.t('global.attenzione'),
                    msg: Locale.t('global.error'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
                 */
            }
        }
    }


});