/**
 * Created by luke on 10/12/22.
 */
Ext.define('fmc.view.forms.tipologia.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.tipologia.Controller',
        'fmc.view.forms.tipologia.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-tipologia',
    viewModel: 'v1-tipologia',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});