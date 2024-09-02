/**
 * Created by luke on 29/09/21.
 */
Ext.define("sting.view.forms.ingresso.filtri.Articolo", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{articoliStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("sting.forms.filtri.cdart"),
  multiSelect:true,
  displayField: "descart",
  valueField: "cdart",
  matchFieldWidth: true,
  width: 350,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{cdart} - {descart}</li>',
    "</tpl></ul>"
  ),
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
