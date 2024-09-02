/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.forms.tipologia.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'prd.forms.tipologia.controller.Controller',
    'prd.forms.tipologia.model.ViewModel'
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-prd-controller-tipologia',
  viewModel: 'v1-prd-model-tipologia',
  bind: {
    iconCls: '{record.iconCls}'
  },
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});   