/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.dashboard.status.component.Connection', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-dashboard-status-component-connection",
  collapsible: false, collapsed: false, labelAlign: 'top',
  flex: 2, minWidth: 300,
  layout: { type: "hbox" },
  title: `<span style="color: black;font-weight:bold">${Locale.t('prd.forms.cdl.cards.dashboard.status.connection.title')}</span>`,
  style: { 'background-color': "transparent;", "margin-left": "5px", },
  items: [
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 0 },
      items: [
        {
          xtype: 'panel',
          border: false,
          width: 70,
          height: 70,
          bind: {
            html: '<img style="margin-left:5px;height:50px;margin-top:14px;" src="/images/prd/logo_{logoErp}.png">'
          }
        },
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.cards.dashboard.status.connection.status'),
          bind: {
            value: '{erp.connection}'
          },
          renderer: "onRendererStatus"
        },
      ]
    },
  ]
});