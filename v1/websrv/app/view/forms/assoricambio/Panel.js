/**
 * Created by luke on 03/02/21.
 */
Ext.define('websrv.view.forms.assoricambio.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'websrv.view.forms.assoricambio.Controller',
        'websrv.view.forms.assoricambio.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    controller: 'v1-assoricambio',
    viewModel: 'v1-assoricambio',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});