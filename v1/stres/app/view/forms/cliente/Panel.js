/**
 * Created by luke on 12/05/22.
 */
Ext.define('stres.view.forms.cliente.Panel', {
    extend: "portal.v1.view.forms.singleForm.Panel",
    requires: [
        'stres.view.forms.cliente.Controller',
        'stres.view.forms.cliente.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-stres-cliente',
    viewModel: 'v1-stres-cliente',
    listeners: {
        afterRender: 'onAfterRender'
    }
});