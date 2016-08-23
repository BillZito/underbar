(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  //bill's comments: ternary operator to check if n is undefined--if is, just 
  //returns first value. if isn't, returns up to n element 
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(Math.max(array.length-n, 0), array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //if array, use for i less than collection's length to run func on each
    if (Array.isArray(collection)){
      for (var i = 0; i < collection.length; i++){
        //can pass i and collection through to let functions access them
        iterator(collection[i], i, collection);
      }
    } else {
      //else, it's an object, so use for key in object to run func on each val
      for (var key in collection){
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      //result ===-1 checks to make sure that a target hasn't been found yet
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  //one way to do this: use each to call it on each item in collection and push
  //the ones that pass to the new array before returning it
  _.filter = function(collection, test) {
    var ans = [];
    _.each(collection, function(item){
      if (test(item)){
        ans.push(item);
      }
    });
    return ans;
  };

  // Return all elements of an array that don't pass a truth test.
  //this is the opposite of filter. one idea: filter based on 
  //not passing the test
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item){
      return test(item) === false;
    });
  };


  // Produce a duplicate-free version of the array.
  //use each to check if in array and return if not
  _.uniq = function(array) {
    var ans = [];
    //
    _.each(array, function(item){
      if (_.indexOf(ans, item) == -1){
        ans.push(item);
      }
    });
    return ans;
  };


  // Return the results of applying an iterator to each element.
  //initialize arr, each to add to it, return arr
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var ans = [];
    _.each(collection, function(item){
      //push values to new array
      ans.push(iterator(item));
    });
    return ans;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  //takes accumulator, and returns iterator of each item, before finally returning last value
  //if no accumulator, takes first value
  //can also do this recursively
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator == undefined){
      //if acculumator undefined, set it to the first val and make copy of array w/out first val
      var accumulator = collection[0];
      
      //does this slice change the array itself? 
      collection = collection.slice(1, collection.length);
    }

    //for each item in collection, accumulator = new value.
    _.each(collection, function(item){
      accumulator = iterator(accumulator, item);
    });

    //return summed val
    return accumulator; 
  };

  //reduce recursive--only works for strings, so breaks contains method below if used
  _.reduceRec = function(collection, iterator, accumulator){
    
    //if accumulator undefined, set first val to accumulator and make copy of 
    //collection without first val
    if (accumulator == undefined){
      var accumulator = collection[0];
      collection = collection.slice(1);
    }

    //base case: array is empty, return accumulator
    if (collection.length === 0){
      return accumulator;
    } else{
      //t is computed by iterator. If undefined, set to accumulator, otherwise do nothing
      var t = iterator(accumulator, collection[0]);
      t != undefined? accumulator = t: null;

      //make copy of collection without first value and run reduceRec again. 
      collection = collection.slice(1);
      accumulator = _.reduceRec(collection, iterator, accumulator);
      //return at end to make sure right value has been passed along
      return accumulator;
    }
  }

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      //runs a reduce function starting with false, and returning if the item ===target or if 
      //ever returned true, keep returning true
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(allTrue, item){
      //if one value has returned false, return false
      if (!allTrue){
        return false;
      }

      //if no iterator, test each item in collection
      if (iterator === undefined){
        return _.identity(item);
      }

      //return truthiness of each item
      return Boolean(iterator(item));

      //default true
    }, true);
  };

//some should determine if any elements pass the 
//test, and provide default test if none provided
_.some = function(collection, iterator){
  //if no iterator, set it to identity
  iterator || (iterator = _.identity);

  //use every to iterate over collection
  //use anonymous function to take in the element 
  return !(_.every(collection, function(item){
    return !(iterator(item));
  }));
};

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
//for every property in additional arg objects, set argument[0]'s values to
//the ones in the following objects
  _.extend = function(obj){
    
    //use array.prototype to slice args, and iterate through all excep tifrst
    _.each(Array.prototype.slice.call(arguments, 1), function(arg){
      //for each key in each argument, set object's key val to that arg's key val
      for (var key in arg){
        obj[key] = arg[key];
      }
    });
    //return obj;
    return obj;
  };


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  //for each argument in obj, if there isn't already a value, write it.
  _.defaults = function(obj) {
    //set val of arglenth to iteratre through others
    var argLength = arguments.length;

    //set ans to first arg obj
    var ans = arguments[0];

    //for each arg after first, iterate through all keys
    for (var i = 1; i < argLength; i++){
      //for each key in arg[i], check if already in ans, and if not, set
      //to new val
      for (var key in arguments[i]){
        //first check if key not in ans;
        if (!(key in ans)){
          //set to new val if not in
          ans[key] = arguments[i][key];
        }
      }
    }
    //return ans;
    return ans;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        //if not already called, result is the original function .apply (this, arguments)
        //to give it all the original information
        result = func.apply(this, arguments);
        //set already called to true so that it will not run again in future
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };
  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

    //takes a function and runs it if different args
  _.memoize = function(func) {
    
    //create empty object
    var ans = {};

    //return function
    return function(){
      var arg = JSON.stringify(arguments);

      if (!ans[arg]){
        ans[arg] = func.apply(this, arguments);
      }
      return ans[arg];
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //create args array of all arguments after wait
    var args = []; 
    for (var i = 2; i < arguments.length; i++){
         args.push(arguments[i]);
    }
    
    //initialize result var to be new function
    //var result;
    setTimeout(function(){
      //apply this and the args after wait to the function and return it
      return func.apply(this, args);
      //set wait time
    }, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
_.shuffle = function(array) {
  var copy = array.slice();
  return copy.sort(function() {
    //sort by random number
    return Math.floor((Math.random()*100)-50);
  });
};


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args){
    var ans = [];
    if (typeof functionOrKey === "string"){
      for (var i = 0; i < collection.length; i++){
        ans.push(collection[i][functionOrKey]());
      }
    } else {
      for (var i =0; i< collection.length; i++){
         ans.push(functionOrKey.apply(collection[i], args));
      }
    }
    return ans;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var result = collection.slice();

      //check min iteratively to check where it is and add to front
      //do this until reach end of all items
      //this goes through all items in collection
      for (var j = 0; j < result.length; j++){
        var minIndex = j;
        var min = Infinity;
        //this for loop goes through all values in collection, and sets min to right val
        for (var i = 0; i < result.length-j; i++){
          if (typeof iterator === "string"){
          //if it is smaller than the min, set to min
            if (result[i][iterator] < min){
              min = result[i][iterator];
              minIndex = i;
            }
          } else {
            //if undefined, set next to 99999, otherwise set it to iterator(result[i])
            var next = iterator(result[i])===undefined? 999999: iterator(result[i]);
            
            if (next < min){
              min = next;
              minIndex = i;
            }
          }
        }
        //push in the new min
        result.push(result[minIndex]);
        //take out old value from result
        result.splice(minIndex, 1);
      }
      return result;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
   _.zip = function() {
    var result = [];

     //determine the max length of longest array
     var max = arguments[0].length;
     for (var a = 1; a < arguments.length; a++){
       if (arguments[a].length > max){
         max = arguments[a].length;
       }
     }
    
    for (var b = 0; b < max; b++){
      result.push([]);
    }
    //the index of the argument is the same as the index within the
    //individual arrays

    //iterate through all arguments
     for (var i = 0; i < arguments.length; i++){
       var argIndex = i;

       //iterate through all items in each argument
       for (var j = 0; j < max; j++){
         var elemIndex = j;
         result[argIndex].push(arguments[elemIndex][argIndex]); 
        }
      }

     return result;
    };

/*
#2
 _.zip = function() {
  var arr = []
  var maxLen = arguments[0].length;
  for (var i = 1; i < arguments.length; i++) {
    if(arguments[i].length > maxLen) {
        maxLen = arguments[i].length
    }
  }
    for(var i =0; i < maxLen; i++) {
      var newArr = []   
      for(var j =0; j < maxLen;j++) {
        newArr.push(arguments[j][i])
      }
      arr.push(newArr);
    }
    return arr;
}
*/
  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if(result === undefined) {
    var result = []
    }

    if (nestedArray.length === 0) {
      return result;
    } else if (!Array.isArray(nestedArray[0])) {
      result.push(nestedArray[0])
      nestedArray.shift();
    } else {
    _.flatten(nestedArray[0],result)
      nestedArray.shift();
    }

    return _.flatten(nestedArray,result);
  
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    
    var result = [];  
    var args = arguments[0];  
    for(var i = 1; i < arguments.length; i++) {
      for(var j = 0; j < arguments.length; j++) {    
        if(_.contains(arguments[i], args[j]) === true) {
          result.push(args[j]);
          }
        }
          
      }
    
    return result;
    
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    
    //var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);
    //[3, 4]
    var start = arguments[0];
    var result = [];
    //iterate through args
    for (var i = 1; i < arguments.length; i++){
      for (var j = 0; j < start.length ; j++){
        if (_.contains(arguments[i], start[j]) === true){
          start[j] = false;
        }

      }
    }
  
  for (var a = 0; a < start.length; a++){
    if (typeof start[a] !== 'boolean'){
    result.push(start[a]);
    }
  }

  return result;


  };

/*
  _.difference = function(array) {
    var start = arguments[0];
    var result = [];
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    if !(_.some(args, function(item) {
      return _.contains(args, item);
    }) {
      result.push()
    }

  };
*/

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
