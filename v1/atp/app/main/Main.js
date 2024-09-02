/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.main.Main', {
  extend: 'portal.v1.view.main.Main',
  xtype: 'app-main',
  requires: [
    'atp.main.Controller',
    'atp.main.Model'
  ],
  controller: 'v1-atp-main',
  viewModel: 'v1-atp-main',
  bodyStyle: {
    'background': 'transparent'
  },
  listeners: {
    afterrender: 'onAfterRender',
    runapertura: 'onRunApertura',
    checkDati: 'onCheckDati'
  }
});
