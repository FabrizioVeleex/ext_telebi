/**
 * Created by luke on 29/09/21.
 */
Ext.define("home.view.dashboard.widgets.word.view.main.fields.Cliente", {
  extend: "Ext.form.field.ComboBox",
  xtype: "v1-word-cliente",
  hasSearch: false,
  bind: {
    store: "{searchCliStore}",
  },
  fieldLabel: Locale.t("word.searchcli"),
  labelAlign: "top",
  labelWidth: 80,
  emptyText: Locale.t("word.searchcliempty"),
  displayField: "ragsoc",
  valueField: "codice",
  hideTrigger: true,
  matchFieldWidth: true,
  width: 350,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{codice} - {ragsoc}</li>',
    "</tpl></ul>"
  ),
  listConfig: { loadingText: Locale.t("global.btn.ricerca") + "...", emptyText: Locale.t("global.grid.store.empty") },
  listeners: {
    select: "onSelectCliente",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
