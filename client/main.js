import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

batteryList = new Mongo.Collection('batteryList');

batteryReports = new Mongo.Collection('batteryReports');

testdb = new Mongo.Collection('testdb');

batteryIndex = new EasySearch.Index({
  collection: batteryList,
  fields: ['serialNumber', 'deviceId', 'timestamp', 'batteryChargingStatus', 'batteryPercentage'],
  engine: new EasySearch.Minimongo({
    sort: () => {batteryPercentage: 1}
  })
});

/*
Template.batteryTable.helpers({
  batteryList: function(){
    return batteryList.find({});
  }


});

Template.searchform.events({
  'submit Search'(event, instance) {
    // increment the counter when button is clicked
    return Meteor.http.call("GET", "http://localhost:3000/api/batteryList");
  },
});
*/
Template.searchTable.helpers({
  batteryIndex: () => batteryIndex,
  attributes: () => {
    return {
      placeholder: 'Search here!'
    };
  }
});
