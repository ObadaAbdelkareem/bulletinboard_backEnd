const multer = require("multer");

const upload = multer({
  dest:'./uploads'
})
module.exports = (app, db) => {
  /**
   * get posts cards list
   */
  app.get( "/posts", (req, res) =>
    db.post.findAll(
      {include: [{
      model: db.comment,
    }]}
    ).then( (result) => res.json(result) )
  );

  /**
   * get specific post card with id
   */
  app.get( "/post/:id", (req, res) =>
    db.post.findById(req.params.id,{include: [{
      model: db.comment,
    }]}).then( (result) => res.json(result))
  );

  /**
   * create new post card
   */
  app.post("/post", (req, res) => 
  // console.log("req.body",req.body)
    db.post.create({
      title: req.body.title,
      content: req.body.content,
      comments: req.body.comments//[{content:"obada test from back1"},{content:"obada test from back2"},{content:"obada test from back3"}]//req.body.comments
    },{
      include: [db.comment],
    }).then( (result) => res.json(result) )
    

  );
  
  /**
   * edit post card
   */
  app.put( "/post/:id", (req, res) =>
    db.post.update({
      title: req.body.title,
      content: req.body.content,
      comments:req.body.comments
    },
    {
      where: {
        id: req.params.id
      }
    },{
      include: [db.comment],
    }).then( (result) => res.json(result) )
  );


  /**
   * upload image card
   */
  app.post( "/upload", upload.single('file'),(req, res) =>
    
  res.json({file:req.file})
  );
  
  /**
   * delete specific post card
   */
  app.delete( "/post/:id", (req, res) =>
    db.post.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}