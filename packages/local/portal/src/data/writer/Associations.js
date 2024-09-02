/**
 * @author Marco Broglia
 * @docauthor Marco Broglia
 *
 * This is a json writer for handling save operation on models with associations.
 *
 * You can use it simply specifing type: 'associations'.
 *
 * @example
 *
 * proxy: {
 *      reader: {
 *          type: 'json',
 *          root: 'data,
 *      },
 *      writer: {
 *          type: 'associations'
 *      }
 * }
 */
Ext.define('portal.data.writer.Associations', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.associations',

    /**
     * Formats the data for each record before sending it to the server.
     * If record has associations send also these models to server as property of main model.
     * @param {Ext.data.Model} record The record that we are writing to the server.
     * @param {Ext.data.Operation} [operation] An operation object.
     * @return {Object} An object literal of name/value keys to be written to the server.
     * By default this method returns the data property on the record.
     */
    getRecordData: function (record, operation) {
        var association;

        //Get standard data
        var data = this.callParent(arguments);


        if (this.writeAllFields) {
            //Get association data
            var associated = record.getAssociatedData();
            //Return the merged data
            data = Ext.Object.merge(data, associated);
        }
        else {
            //Iterate over all the hasMany associations
            Ext.Object.each(record.associations, function (key, association) {
                childStore = record[association.storeName];
                //Iterate over all the children in the current association
                if (childStore) {
                    childStore.each(function (childRecord) {

                        if (!data[key]) {
                            data[key] = [];
                        }

                        //Recursively get the record data for children (depth first)
                        var childData = this.getRecordData.call(this, childRecord);

                        if (childData) {
                            data[key].push(childData);
                        }
                    }, this);
                }
                else if (data[key] && data[key].isModel) {
                    //Handle hasOne relationship
                    data[key] = this.getRecordData.call(this, data[key]);

                }
            }, this);
        }

        return data;
    }
});