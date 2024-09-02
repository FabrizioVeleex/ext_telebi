/**
 * Created by fabrizio on 19/02/2022.
 */
Ext.define('spl.global.filtri.combo_ord.ComboSoggetto', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'v1-spl-global-filtri-ord-combocli',
  bind: {
    store: '{comboCli}',
  },
  fieldLabel: Locale.t('spl.forms.documento.btn.associa.soggetto'),
  emptyText: Locale.t('spl.forms.documento.btn.associa.emptytext'),
  displayField: 'ragsoc',
  valueField: 'id',
  hideTrigger: true,
  width: 500,
  minChars: 3,
  queryMode: 'remote',
  selectOnFocus: true,
  tpl: Ext.create('Ext.XTemplate',
    '<ul class="x-list-plain"><tpl for=".">',
    '<li role="option" class="x-boundlist-item">{tipo_sogg} - <b>{codice} {ragsoc}</b></li>',
    '</tpl></ul>'
  ),
  listConfig: { loadingText: Locale.t('global.ricerca') + '...', emptyText: Locale.t('global.form.combo.empty') },
  listeners: {
    beforequery: function (qe) {
      delete qe.combo.lastQuery;
    }
  }
});