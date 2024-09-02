/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.voce.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.voce.Controller',
        'amm.view.forms.voce.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-voce',
    viewModel: 'v1-voce',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});