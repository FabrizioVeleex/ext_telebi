/**
 * Created by luke on 13/07/21.
 */
Ext.define('amm.view.forms.modulowidget.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'amm.view.forms.modulowidget.Controller',
        'amm.view.forms.modulowidget.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-modulowidget',
    viewModel: 'v1-modulowidget',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});