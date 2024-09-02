/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.modulo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.modulo.Controller',
        'amm.view.forms.modulo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-modulo',
    viewModel: 'v1-modulo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});