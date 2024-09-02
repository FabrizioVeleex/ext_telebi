/**
 * Created by fabrizio on 14/10/2021.
 */
Ext.define('sdc.view.forms.lista.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'sdc.view.forms.lista.Controller',
        'sdc.view.forms.lista.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-lista',
    viewModel: 'v1-lista',
    iconCls :'x-fas fa-at bd-color-orange',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});