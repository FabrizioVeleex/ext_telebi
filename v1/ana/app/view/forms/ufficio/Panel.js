/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.ufficio.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.ufficio.Controller',
        'ana.view.forms.ufficio.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-ufficio',
    viewModel: 'v1-ufficio',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});