/**
 * Created by luke on 16/03/21.
 */
Ext.define('fat.forms.documento.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'fat.forms.documento.controller.Controller',
    'fat.forms.documento.model.ViewModel'
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