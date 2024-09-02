/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define('stt.view.forms.ritardi.components.toolbarFooter.Toolbar', {
  extend: 'Ext.Toolbar',
  dock: "bottom",
  bind: {
    hidden: "{toolbarFooter}",
  },
  items: [
    {
      xtype: "textfield",
      hidden: true,
      width: 300,
      hasSearch: false,
      paramName: "query",
      triggers: {
        clear: {
          cls: "x-form-clear-trigger",
          hidden: true,
          handler: "onClearTriggetSearch",
        },
        search: {
          cls: "x-form-search-trigger",
          handler: "onSearchTriggetSearch",
        },
      },
      listeners: {
        specialkey: "onSpecialkeySearch",
      },
    },
    { xtype: "tbfill" },
    {
      xtype: "displayfield",
      itemId: "totalCount",
    },
  ],
});