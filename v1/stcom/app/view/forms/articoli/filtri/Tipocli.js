/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.articoli.filtri.Tipocli", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{tipocliStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.tipocli"),
  //labelWidth: 60,
  displayField: "descrizione",
  valueField: "codice",
  matchFieldWidth: true,
  width: 200,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyTipocli'
    }
  },
  listeners: {
    select: "onChangeTipocli",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
