/**
 * Created by luke on 29/09/21.
 */
Ext.define("home.view.dashboard.widgets.wort.view.articoli.Famiglia", {
  extend: "Ext.form.field.ComboBox",
  xtype: "v1-wort-famiglia",
  bind: {
    store: "{storeFamiglie}",
  },
  fieldLabel: Locale.t("wort.articoli.famiglia"),
  labelWidth: 80,
  displayField: "descrizione",
  valueField: "codice",
  matchFieldWidth: true,
  width: 500,
  editable:false,
  forceSelection: true,
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{codice} - {descrizione}</li>',
    "</tpl></ul>"
  ),
  listConfig: { loadingText: Locale.t("global.btn.ricerca") + "...", emptyText: Locale.t("global.grid.store.empty") },
  listeners: {
    select: "onSelectFamiglia"
  }
});
