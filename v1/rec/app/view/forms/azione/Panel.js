/**
 * Created by luke on 19/05/21.
 */
Ext.define('rec.view.forms.azione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.azione.Controller',
        'rec.view.forms.azione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-azione',
    viewModel: 'v1-azione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
})