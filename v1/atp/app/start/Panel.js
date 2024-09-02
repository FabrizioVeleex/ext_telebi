/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.start.Panel', {
  extend: 'portal.v1.view.main.start.Panel',

  requires: [
    'atp.start.Controller',
    'atp.start.Model'
  ],
  width: 400,
  controller: 'start',
  viewModel: 'start'
});
