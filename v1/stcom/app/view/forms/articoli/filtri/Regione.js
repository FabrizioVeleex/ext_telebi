/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.articoli.filtri.Regione", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{regioneStore}",
    hidden: "{hideRegione}"
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.regione"),
  displayField: "regione",
  valueField: "regione",
  multiSelect:true,
  matchFieldWidth: true,
  width: 200,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyRegione'
    }
  },
  listeners: {
    select: "onChangeRegione",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
