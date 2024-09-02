/**
 * Created by luke on 10/12/22.
 */
Ext.define('fmc.view.forms.mansione.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'fmc.view.forms.mansione.Controller',
        'fmc.view.forms.mansione.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-mansione',
    viewModel: 'v1-mansione',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});