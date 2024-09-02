/**
 * Created by luke on 03/03/21.
 */
Ext.define('vda.view.forms.parametri.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vda.view.forms.parametri.Controller',
        'vda.view.forms.parametri.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    closable:false,
    controller: 'v1-parametri',
    viewModel: 'v1-parametri',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});