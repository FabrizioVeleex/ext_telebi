/**
 * Created by fabrizio on 12/02/22.
 */
Ext.define('orf.forms.documento.component.tagEmail.Store', {
  extend: 'Ext.data.Store',
  alias: "store.v1-orf-forms-documento-tagemaildefault",
  requires: ["Ext.data.proxy.Rest"],
  data: [],
  proxy: {
    type: "rest",
    simpleSortMode: true,
    url: Backend.REST_API + "forms/documento/emailsogg/",
    reader: {
      type: "json",
      rootProperty: "data",
      totalProperty: "totalCount",
    },
  },
});