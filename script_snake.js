var ScriptSnake = function() {
  var self = this;
  self.canvas = document.getElementById("snake_canvas");
  self.x = 0;
  self.y = 0;
  self.radius = 20;
  self.canvasWidth = 100;
  self.canvasHeight = 100;

  self.init = function() {
    self.canvas.width = document.body.clientWidth; //document.width is obsolete
    self.canvas.height = document.body.clientHeight; //document.height is obsolete
    self.canvasWidth = self.canvas.width;
    self.canvasHeight = self.canvas.height;
    console.log(self.canvas.width);
    console.log(self.canvas.height);
    if( self.canvas.getContext )
    {
        self.start();
    }
  };

  self.start = function() {
    self.x = self.canvasWidth / 2;
    self.y = self.canvasHeight / 2;
    console.log(self.x + ", " + self.y);
    ctx = self.canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0, 2*Math.PI);
    ctx.stroke();
    console.log("drew circle");
  };

};

snake = new ScriptSnake();
snake.init();
