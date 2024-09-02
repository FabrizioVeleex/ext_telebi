/**
 * Created by fabrizio on 12/02/22.
 */
Ext.define('vda.store.forms.mail.Store', {
  extend: 'Ext.data.Store',
  alias: "store.v1-destinatari",
  requires: ["Ext.data.proxy.Rest"],
  data: [],
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "forms/mail/emailsogg/",
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    }
  }
});