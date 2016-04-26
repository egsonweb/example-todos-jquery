(function($, hbs) {

  var Utils = {
    store: function(key, val) {
      if(arguments.length > 1) {
        localStorage.setItem(key, JSON.stringify(val));
      } else {
        return JSON.parse(localStorage.getItem(key)) || [];
      }
    }
  };

  var App = {
    init: function() {
      this.todoTemplate = hbs.compile($('#todo-items').html());
      this.todos = Utils.store('todos');
     
      this.events();
      this.render();
    },


    events: function() {
      $('#todo-input').on('keyup', this.create.bind(this));
    },


    create: function(e) {
      console.log(e.which);
      var $input = $(e.target);
      var val = $input.val().trim();
      if(e.which === 13 && val) {
        // Create a todo item
        this.todos.push({
          name: val
        });
        Utils.store('todos', this.todos);

        // Reset the input
        $input.val("")
        $input.focus();

        this.render();
      }
    },

    render: function() {
      console.log(this.todos);
      var todos = this.todoTemplate(this.todos);
      $('#todo-list').html(todos);
    }
  };

  App.init();

})(jQuery, Handlebars);
