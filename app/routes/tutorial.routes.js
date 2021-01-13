module.exports = app =>{

    const tutorials = require('../controllers/tutorial.controller');
    
    var router = require('express').Router();

    //For creating new tutorial
    router.post('/',tutorials.create);

    //Retrieving all Tutorials
    router.get('/',tutorials.findAll);

    //Retrieving all Published tutorials
    router.get('/published',tutorials.findAllPublished);

    //Retrieving single tutorial
    router.get('/:id',tutorials.findOne);

    //Updating tutorial
    router.put(':/id',tutorials.update);

    //Deleting tutorial
    router.delete('/:id',tutorials.delete);

    //Delete all tutorial
    router.delete('/',tutorials.deleteAll);

    app.use('/api/tutorials',router);

}