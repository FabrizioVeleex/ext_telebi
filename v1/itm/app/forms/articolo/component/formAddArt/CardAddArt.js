/**
 * Created by fabrizio on 12/03/2023.
 */
Ext.define('itm.forms.articolo.component.CardAddArt', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.layout.container.Card',
    'Ext.container.Container'
  ],
  bind: {
    title: '{titleAddArt}'
  },
  layout: {
    type: 'card'
  },
  // closable: true,

  items: [

  ],
  listeners: {
    // close: 'onClose',
    afterrender: "onAfterRenderCardAddArt"
  },
});