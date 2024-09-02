/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.onReady(function () {
  Backend.start = 0;
  this.token = null;
  let token = document.location.href.split('?')[1];
  let startApp = function () {
    Ext.application({
      name: 'spl',
      extend: 'spl.Application',
      requires: [
        'spl.start.Panel',
        'portal.v1.global.Vars',
        'portal.util.Locale'
      ],
      mainView: 'spl.start.Panel'
    });

  };
  if (token !== undefined) {
    let qs = Ext.Object.fromQueryString(token);
    if (qs['token']) {
      this.token = qs['token'];
    }
  }
  Backend.start = 1;
  startApp();

});
