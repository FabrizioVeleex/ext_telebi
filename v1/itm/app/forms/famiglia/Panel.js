/**
 * Created by luke on 20/02/23.
 */
Ext.define('itm.forms.famiglia.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.famiglia.Controller',
        'itm.forms.famiglia.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-famiglia',
    viewModel: 'v1-famiglia',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});