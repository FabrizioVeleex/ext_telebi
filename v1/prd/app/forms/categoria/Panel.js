/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.forms.categoria.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'prd.forms.categoria.controller.Controller',
    'prd.forms.categoria.model.ViewModel'
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-prd-controller-categoria',
  viewModel: 'v1-prd-model-categoria',
  bind: {
    iconCls: '{record.iconCls}'
  },
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});   