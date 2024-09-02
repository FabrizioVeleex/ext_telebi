Ext.define('sdc.view.forms.sdconfig.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'sdc.view.forms.sdconfig.Controller',
    'sdc.view.forms.sdconfig.Model'
  ],
  title: Locale.t('global.form.caricamento'),
  bodyPadding: 15,
  closable: false,
  controller: 'v1-parametri',
  viewModel: 'v1-parametri',
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
})