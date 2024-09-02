Ext.define('ntf.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'ntf.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('ntf.view.main.Main');
        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
