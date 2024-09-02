/**
 * Created by luke on 15/09/22.
 */
Ext.define('vms.view.forms.tipologia.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vms.view.forms.tipologia.Controller',
        'vms.view.forms.tipologia.Model'
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