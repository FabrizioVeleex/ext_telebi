/**
 * Created by fabrizio on 06/08/21.
 */
Ext.define('skd.view.grids.Grids', {
    extend: 'Ext.grid.Panel',
    requires: [
        'skd.view.grids.CellDragDrop'
    ],
    enableLocking: true,
    lockedGridConfig: {
        header: false,
        collapsible: true
    },
    lockedViewConfig: {
        scroll: 'horizontal'
    },
    scrollable: true,
    enableColumnMove:false,
    viewConfig: {
        preserveScrollOnRefresh: true,
        preserveScrollOnReload : true,
        markDirty: false,
        stripeRows: true,
        enableTextSelection: true,
        listeners:{
            boxready:'onBoxReady',
            beforerefresh:'onBeforeRefresh',
            refresh:'onRefresh',
            cellcontextmenu:'onCellcontextmenu',
            groupcontextmenu: 'onGroupcontextmenu',
            dropDataCell:'onDropDataCell'
        },
        plugins: [
            {
                ptype: 'celldragdropgoma',
                applyEmptyText: false,
                dropBackgroundColor: Ext.themeName === 'neptune' ? '#a4ce6c' : 'green',
                noDropBackgroundColor: Ext.themeName === 'neptune' ? '#d86f5d' : 'red'
            }
        ]
    },
    columnLines: true,
    selModel:  {
        selType:'cellmodel',
        allowDeselect: true,
        mode: 'SINGLE',
        listeners: {
            select: 'onCellModelSelect'
        }
    }
});
