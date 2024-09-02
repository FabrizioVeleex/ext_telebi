/**
* Created by Fabrizio on 15/11/23.
 */
Ext.define('prd.global.cdl.cards.dashboard.status.Panel', {
  extend: 'Ext.form.FieldSet',
  xtype: "global-cdl-cards-dashboard-status-panel",
  collapsible: true, collapsed: true,
  requires: [
    'Ext.container.Container',
    'Ext.form.TextField',
    'Ext.layout.container.VBox',
    'Ext.layout.container.HBox',
  ],
  title: '',
  style: { 'background-color': "transparent;", "margin-left": "5px", },
  bind: {
    title: `<span style="color: black;">${Locale.t("prd.forms.cdl.cards.dashboard.status.title")}: <span style="color: black;font-weight:bold;">{statoConnessione}</span> <span style="font-style:italic;font-size:small;">[{contDown}]</span></span>`,
  },
  layout: "hbox",
  defaults: {
    height: 200
  },
  items: []
});