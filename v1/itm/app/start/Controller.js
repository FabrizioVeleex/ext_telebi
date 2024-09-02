Ext.define('itm.start.Controller', {
    extend: 'portal.v1.view.main.start.Controller',
    alias: 'controller.start',
    requires: [
        'itm.main.Main'
    ],
    startApplication: function () {
        this.mainPanel = Ext.create('itm.main.Main');

        this.getView().add(this.mainPanel)
        this.getView().setActiveItem(this.mainPanel)
    }
});
