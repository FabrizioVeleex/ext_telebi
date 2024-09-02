/**
 * Created by luke on 13/05/24.
 */
Ext.define('webord.view.forms.ordine.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'webord.view.forms.ordine.Controller',
        'webord.view.forms.ordine.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-ordine',
    viewModel: 'v1-ordine',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});