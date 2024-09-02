/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.send.Panel', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.layout.container.HBox',
    'prd.global.cdl.cards.send.Controller',
    'prd.global.cdl.cards.send.ViewModel',
    "prd.global.cdl.cards.send.folder.TreePanel",
    "prd.global.cdl.cards.send.grid.Grid"

  ],

  controller: 'v1-prd-controller-panotec-send',
  viewModel: 'v1-prd-model-panotec-send',
  scrollable: 'y',
  margin: 15,
  dockedItems: [

  ],
  items: [
    {
      xtype: 'fieldset', collapsible: false, collapsed: false,
      title: '<span style="color: black;font-weight:bold">' + Locale.t('prd.forms.cdl.cards.order.orders.title') + '</span>',
      style: { 'background-color': "transparent;" },
      items: [
        {
          xtype: "panotec-send-grid", itemId: "gridSend", bind: {
            store: '{storeSend}',
          }
        }
      ]
    },
    {
      xtype: 'fieldset', collapsible: false, collapsed: false,
      bind: {
        title: '<span style="color: black;font-weight:bold">' + Locale.t('prd.forms.cdl.cards.order.folder.title') + ' [<span style="font-style: italic;font-size:small;">{message}</span>]</span>'
      },
      style: { 'background-color': "transparent;" },
      items: [
        {
          xtype: "component",
          style: {
            "text-align": "center",
            "font-size": "x-large",
            "vertical-align": "middle",
          },
          bind: {
            html: `{programSelected}`
          }
        },
        {
          xtype: "panotec-folder-tree", itemId: "treePanel",
          bind: {
            store: '{storeFolders}',
          }
        }
      ]
    },
  ],
  listeners: {
    afterRender: "onAfterRender"
  }
});