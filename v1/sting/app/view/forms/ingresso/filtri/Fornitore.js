/**
 * Created by luke on 29/09/21.
 */
Ext.define("sting.view.forms.ingresso.filtri.Fornitore", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{fornitoriStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("sting.forms.filtri.cdfor"),
  multiSelect:true,
  displayField: "ragsoc",
  valueField: "cdfor",
  matchFieldWidth: true,
  width: 350,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{cdfor} - {ragsoc}</li>',
    "</tpl></ul>"
  ),
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyFornitore'
    }
  },
  listeners: {
    select: "onChangeFornitore",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
