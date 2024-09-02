/**
* Created by fabri on 10/01/2023.
 */
Ext.define('stt.view.forms.cliente.components.comboSoggetto.Combo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'v1-stt-form-cliente-combosoggetto',
  name: 'idsoggetto',
  fieldLabel: Locale.t('stt.forms.cliente.fields.cdcli'),
  emptyText: Locale.t('stt.forms.cliente.combosogg.emptytext'),
  bind: {
    value: '{record.cdcli}',
    store: '{storeComboCliente}',
    readOnly: '{cdcliReadOnly}'
  },
  displayField: 'cdcli',
  valueField: 'cdcli',
  hideTrigger: true,
  width: 200,
  minChars: 2,
  queryMode: 'remote',
  selectOnFocus: true,
  tpl: Ext.create('Ext.XTemplate',
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{cdcli} - <b>{ragsoc}</b></li>',
    '</tpl></ul>'
  ),
  listConfig: { loadingText: Locale.t('global.ricerca') + '...', emptyText: Locale.t('global.form.combo.empty') },
  listeners: {
    change: 'onChangeComboSogg',
    select: 'onSelectComboSogg',
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    }
  }
});