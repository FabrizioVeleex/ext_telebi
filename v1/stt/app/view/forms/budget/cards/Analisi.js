/**
 * Created by fabrizio on 22/07/22.
 */
Ext.define("stt.view.forms.budget.cards.Analisi", {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
  ],
  layout: "border",
  items: [

  ],
  listeners: {
    afterrender: 'onAfterRenderAnalisi'
  }
});
