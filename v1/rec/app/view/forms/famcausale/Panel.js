/**
 * Created by luke on 30/04/21.
 */
Ext.define('rec.view.forms.famcausale.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'rec.view.forms.famcausale.Controller',
        'rec.view.forms.famcausale.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-famcausale',
    viewModel: 'v1-famcausale',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});