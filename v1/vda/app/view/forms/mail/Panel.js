/**
 * Created by luke on 08/03/22.
 */
Ext.define('vda.view.forms.mail.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'vda.view.forms.mail.Controller',
        'vda.view.forms.mail.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-mail',
    viewModel: 'v1-mail',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});