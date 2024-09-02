/**
 * Created by fabrizio on 12/02/22.
 */
Ext.define('spl.forms.documento.component.mail.tagEmail.Store', {
  extend: 'Ext.data.Store',
  alias: "store.v1-spl-forms-documento-tagemaildefault",
  requires: ["Ext.data.proxy.Rest"],
  data: [],
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "functions/getemail/",
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
  },
});