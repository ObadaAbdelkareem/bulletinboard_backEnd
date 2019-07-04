module.exports = (app, db) => {
  /**
   * get posts cards list
   */
  app.get( "/posts", (req, res) =>
    db.post.findAll().then( (result) => res.json(result) )
  );

  /**
   * get specific post card with id
   */
  app.get( "/post/:id", (req, res) =>
    db.post.findById(req.params.id).then( (result) => res.json(result))
  );

  /**
   * create new post card
   */
  app.post("/post", (req, res) => 
    db.post.create({
      title: req.body.title,
      content: req.body.content,
      comments:req.bod.comments
    },{
      iinclude: [{
        model: db.comment,
      }],
    }).then( (result) => res.json(result) )

  );
  
  /**
   * edit post card
   */
  app.put( "/post/:id", (req, res) =>
    db.post.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
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