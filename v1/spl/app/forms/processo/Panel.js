/**
 * Created by fabrizio on 06/12/2023.
 */
Ext.define('spl.forms.processo.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'spl.forms.processo.controller.Controller',
    'spl.forms.processo.model.ViewModel'
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-controller-processo',
  viewModel: 'v1-model-processo',
  bind: {
    iconCls: '{record.iconCls}'
  },
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});   