/**
 * Created by luke on 29/02/24.
 */
Ext.define('cde.view.forms.webprodotto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'cde.view.forms.webprodotto.Controller',
        'cde.view.forms.webprodotto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-form-webprodotto',
    viewModel: 'v1-form-webprodotto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});