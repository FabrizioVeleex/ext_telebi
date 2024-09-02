/**
 * Created by luke on 18/02/23.
 */
Ext.define('itm.forms.classe.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.classe.Controller',
        'itm.forms.classe.ViewModel'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-classe',
    viewModel: 'v1-classe',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});