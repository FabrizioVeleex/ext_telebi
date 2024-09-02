/**
 * Created by luke on 03/03/21.
 */
Ext.define('bolfor.forms.parametri.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'bolfor.forms.parametri.Controller',
        'bolfor.forms.parametri.Model'
    ],
    closable:false,
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-bolfor-parametri',
    viewModel: 'v1-bolfor-parametri',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});