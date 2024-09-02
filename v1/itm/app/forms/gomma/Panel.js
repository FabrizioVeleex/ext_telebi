/**
 * Created by luke on 21/02/23.
 */
Ext.define('itm.forms.gomma.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'itm.forms.gomma.Controller',
        'itm.forms.gomma.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-gomma',
    viewModel: 'v1-gomma',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});