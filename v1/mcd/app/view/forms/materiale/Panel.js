/**
 * Created by luke on 03/03/21.
 */
Ext.define('mcd.view.forms.materiale.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'mcd.view.forms.materiale.Controller',
        'mcd.view.forms.materiale.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-materiale',
    viewModel: 'v1-materiale',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});