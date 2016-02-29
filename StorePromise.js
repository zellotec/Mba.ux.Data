Ext.define('Mba.ux.Data.StorePromise', {
    extend: 'Ext.data.Store',
    requires: ['Ext.ux.Deferred'],

    /** Constroi a promise e faz o wrap do callback do usuario
     *  @return {Object} Contexto de execucao
     *  @return {Object} return.dfd: A instancia do deferred com a promessa
     *  @return {Object} return.options: Objeto options alterado para ser passado para callParent
     *  @return {Object} return.scope: Escopo de chamada, o mesmo scope passado para a funcao
     **/
    prepareDeferred: function(options, scope) {
        var dfd = Ext.create('Ext.ux.Deferred'),
            userCallback = Ext.emptyFn;

        if (Ext.isFunction(options)) {
            userCallback = options;
        } else if (Ext.isObject(options)) {
            userCallback = options.callback;
        }

        options = { scope: scope };

        options.callback = function() {
            userCallback.apply(dfd, arguments);
            dfd.resolve.apply(dfd, arguments);
        };

        return {
            dfd: dfd,
            options: options,
            scope: scope
        };
    },

    /** Executa uma funcao de load deffered. Os parametros sao os mesmos
     *  de uma store normal
     *  @returns {Object} Uma promessa de load */
    load: function(options, scope) {
        var r = this.prepareDeferred(options, scope);
        this.callParent([r.options, r.scope]);
        return r.dfd.promise();
    },

    /** Executa uma funcao de loadPage deffered. Os parametros sao os mesmos
     *  de uma store normal
     *  @returns {Object} Uma promessa de loadPage */
    loadPage: function(page, options, scope) {
        var r = this.prepareDeferred(options, scope);
        this.callParent([page, r.options, r.scope]);
        return r.dfd.promise();
    },

    /** Executa uma funcao de nextPage deffered. Os parametros sao os mesmos
     *  de uma store normal
     *  @returns {Object} Uma promessa de nextPage */
    nextPage: function(options) {
        var r = this.prepareDeferred(options);
        this.callParent([r.options]);
        return r.dfd.promise();
    },

    /** Executa uma funcao de previousPage deffered. Os parametros sao os mesmos
     *  de uma store normal
     *  @returns {Object} Uma promessa de previousPage */
    previousPage: function(options) {
        var r = this.prepareDeferred(options);
        this.callParent([r.options]);
        return r.dfd.promise();
    }
});
