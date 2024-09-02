Ext.define('stver.view.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'stver.view.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('stver.view.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
