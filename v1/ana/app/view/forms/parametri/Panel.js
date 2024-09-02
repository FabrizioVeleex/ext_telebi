/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.parametri.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.parametri.Controller',
        'ana.view.forms.parametri.Model'
    ],
    closable:false,
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-parametri',
    viewModel: 'v1-parametri',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});