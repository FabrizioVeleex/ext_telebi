/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.paese.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.paese.Controller',
        'ana.view.forms.paese.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-paese',
    viewModel: 'v1-paese',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});