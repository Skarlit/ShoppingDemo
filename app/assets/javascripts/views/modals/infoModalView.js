Anizon.Views.Info = Support.CompositeView.extend({
  id: 'base-modal',
  className: 'modal fade hide mymodal',
  infoTemplate: JST["center/items/info"],

  initialize: function(option){
    this.comments = this.model.comments();
    this.comments.fetch();
    this.itemInfo = this.model.itemInfo();

    var parent = this;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.comments, "add sync", this.render);
    this.listenTo(this.itemInfo, "sync", this.render);
  },

  events: {
    'click #comment-submit-btn' : 'submitComment',
    'click .close' : 'closeModal',
    'click .set_star' : 'setRating'
  },

  submitComment: function(event){
    event.preventDefault();
    this.model.updateClicks(3);
    var newComment = new Anizon.Models.Comment({
      title: this.$el.find("#comment-title").val(),
      body: this.$el.find("#comment-box").val(),
      user_rating: parseInt(this.$el.find("#user_rating").html()),
      item_id: this.model.id
    });

    var parent = this;
    parent.comments.add(newComment);
    newComment.save({
      success: function(resp){
        $.notify("Comment saved successfully");
      },
      error: function(){
        $.notify("failed to save comment : (");
      }
    });
  },

  render: function(){
    this.$el.html(this.infoTemplate({itemInfo: this.itemInfo, item: this.model, comments: this.comments}));
    var parent = this;
    $(".modal-backdrop").on('click', function(){
      parent.remove();
      console.log("destroyed");
      $(".modal-backdrop").remove();
    });

    this.delegateEvents();

    return this;
  },

  setRating: function(){
     console.log("click");
     for(var i = 0; i <= $(event.target).data('id'); i++){
       this.$el.find("#set_rating span:nth-child(" + i + ")").html("&#9733;");
     }

     for(var i = $(event.target).data('id') + 1 ; i <= 10; i++){
       this.$el.find("#set_rating span:nth-child(" + i + ")").html("&#9734;");
     }
     this.$el.find("#user_rating").html($(event.target).data('id'));
  },

  closeModal: function(){
    $(".modal-backdrop").remove();
    this.leave();
  }
})