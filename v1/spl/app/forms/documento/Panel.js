/**
 * Created by fabrizio on 08/10/2022.
 */
Ext.define('spl.forms.documento.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'spl.forms.documento.controller.Controller',
    'spl.forms.documento.model.ViewModel'
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-spl-form-documento',
  viewModel: 'v1-spl-form-documento',
  bind: {
    iconCls: '{record.iconCls}'
  },
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});   