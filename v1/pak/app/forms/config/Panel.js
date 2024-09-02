/**
 * Created by fabrizio on 08/03/2022.
 */

Ext.define('pak.view.forms.config.Panel', {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'pak.view.forms.config.controller.Controller',
    'pak.view.forms.config.model.ViewModel',
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-pak-config',
  viewModel: 'v1-pak-config',
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }
});