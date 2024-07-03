const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema(
{
    eventid:{type:String,unique:true},
    name:String,
    tag:String,
    cancelled:Boolean,
    urlAlias:{type:String,unique:true},
    organizer:String,
    hosts:[String],
    email:String,
    contact:String,
    openedDate:Date,
    eventDate:Date,
    deadLine:Date,
    launchDate:Date,
    eventStartDate:Date,
    eventEndDate:Date,
    eventStartTime:String,
    eventEndTime:String,
    mode:String,
    onlineVenue:String,
    offlineVenue:String,
    desc:String,
    guests:[{name:String,social:String,email:String,status:String}],
    // "pending","accepted","declined","blocked","cancelled"
    metadata:[{type:Map,of:String }]

}
    
)
module.exports = mongoose.model("Event", eventSchema);
