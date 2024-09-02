/**
 * Created by fabri on 19/02/2022.
 */
Ext.define('orf.forms.documento.component.comboSoggetto.Combo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'v1-orf-form-documento-combosoggetto',
  bind: {
    store: '{comboSoggetto}',
  },
  name: 'idsoggetto',
  itemId: 'comboSogg',
  fieldLabel: Locale.t('orf.forms.documento.btn.associa.soggetto'),
  labelWidth: 80,
  emptyText: Locale.t('orf.forms.documento.btn.associa.emptytext'),
  displayField: 'ragsoc',
  valueField: 'id',
  hideTrigger: true,
  width: 500,
  minChars: 3,
  queryMode: 'remote',
  selectOnFocus: true,
  tpl: Ext.create('Ext.XTemplate',
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{tipo} - <b>{ragsoc}</b></li>',
    '</tpl></ul>'
  ),
  listConfig: { loadingText: Locale.t('global.ricerca') + '...', emptyText: Locale.t('global.form.combo.empty') },
  listeners: {
    select: 'onSelectComboSogg',
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    }
  }
});