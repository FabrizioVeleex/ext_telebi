/**
 * Created by luke on 16/03/21.
 */
Ext.define('t40.main.footer.Footer', {
  extend: 'Ext.panel.Panel',
  requires: [

  ],
  flex: 1,
  layout: { type: "hbox" },
  defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
  items: [ //121
    {
      xtype: "fieldset",
      title: Locale.t("t40.grids.footer.titles.report"),
      width: "50%",
      style: { height: '230px' },
      items: [
        {
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.durata_media"),
          bind: {
            value: '{footerStore.durata_media}',
          },
          readOnly: true,
        },
        {
          readOnly: true,
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.durata_max"),
          bind: {
            value: '{footerStore.durata_max}',
          }
        },
        {
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.durata_min"),
          readOnly: true,
          bind: {
            value: '{footerStore.durata_min}',
          }
        },
        {
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.tempo_totale"),
          readOnly: true,
          bind: {
            value: '{footerStore.tempo_totale}',
          }
        },
      ]
    },
    {
      xtype: "fieldset",
      title: Locale.t("t40.grids.footer.titles.dati_ultimo_processato"),
      width: "50%",
      style: { height: '230px' },
      items: [
        {
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.data_ora_inizio"),
          readOnly: true,
          bind: {
            value: '{footerStore.dettaglio.data_ora_inizio}',
          }
        },
        {
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.qta"),
          readOnly: true,
          bind: {
            value: '{footerStore.dettaglio.qta}',
          }
        },
        {
          xtype: "textfield",
          fieldLabel: Locale.t("t40.grids.footer.fields.durata"),
          readOnly: true,
          bind: {
            value: '{footerStore.dettaglio.durata}',
          }
        }
      ]
    }
  ],
  listeners: {
  },
});   