/**
 * Created by fabrizio on 24/01/23.
 */
Ext.define("stt.view.forms.budget.Panel", {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    'stt.view.forms.budget.Controller',
    'stt.view.forms.budget.Model'
  ],
  title: Locale.t('global.form.caricamento'),
  controller: 'v1-stt-form-budget',
  viewModel: 'v1-stt-form-budget',
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender',
  }
});
