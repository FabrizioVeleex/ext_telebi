/**
 * Created by luke on 03/03/21.
 */
Ext.define('mcd.view.forms.nominativo.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'mcd.view.forms.nominativo.Controller',
        'mcd.view.forms.nominativo.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-nominativo',
    viewModel: 'v1-nominativo',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});