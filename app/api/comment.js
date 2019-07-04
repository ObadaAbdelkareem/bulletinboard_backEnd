module.exports = (app, db) => {
  app.get( "/comment/:id", (req, res) =>
    db.comment.findById(req.params.id).then( (result) => res.json(result))
  );
}