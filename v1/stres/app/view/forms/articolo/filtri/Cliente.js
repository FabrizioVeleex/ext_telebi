/**
 * Created by luke on 29/09/21.
 */
Ext.define("stres.view.forms.articolo.filtri.Cliente", {
  extend: "Ext.form.field.ComboBox",
  bind: {
    store: "{clientiStore}",
  },
  queryMode:'remote',
  fieldLabel: Locale.t("stres.forms.filtri.cliente"),
  multiSelect:true,
  displayField: "ragsoc",
  valueField: "codice",
  matchFieldWidth: true,
  width: 350,
  minChars: 3,
  selectOnFocus: true,
  forceSelection: true,
  tpl: Ext.create(
    "Ext.XTemplate",
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{cdcli} - {ragsoc}</li>',
    "</tpl></ul>"
  ),
  triggers: {
    clear: {
      cls: 'x-form-clear-trigger',	//weight: -1,
      handler:  'onSpecialkeyCliente'
    }
  },
  listeners: {
    select: "onChangeCliente",
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    },
  },
});
