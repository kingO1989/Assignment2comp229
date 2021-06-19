let mongoose=require('mongoose');

//create schema to use
let contactsModel = mongoose.Schema(
{
name:String,
number:String,
email:String,
},
{
    collection:"contacts"
}
);

module.exports=mongoose.model('contacts',contactsModel);//connects the schema to the contacts collection
