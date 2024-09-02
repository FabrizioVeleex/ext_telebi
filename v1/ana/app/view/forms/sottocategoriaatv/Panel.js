/**
 * Created by luke on 10/02/21.
 */
Ext.define('ana.view.forms.sottocategoriaatv.Panel', {
    extend: 'portal.v1.view.forms.mainCard.Panel',
    requires: [
        'ana.view.forms.sottocategoriaatv.Controller',
        'ana.view.forms.sottocategoriaatv.Model'
    ],
    title: Locale.t('global.form.caricamento'),
    bodyPadding: 15,
    controller: 'v1-sottocategoriaatv',
    viewModel: 'v1-sottocategoriaatv',
    listeners: {
        close: 'onClose',
        afterRender: 'onAfterRender'
    }
});