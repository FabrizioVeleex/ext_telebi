Ext.define('ama.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'ama.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('ama.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
