/**
 * Created by fabrizio on 17/03/2023.
 */
Ext.define('itm.forms.articolo.component.gridDocs.PanelPreview', {
  extend: 'Ext.panel.Panel',
  bodyStyle: "background-color:black",
  requires: [
  ],
  layout: 'fit',
  listeners: {
    afterrender: "onAfterRenderPreview"
  }
});