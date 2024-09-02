/**
 * Created by fabrizio on 12/03/18.
 */
Ext.define('skd.view.forms.top.grids.WinNoteOpeData.Win', {
  extend: 'Ext.window.Window',
  requires: [
    'skd.view.forms.top.grids.WinNoteOpeData.Controller',
    'skd.view.forms.top.grids.WinNoteOpeData.Model'
  ],
  width: 800,
  height: 440,
  userCls: 'goma-window-materiali',
  modal: true,
  header: false,
  border: false,
  shadow: true,
  viewModel: 'grid-noteOpeData',
  controller: 'grid-noteOpeData',
  bodyStyle: 'background-color: transparent !important;',
  layout: {
    type: 'border'
  },
  items: [

  ]
});