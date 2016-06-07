import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

batteryList = new Mongo.Collection('batteryList');

batteryReports = new Mongo.Collection('batteryReports');

testdb = new Mongo.Collection('testdb');

var Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

Api.addCollection(batteryList);

Api.addCollection(batteryReports);

Api.addCollection(testdb);


Api.addRoute('/batteryreports/:batteryId', {authRequired: false}, {
  get: function () {
    //return testdb.findOne({batteryId: this.urlParams.batteryId});
    console.log(this.urlParams.batteryId);
    return this.urlParams.batteryId;
  }

});





Meteor.startup(() => {
  // code to run on server at startup
});
