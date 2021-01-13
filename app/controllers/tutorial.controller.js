const db = require('../model');
const Tutorial = db.tutorials;

exports.create = (req,res)=>{
    if(!req.body.title){
        res.status(400).send({message:'Content cant be empty'});
        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    tutorial
        .save(tutorial)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || 'saving error occured creating new tutorial'
            });
        });
};

exports.findAll = (req,res)=>{
    const title = req.query.title;
    var condition = title ? {title: {$regex:new RegExp(title),options: "i"}} : {};

    Tutorial.find(condition)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || 'retrieving error occured getting all tutorial'
            });
        });
};

exports.findOne = (req,res)=>{
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Error tutorial not found by id = "+id});
            }
            else res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message || 'retrieving error occured getting tutorial with id = '+id
            });
        });
};

exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({
            message:"Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:'Tutorial cant be update cause tutorial may not found'
                });
            }
            else res.send({messsage:"Tutoriall was updated successfully"})
        })
        .catch(err=>{
            res.status(500).send({
                message:'Error when updating tutorial'
            });
        });
};

exports.delete = (req,res)=>{
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:'Tutorial cant be delete cause not found'});
            }
            else{
                res.send({message:"Tutorial success deleted"})
            }
        })
        .catch(err=>{
            res.status(500).send({message:'Cant delete cause err'})
        });
};

exports.deleteAll = (req,res)=>{
    Tutorial.deleteMany({})
        .then(data=>{
            res.send({message:"Success delete all"})
        })
        .catch(err=>{
            res.status(500).send({message:err.message})
        });
};

exports.findAllPublished = (req,res)=>{
    Tutorial.find({published:true})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({message:err.message})
        });
};