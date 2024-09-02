/**
 * Created by luke on 27/09/22.
 */
Ext.define('vms.view.forms.controllo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.controllo.Controller',
        'vms.view.forms.controllo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-controllo',
    viewModel: 'v1-controllo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});