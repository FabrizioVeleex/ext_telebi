/**
 * Created by luke on 15/09/22.
 */
Ext.define('vms.view.forms.prodotto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.prodotto.Controller',
        'vms.view.forms.prodotto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-prodotto',
    viewModel: 'v1-prodotto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});