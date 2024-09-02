/**
 * Created by fabrizio on 10/01/22.
 */
Ext.define("itm.grids.articolisito.modDescr.StoreModDescr", {
  extend: "Ext.data.Store",
  alias: "store.itm-v1-grids-moddescr-store",
  fields: [
    { name: "id", type: "string" },
    { name: "descrizione", type: "string" },
    { name: "descrizioneMod", type: "string" }
  ],
  proxy: {
    url: Backend.REST_API + 'grids/articoli/getstoreModDesc/',
    type: 'rest',
    reader: { type: 'json', rootProperty: 'data' },
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
