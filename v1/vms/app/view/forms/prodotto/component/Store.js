/**
 * Created by fabrizio on 12/02/22.
 */
Ext.define('vms.view.forms.prodotto.component.Store', {
  extend: 'Ext.data.Store',
  alias: "store.v1-tagstabilimenti",
  requires: ["Ext.data.proxy.Rest"],
  data: [],
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "forms/prodotto/stabilimenti/",
    reader: {
      type: "json",
      rootProperty: "data"
    }
  }
});