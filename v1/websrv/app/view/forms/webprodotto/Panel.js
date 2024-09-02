/**
 * Created by luke on 03/02/21.
 */
Ext.define('websrv.view.forms.webprodotto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'websrv.view.forms.webprodotto.Controller',
        'websrv.view.forms.webprodotto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-webprodotto',
    viewModel: 'v1-webprodotto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});