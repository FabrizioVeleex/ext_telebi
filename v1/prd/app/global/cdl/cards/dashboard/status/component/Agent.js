/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.dashboard.status.component.Agent', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-dashboard-status-component-agent",
  collapsible: false, collapsed: false, labelAlign: 'top',
  flex: 2, minWidth: 300,
  layout: { type: "hbox" },
  title: '<span style="color: black;font-weight:bold">' + Locale.t("prd.forms.cdl.cards.dashboard.status.agent.title") + '</span>',
  style: { 'background-color': "transparent;", "margin-left": "5px", },
  items: [
    {
      xtype: 'panel',
      border: false,
      width: 70,
      height: 70,
      html: '<i class="fas fa-user-secret" style="font-size:3em;padding-top:15px;color:red;"></i>'

    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "vbox" },
      defaults: { margin: 0 },
      items: [
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.cards.dashboard.status.agent.name'),
          bind: {
            value: '{agent.name}'
          }
        },
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.cards.dashboard.status.agent.status'),
          bind: {
            value: '{agent.status}'
          },
          renderer: "onRendererStatus"
        },
        {
          xtype: 'displayfield',
          fieldLabel: Locale.t('prd.forms.cdl.cards.dashboard.status.agent.date'),
          bind: {
            value: '{agent.lastUpdate}'
          },
          renderer: function (v, metadata, r) {
            // let parsedDate = Ext.Date.parse(v, 'Y-m-d\\TH:i:s.u\\Z');
            let parsedDate = Ext.Date.parse(v, 'C');
            return Ext.Date.format(parsedDate, "d/m/Y H:i");
          }
        },
      ]
    }
  ]
});