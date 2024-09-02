/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.cards.Spool", {
  extend: "Ext.tab.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.layout.container.Fit',
  ],
  bodyPadding: 3,
  iconCls: "x-fas fa-cloud-download-alt",
  tabPosition: "left",
  items: [],
});
