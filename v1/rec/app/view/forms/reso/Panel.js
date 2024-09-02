/**
 * Created by luke on 04/05/21.
 */
Ext.define('rec.view.forms.reso.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.reso.Controller',
        'rec.view.forms.reso.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-reso',
    viewModel: 'v1-reso',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});