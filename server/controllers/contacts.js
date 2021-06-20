let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//create a reference to db schema

let List =require('../models/contacts');

module.exports.displayContacList =(req,res,next)=>{
    List.find((err,contactList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
           // console.log(contactList)

           res.render('contact_list/contact_list',{title:'Contact List',ContactList:contactList}); // 
        }
    });
};

module.exports.displayAddPage=(req,res,next)=>{
    res.render('contact_list/add',{title:'Add Contact'});
}


module.exports.ProcessAddPage=(req,res,next)=>{

    let newList = List({
        "name":req.body.name,
        "number":req.body.name,
        "email":req.body.name
    });
List.create(newList,(err,List)=>
{
if(err)
{
    console.log(err);
    res.end(err);
}
else
{
    res.redirect('/contact-list');
}

}); 
};


module.exports.getEditPage=(req,res,next)=>{
    let id=req.params.id;
    List.findById(id,(err,listToEdit)=>{
     if(err)
     {
         console.log(err);
         res.end(err);
     }
     else
     {
         res.render('../views/contact_list/edit',{
             title:'Edit Book',list:listToEdit
         });
     }
    });
 };

 module.exports.ProcessEditPage=(req,res,next)=>{
    let id=req.params.id;


    let updatedList = List({
        "_id":id,
        "name":req.body.name,
        "number":req.body.number,
        "email":req.body.email
    });
    List.updateOne({_id:id},updatedList,(err)=>
    {
        if(err)
{
    console.log(err);
    res.end(err);
}
else
{
    res.redirect('/contact-list');
}
    }
    
    );
}
 module.exports.deletePage=(req,res,next)=>{
    let id=req.params.id;
    List.remove({_id:id},(err)=>
    {
        if(err)
        {
            console.log(err);
    res.end(err);  
        }
        else{
            
    res.redirect('/contact-list');
        }
    }


    );
    
}