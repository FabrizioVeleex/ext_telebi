/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.articoli.filtri.Classe", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{classeStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.classe"),
  displayField: "descrizione",
  valueField: "clm",
  multiSelect:true,
  matchFieldWidth: true,
  width: 300,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyClasse'
    }
  },
  listeners: {
    select: "onChangeClasse",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
