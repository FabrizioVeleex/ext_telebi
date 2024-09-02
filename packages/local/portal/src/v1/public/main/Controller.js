Ext.define('portal.v1.public.main.Controller', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.util.DelayedTask',
    'portal.util.Locale',

  ],

  init: function () {
    this.setConfModRun = 0;
    this.firstOpen = true;
  },

  onAfterRender: function () {

  },

});
