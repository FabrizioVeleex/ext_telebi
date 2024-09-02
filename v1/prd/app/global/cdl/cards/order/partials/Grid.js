/**
 * Created by fabrizio on 18/03/2024.
 */
Ext.define('prd.global.cdl.cards.order.partials.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: "global-cdl-cards-order-partials-grid",
  requires: [
    'Ext.form.field.ComboBox',
    'Ext.form.field.Text',
    'Ext.grid.ActionColumn',
    'portal.util.Functions'
  ],
  minHeight: 130,
  scrollable: true,
  setLoading: false,
  viewConfig: {
    emptyText: Locale.t('global.grid.empty'),
    enableTextSelection: true,
    preserveScrollOnRefresh: true,
    preserveScrollOnReload: true,
  },
  sortableColumns: false,
  disableColumnHeaders: true,
  // constrainHeader: true,
  columns: [
    { text: Locale.t('prd.forms.cdl.columns.dateLog'), xtype: "datecolumn", format: "d/m/Y H:i", dataIndex: 'dateLog', width: 160 },
    {
      text: Locale.t('prd.forms.cdl.columns.interval'), columns: [
        { text: Locale.t('prd.forms.cdl.columns.startDate'), xtype: "datecolumn", format: "d/m/Y H:i", dataIndex: 'startDate', width: 160 },
        { text: Locale.t('prd.forms.cdl.columns.endDate'), xtype: "datecolumn", format: "d/m/Y H:i", dataIndex: 'endDate', width: 160 },
      ]
    },
    {
      text: Locale.t('prd.forms.cdl.columns.uomo'), columns: [
        {
          xtype: "actioncolumn",
          maxWidth: 30,
          minWidth: 30,
          menuDisabled: true,
          dataIndex: "oreUomo",
          resizable: false,
          items: [
            {
              getClass: function (v, metadata, r) {
                switch (v) {
                  case 0:
                    metadata.tdAttr = `data-qtip="${Locale.t('prd.forms.cdl.cards.dashboard.status.process.s-0')}"`;
                    return "bd-action-null x-fas fa-clock bd-color-blue";
                  case 1:
                    metadata.tdAttr = `data-qtip="${Locale.t('prd.forms.cdl.cards.dashboard.status.process.s-1')}"`;
                    return "bd-action-null x-fas fa-check bd-color-green";
                  default:
                    metadata.tdAttr = `data-qtip="${Locale.t('prd.forms.cdl.cards.dashboard.status.process.s-2')}"`;
                    return "bd-action-null x-fas fa-times-circle bd-color-red";
                }
              },
            },
          ],
        },
        {
          text: Locale.t('prd.forms.cdl.columns.messageOreUomo'), dataIndex: 'messageOreUomo', minWidth: 200, width: 200,
          renderer: function (value, metadata, record) {
            metadata.tdAttr = 'data-qtip="' + record.get("messageOreUomo") + '"';
            return value
          }
        },
      ]
    },
    {
      text: Locale.t('prd.forms.cdl.columns.macchina'), columns: [
        {
          xtype: "actioncolumn",
          maxWidth: 30,
          minWidth: 30,
          menuDisabled: true,
          dataIndex: "oreMacchina",
          resizable: false,
          items: [
            {
              getClass: function (v, metadata, r) {
                switch (v) {
                  case 0:
                    metadata.tdAttr = `data-qtip="${Locale.t('prd.forms.cdl.cards.dashboard.status.process.s-0')}"`;
                    return "bd-action-null x-fas fa-clock bd-color-blue";
                  case 1:
                    metadata.tdAttr = `data-qtip="${Locale.t('prd.forms.cdl.cards.dashboard.status.process.s-1')}"`;
                    return "bd-action-null x-fas fa-check bd-color-green";
                  default:
                    metadata.tdAttr = `data-qtip="${Locale.t('prd.forms.cdl.cards.dashboard.status.process.s-2')}"`;
                    return "bd-action-null x-fas fa-times-circle bd-color-red";
                }
              },
            },
          ],
        },
        {
          text: Locale.t('prd.forms.cdl.columns.messageOreMacchina'), dataIndex: 'messageOreMacchina', minWidth: 200, width: 200,
          renderer: function (value, metadata, record) {
            metadata.tdAttr = 'data-qtip="' + record.get("messageOreUomo") + '"';
            return value
          }
        },
      ]
    }
  ]
});