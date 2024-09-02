Ext.define('vms.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'vms.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('vms.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
