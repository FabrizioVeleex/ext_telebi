/**
 * Created by Fabrizio on 14/10/2021.
 */
Ext.define('sdc.view.forms.dominio.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'sdc.view.forms.dominio.Controller',
        'sdc.view.forms.dominio.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'dominio',
    viewModel: 'dominio',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});