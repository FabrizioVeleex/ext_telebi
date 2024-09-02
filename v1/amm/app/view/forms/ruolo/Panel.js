/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.ruolo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.ruolo.Controller',
        'amm.view.forms.ruolo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-ruolo',
    viewModel: 'v1-ruolo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});