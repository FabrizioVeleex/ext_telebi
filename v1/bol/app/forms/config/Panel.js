/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('bol.view.forms.config.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'bol.view.forms.config.controller.Controller',
    'bol.view.forms.config.model.ViewModel',
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-bol-config',
  viewModel: 'v1-bol-config',
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});