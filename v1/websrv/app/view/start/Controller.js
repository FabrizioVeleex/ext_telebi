Ext.define('websrv.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',

    requires: [
        'websrv.view.main.Main'
    ],

    startApplication: function () {
        this.mainPanel = Ext.create('websrv.view.main.Main');
        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});