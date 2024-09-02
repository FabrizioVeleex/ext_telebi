/**
 * Created by luke on 30/04/21.
 */
Ext.define('rec.view.forms.rottamazione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.rottamazione.Controller',
        'rec.view.forms.rottamazione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-rottamazione',
    viewModel: 'v1-rottamazione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});