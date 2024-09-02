Ext.define('sting.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'sting.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('sting.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
