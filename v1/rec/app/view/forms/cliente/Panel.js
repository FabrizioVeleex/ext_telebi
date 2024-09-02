/**
 * Created by luke on 14/09/21.
 */
Ext.define('rec.view.forms.cliente.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.cliente.Controller',
        'rec.view.forms.cliente.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-cliente',
    viewModel: 'v1-cliente',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});