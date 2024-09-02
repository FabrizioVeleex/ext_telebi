/**
 * Created by fabrizio on 20/12/23.
 */
Ext.define('portal.v1.view.filtri.Fitro', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.layout.container.VBox',
  ],
  collapsible: false,
  layout: {
    type: 'hbox'
  },
  scrollable: 'x',
  style: 'border:none',
  userCls: 'y-filtri-panel',
  bind: {
    hidden: '{filtri.params.pressed}'
  },
  defaults: {

  },
  frame: true,
  items: []
});
