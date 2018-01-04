var ScriptSnake = function() {
  var self = this;
  self.canvas = document.getElementById("snake_canvas");
  self.x = 0;
  self.y = 0;
  self.DIRECTIONS = ["E", "S", "W", "N"];
  self.direction_index = 0;
  self.radius = 20;
  self.canvasWidth = 100;
  self.canvasHeight = 100;
  self.loop_count = 0;
  self.interval_id;
  self.drawing = false;
  self.color = "#ff0000";

  self.init = function() {
    self.canvas.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    self.canvas.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    self.canvasWidth = self.canvas.width;
    self.canvasHeight = self.canvas.height;
    console.log(self.canvas.width);
    console.log(self.canvas.height);
    if( self.canvas.getContext )
    {
        self.start();
    }
  };

  self.getRandomColor = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  self.clear_circle = function(circle) {
    ctx = self.canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius+1, 0, 2*Math.PI);
    ctx.fill();
  };

  self.draw = function(color) {
    console.log("Loop " + self.loop_count + ": (" + self.x + ", " + self.y + ")");
    ctx = self.canvas.getContext("2d");
    ctx.fillStyle = self.color;
    ctx.beginPath();
    //ctx.globalCompositeOperation = "destination-over";
    var circle = {x: self.x, y: self.y, radius: self.radius};
    ctx.arc(self.x, self.y, self.radius, 0, 2*Math.PI);
    ctx.fill();
    //setTimeout(function() {self.clear_circle(circle);}, 2000);
  };

  self.move = function() {
    switch (self.DIRECTIONS[self.direction_index]) {
      case "N":
        self.y--;
        break;
      case "S":
        self.y++;
        break;
      case "E":
        self.x++;
        break;
      case "W":
        self.x--;
        break;
    }
  }
  self.hit_a_wall = function() {
    switch (self.DIRECTIONS[self.direction_index]) {
      case "N":
        return (self.y - (self.radius)) <= 20;
      case "S":
        return (self.canvasHeight - (self.y + (self.radius))) <= 20;
      case "E":
        return (self.canvasWidth - (self.x + (self.radius))) <= 20;
      case "W":
        return (self.x - (self.radius)) <= 20;
    }
  };

  self.try_change_direction = function() {
    var r = Math.random();
    if (r >= 0.99 || self.hit_a_wall()) {
      if (self.direction_index < 3) {
        self.direction_index++;
      }
      else {
        self.direction_index = 0;
      }
    }
  };
  self.try_change_color = function() {
    var r = Math.random();
    if (r >= 0.9) {
      self.color = self.getRandomColor();
    }
  };
  self.check_stop = function() {
    if (self.loop_count > 10000) {
      clearInterval(self.interval_id);
    }
  }

  self.next = function() {
    if (self.drawing) {
      return;
    }
    self.drawing = true;
    self.loop_count++;
    self.try_change_direction();
    self.try_change_color();
    self.move();
    self.draw();
    self.check_stop();
    self.drawing = false;
  };

  self.start = function() {
    self.x = self.canvasWidth / 2;
    self.y = self.canvasHeight / 2;
    self.draw();
    self.interval_id = setInterval(self.next, 1);
  };

};

snake = new ScriptSnake();
snake.init();
