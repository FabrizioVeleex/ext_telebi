/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.cards.dettaglio.component.ComboClMer", {
  extend: "Ext.form.ComboBox",
  fieldLabel: Locale.t("stt.forms.ritardi.fields.periodo"),
  width: 300,
  displayField: "descrizione",
  valueField: "id",
  forceSelection: true,
  bind: {
    store: "{comboClMer}",
    value: "{clMer}",

  },
})
