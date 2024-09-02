/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.vendite.filtri.Mese", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{meseStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.mese"),
  displayField: "mese",
  valueField: "codice",
  multiSelect:true,
  matchFieldWidth: true,
  width: 300,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',
      handler:  'onSpecialkeyMese'
    }
  },
  listeners: {
    select: "onChangeMese",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
