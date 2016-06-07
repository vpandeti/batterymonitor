import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

batteryList = new Mongo.Collection('batteryList');

batteryReports = new Mongo.Collection('batteryReports');

testdb = new Mongo.Collection('testdb');

Template.batteryTable.helpers({
  batteryList: function(){
    return batteryList.find({});
  }
});
