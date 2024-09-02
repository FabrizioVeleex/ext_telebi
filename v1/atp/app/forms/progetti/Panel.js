/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.forms.progetti.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'atp.forms.progetti.Controller',
        'atp.forms.progetti.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-atp-form-progetti',
    viewModel: 'v1-atp-form-progetti',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});