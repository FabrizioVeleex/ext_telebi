/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.forms.cdl.Panel', {
  extend: 'prd.global.cdl.Panel',
  requires: [
    'prd.forms.cdl.Controller',
    'prd.forms.cdl.ViewModel'
  ],
  controller: 'prd-controller-cdl',
  viewModel: 'prd-model-cdl',
  iconCls: 'y-cdl-icon',
  listeners: {
    activePanel: "onActivePanel",
    statusChange: "onStatusChange",
  }
});   