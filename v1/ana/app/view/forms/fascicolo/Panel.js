/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.fascicolo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.fascicolo.Controller',
        'ana.view.forms.fascicolo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-fascicolo',
    viewModel: 'v1-fascicolo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});