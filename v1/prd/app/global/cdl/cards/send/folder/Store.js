/**
 * Created by fabrizio on 10/03/2024.
 */
Ext.define('prd.global.cdl.cards.send.folder.Store', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.panotec-folder-store',
  root: {
    text: 'Root',
    id: 'none',
    expanded: false,
  },
  data: [],
  proxy: {
    type: 'ajax',
    url: Backend.REST_API + "functions/folder/",
    reader: {
      type: 'json',
      rootProperty: 'children'
    }
  },
  listeners: {
    load: "onLoadStore"
  }
});