/**
 * Created by luke on 21/02/23.
 */
Ext.define('itm.forms.gruppo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.gruppo.Controller',
        'itm.forms.gruppo.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-gruppo',
    viewModel: 'v1-gruppo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});