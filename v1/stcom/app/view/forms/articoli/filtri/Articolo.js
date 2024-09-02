/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.articoli.filtri.Articolo", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{articoloStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.articolo"),
  displayField: "cdart",
  valueField: "cdart",
  multiSelect:true,
  matchFieldWidth: true,
  width: 300,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyArticolo'
    }
  },
  listeners: {
    select: "onChangeArticolo",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
