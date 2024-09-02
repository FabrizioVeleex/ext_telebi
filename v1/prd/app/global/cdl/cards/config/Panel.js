/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.config.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.layout.container.HBox',
    'prd.global.cdl.cards.config.component.*'
  ],
  scrollable: 'y',
  margin: 15,
  dockedItems: [
    {
      xtype: 'toolbar',
      items: [
        {
          text: "Salva ed invia",
          ui: "ocra",
          iconCls: "fas fa-sync bd-color-blue",
          handler: "onSaveConfig"
        }
      ]
    }
  ],
  items: [

  ],
  listeners: {
    afterrender: "onConfigAfterRender"
  }
});