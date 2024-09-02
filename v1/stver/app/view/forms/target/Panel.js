/**
 * Created by luke on 14/09/23.
 */
Ext.define('stver.view.forms.target.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'stver.view.forms.target.Controller',
        'stver.view.forms.target.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-target',
    viewModel: 'v1-target',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});