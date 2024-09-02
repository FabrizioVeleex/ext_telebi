/**
 * Created by fabrizio on 11/07/2022.
 */
Ext.define("stt.view.forms.obbiettivo.Panel", {
  extend: 'portal.v1.view.forms.mainCard.Panel',
  requires: [
    "stt.view.forms.obbiettivo.Controller",
    "stt.view.forms.obbiettivo.ViewModel"],
  title: "Obbiettivo delle vendite",
  controller: "v1-stt-obbiettivo",
  viewModel: "v1-stt-obbiettivo",
  title: Locale.t('global.form.caricamento'),
  listeners: {
    close: 'onClose',
    afterRender: 'onAfterRender'
  }

});

