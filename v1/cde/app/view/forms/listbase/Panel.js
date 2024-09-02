/**
 * Created by luke on 13/02/24.
 */
Ext.define('cde.view.forms.listbase.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'cde.view.forms.listbase.Controller',
        'cde.view.forms.listbase.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-cde-form-listbase',
    viewModel: 'v1-cde-form-listbase',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});