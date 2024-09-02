/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.stampante.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.stampante.Controller',
        'amm.view.forms.stampante.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stampante',
    viewModel: 'v1-stampante',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});