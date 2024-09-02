/**
 * Created by luke on 15/09/22.
 */
Ext.define('vms.view.forms.tipo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.tipo.Controller',
        'vms.view.forms.tipo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-tipo',
    viewModel: 'v1-tipo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});