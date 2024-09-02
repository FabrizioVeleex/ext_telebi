/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.dashboard.status.component.Cdl', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-dashboard-status-component-cdl",
  collapsible: false, collapsed: false, labelAlign: 'top',
  flex: 2, minWidth: 300,
  layout: { type: "hbox" },
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.dashboard.status.cdl.title')}</span>`,
  style: { 'background-color': "transparent;", "margin-left": "5px", },
  items: [
    {
      xtype: 'panel',
      border: false,
      width: 70,
      height: 70,
      bind: {
        html: "{logoCdl}"
      }

    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "vbox" },
      defaults: { margin: 0 },
      items: [

        {
          xtype: 'displayfield',
          labelWidth: 180,
          fieldLabel: Locale.t('prd.forms.cdl.cards.dashboard.status.cdl.status'),
          bind: {
            value: '{cdl.mtConnect}'
          },
          renderer: "onRendererStatus"
        },

      ]
    },
  ]
});