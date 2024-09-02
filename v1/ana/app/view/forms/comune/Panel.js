/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.comune.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.comune.Controller',
        'ana.view.forms.comune.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-comune',
    viewModel: 'v1-comune',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});