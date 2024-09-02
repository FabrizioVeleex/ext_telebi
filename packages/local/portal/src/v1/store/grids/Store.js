/**
 * Created by fabrizio on 30/01/21.
 */
Ext.define('portal.v1.store.grids.Store', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.Rest',
        'portal.util.Locale'
    ],
    remoteSort: true,
    remoteFilter: true,
    autoLoad: false,
    listeners: {
        beforeload: function (store) {
            if (store.isLoading()) return false;
        },
        load: 'onLoadStore'
    },
    proxy: {
        type: 'rest',
        simpleSortMode:true,
        reader: {type: 'json', rootProperty: 'data'},
        listeners: {
            exception: function (proxy, response) {
                if (response.status === 403) {
                    return
                }

                if (proxy.responseType === 'json') {
                    if (response.responseJson.msg) {
                        Ext.Msg.show({
                            title: Locale.t('global.attenzione'),
                            msg: response.responseJson.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                        return;
                    }
                }
                Ext.Msg.show({
                    title: Locale.t('global.attenzione'),
                    msg: Locale.t('global.error'),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }
    },
});