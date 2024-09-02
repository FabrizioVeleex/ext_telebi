/**
 * Created by luke on 15/09/22.
 */
Ext.define('vms.view.forms.sede.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.sede.Controller',
        'vms.view.forms.sede.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-sede',
    viewModel: 'v1-sede',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});