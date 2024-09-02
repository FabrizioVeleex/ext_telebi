/**
 * Created by fabrizio on 21/07/21.
 */
var shortLorem =
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, ' +
    'sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales ' +
    'non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet ' +
    'tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p>';


Ext.define('home.view.dashboard.Panel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.panel.Panel',
        'home.view.dashboard.Controller',
        'home.view.dashboard.Model'
    ],
    itemId:'dashboard',
    controller: 'dashboard',
    bodyStyle: {
        'background-color': 'transparent'
    },
    viewModel: {
        type: 'dashboard'
    },
    layout: {
        type: 'fit'
    },

    listeners: {
        updateNotifiche:'onUpdateNotifiche',
        afterRender: 'onAfterRender',
        moveWidget:'onMoveWidget'
    }
});
