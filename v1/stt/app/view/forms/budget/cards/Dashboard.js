/**
 * Created by fabrizio on 22/07/22.
 */
Ext.define("stt.view.forms.budget.cards.Dashboard", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.layout.container.HBox",
    "stt.view.forms.budget.cards.dettaglio.GridArticoli"
  ],
  scrollable: "y",
  title: "Dashboard",
  bodyPadding: 15,
  items: [
    {
      xtype: "container",
      flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: "top", msgTarget: "side" },
      items: [
      ],
    },
  ],

});
