import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

batteryList = new Mongo.Collection('batteryList');

batteryReports = new Mongo.Collection('batteryReports');

testdb = new Mongo.Collection('testdb');

batteryIndex = new EasySearch.Index({
  collection: batteryList,
  fields: ['serialNumber'],
  engine: new EasySearch.Minimongo()
});

var Api = new Restivus({
  useDefautAuth: true,
  prettyJson: true
});



Api.addCollection(batteryList);

Api.addCollection(batteryReports);

Api.addCollection(testdb);


Api.addRoute('batteryreports/:serialNumber', {authRequired: false}, {
  get: function () {
    var reports = batteryReports.find({"serialNumber": this.urlParams.serialNumber});
    return reports;
  }
});

Api.addRoute('batterylist/:serialNumber', {authRequired: false}, {
  get: function() {
    var battery = batteryList.findOne({"serialNumber": this.urlParams.serialNumber});
    return battery;
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
