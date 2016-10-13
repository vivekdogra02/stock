'use strict';

/**
 * @ngdoc service
 * @name stockApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockApp.
 */
angular.module('stockApp')
  .service('WatchlistService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    //1. Load watchlists from localStorage
    var loadModel = function(){
    	var model = {
    		watchlists : localStorage['Stock.watchlists'] ? JSON.parse(localStorage['Stock.watchlists']) : [],
    		nextId: localStorage['Stock.nextId'] ? parseInt(localStorage['Stock.nextId']) : 0
    	};

    	return model;
    };

    // [2] : Save watchlists to localStorage
    var saveModel = function(){
     	localstorage['Stock.watchlists'] = JSON.stringify(Model.watchlists);
     	localstorage['Stock.nextId'] = Model.nextId;
    };

    // [3] : Use Lodash to find a watchlist with a given ID
    var findById = function(id){
    	return _.find(Model.watchlists, function(watchlist){
    		return watchlist.id === parseInt(id);
    	});
    };

     // [4] : Return all watchlists or find by given ID
     this.query = function(listId){
     	if(listId){
     		return findById(listId);
     	}
     	else{
     		return Model.watchlists;
     	}
     };

     // [5] Save a new watchlist to watchlists model
     	this.save = function(watchlist){
     		watchlist.id = Model.nextId++;
     		Model.watchlists.push(watchlist);
     		saveModel();
     	};

     	// [6] Remove given watchlist from watchlists model
     	this.remove = function(watchlist){
     		_.remove(Model.watchlists, function(list){
     			return list.id === watchlist.id;
     		});
     		saveModel();
     	};

     	// [7] Initialize Model for this singleton service
     	var Model = loadModel();

  });
