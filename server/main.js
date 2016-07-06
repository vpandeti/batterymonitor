// imports
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// database declarations

batteryList = new Mongo.Collection('batteryList');
batteryReports = new Mongo.Collection('batteryReports');
testdb = new Mongo.Collection('testdb');

// Restivus declarations

var Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

// EasySearch Index definitions

batteryIndex = new EasySearch.Index({
  collection: batteryList,
  fields: ['serialNumber'],
  engine: new EasySearch.Minimongo()
});

// Generates: GET, POST on /api/(collectionName)
//and GET, PUT, DELETE on /api/(collectionName)/:id

Api.addCollection(batteryList);
Api.addCollection(batteryReports);

// Generates: POST on /api/testdb
Api.addCollection(testdb, {
    endpoints: {
      post: {
        authRequired: false
      }
    }
});

// Maps to: /api/(collectionName)/:id

Api.addRoute('testdb/:serialNumber', {authRequired: false}, {
  get: function() {
    return testdb.findOne(this.urlParams.serialNumber);
  },
  post: {
    action: function() {

      testdb.update({serialNumber: this.urlParams.serialNumber}, {$addToSet: {batteryInfo: {$each: this.urlParams.batteryInfo }}})
    }
  }
})


Api.addRoute('batteryreports/:serialNumber', {authRequired: false}, {
  get: function () {
    var reports = batteryReports.find({serialNumber: this.urlParams.serialNumber});
    return reports;
  }
});

Api.addRoute('batterylist/:serialNumber', {authRequired: false}, {
  get: function() {
    //var battery = batteryList.findOne({serialNumber: this.urlParams.serialNumber});
    //return battery;
    return "reached get"
    /*
    console.log(this.urlParams.serialNumber);
    return batteryList.findOne(this.urlParams.serialNumber);
    */
  }
});






Meteor.startup(function() {

  return Meteor.methods({
    cleanDatabase: function() {
      return batteryList.remove({});
    }
  });
  // code to run on server at startup
});
