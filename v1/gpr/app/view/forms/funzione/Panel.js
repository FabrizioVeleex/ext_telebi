/**
 * Created by luke on 26/06/22.
 */
Ext.define('gpr.view.forms.funzione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gpr.view.forms.funzione.Controller',
        'gpr.view.forms.funzione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-funzione',
    viewModel: 'v1-funzione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});