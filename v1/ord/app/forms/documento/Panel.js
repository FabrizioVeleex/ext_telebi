/**
 * Created by luke on 16/03/21.
 */
Ext.define('ord.forms.documento.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'ord.forms.documento.controller.Controller',
    'ord.forms.documento.model.ViewModel'
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-controller-documento',
  viewModel: 'v1-model-documento',
  bind: {
    iconCls: '{record.iconCls}'
  },
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});   