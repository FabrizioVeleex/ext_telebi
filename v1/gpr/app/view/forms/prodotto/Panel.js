/**
 * Created by luke on 26/06/22.
 */
Ext.define('gpr.view.forms.prodotto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'gpr.view.forms.prodotto.Controller',
        'gpr.view.forms.prodotto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-prodotto',
    viewModel: 'v1-prodotto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});