/**
 * Created by luke on 08/03/22.
 */
Ext.define('vda.view.forms.progetto.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vda.view.forms.progetto.Controller',
        'vda.view.forms.progetto.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-progetto',
    viewModel: 'v1-progetto',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});