(function () {
     'use strict';
    var Nedb = require('nedb');
    var customers = new Nedb({ filename: './db/customers.db', autoload: true });
    
    angular.module('app')
        .service('customerService', ['$q', CustomerService]);
    
    function CustomerService($q) {
        return {
            getCustomers: getCustomers,
            getById: getCustomerById,
            getByName: getCustomerByName,
            create: createCustomer,
            destroy: deleteCustomer,
            update: updateCustomer
        };
        
        function getCustomers() {
            var deferred = $q.defer();
            customers.find({}, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });      
            return deferred.promise;      
        }
        
        function getCustomerById(id) {
            var deferred = $q.defer();
            customers.find({'_id': id }, function (err, result) {
                if (err) deferred.reject(err);
                deferred.resolve(result);
            });       
            return deferred.promise;
        }
        
        function getCustomerByName(name) {
            var deferred = $q.defer();
            customers.find({'name': name }, function (err, result) {
                if (err) deferred.reject(err);
                deferred.resolve(result);
            });  
            return deferred.promise;
        }
        
        function createCustomer(customer) {          
            var deferred = $q.defer();
            customers.insert(customer, function (err, result) {
                console.log(err)
                if (err) deferred.reject(err);
                deferred.resolve(result);
            });
            return deferred.promise;
        }
        
        function deleteCustomer(id) {            
            var deferred = $q.defer();
            customers.remove({'_id': id}, function (err, res) {
                if (err) deferred.reject(err);
                console.log(res);
                deferred.resolve(res.affectedRows);
            });                
            return deferred.promise;
        }
        
        function updateCustomer(customer) {
            var deferred = $q.defer();
            customers.update({_id: customer._id}, customer, {}, function (err, numReplaced) {
                if (err) deferred.reject(err);
                deferred.resolve(numReplaced);
            });
            return deferred.promise;
        }
    }
})();