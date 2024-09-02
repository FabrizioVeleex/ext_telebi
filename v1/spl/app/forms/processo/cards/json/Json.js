/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define("spl.forms.processo.cards.Json", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.Panel",
    'Ext.layout.container.Fit',
  ],
  bodyPadding: 15,
  flex: 1,
  iconCls: "x-fas fa-file-code",
  overflowY: 'scroll',
  items: [],
});
