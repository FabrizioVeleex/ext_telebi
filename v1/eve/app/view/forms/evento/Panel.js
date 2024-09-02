/**
 * Created by luke on 16/03/23.
 */
Ext.define('eve.view.forms.evento.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'eve.view.forms.evento.Controller',
        'eve.view.forms.evento.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-evento',
    viewModel: 'v1-evento',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});