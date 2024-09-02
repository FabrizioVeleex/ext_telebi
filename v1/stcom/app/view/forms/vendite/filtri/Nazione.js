/**
 * Created by luke on 29/09/21.
 */
Ext.define("stcom.view.forms.vendite.filtri.Nazione", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{nazioneStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stcom.forms.filtri.nazione"),
  displayField: "nazione",
  valueField: "nazione",
  matchFieldWidth: true,
  width: 200,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyNazione'
    }
  },
  listeners: {
    select: "onChangeNazione",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
