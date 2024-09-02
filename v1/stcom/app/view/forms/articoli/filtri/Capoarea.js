/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.articoli.filtri.Capoarea", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{capoareaStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.capoarea"),
  displayField: "capoarea",
  valueField: "area",
  multiSelect:true,
  matchFieldWidth: true,
  width: 180,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyCapoarea'
    }
  },
  listeners: {
    select: "onChangeCapoarea",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
