/**
 * Created by luke on 30/04/21.
 */
Ext.define('rec.view.forms.causale.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.causale.Controller',
        'rec.view.forms.causale.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-causale',
    viewModel: 'v1-causale',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});