/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.funzione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.funzione.Controller',
        'amm.view.forms.funzione.Model'
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