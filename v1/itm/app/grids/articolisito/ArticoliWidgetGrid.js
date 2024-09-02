Ext.define('itm.grids.articolisito.ArticoliWidgetGrid', {
  extend: 'Ext.panel.Panel',
  itemId: 'widgetPanelGrid',
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          ui: 'ocra',
          iconCls: 'fas fa-times',
          text: 'Annulla',
          stato: -1,
          handler: 'ontoggleGrid'
        },

        {
          itemId: 'saveBtn',
          ui: 'green',
          iconCls: 'fas fa-save',
          text: "Salva e chiudi",
          stato: 1,
          handler: 'ontoggleGrid'
        },

      ]
    }
  ],
  items: [],
})