/**
 * Created by luke on 15/11/23.
 */
Ext.define('bolfor.forms.bolla.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'bolfor.forms.bolla.Controller',
        'bolfor.forms.bolla.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-bolfor-bolla',
    viewModel: 'v1-bolfor-bolla',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});