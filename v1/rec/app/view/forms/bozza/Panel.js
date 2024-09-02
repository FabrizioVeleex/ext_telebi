/**
 * Created by luke on 05/05/21.
 */
Ext.define('rec.view.forms.bozza.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.bozza.Controller',
        'rec.view.forms.bozza.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-bozza',
    viewModel: 'v1-bozza',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});