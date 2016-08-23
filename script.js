$(document).ready(function(){

  var $canvas = $('#canvas');
  var canvas = $canvas[0];
  var context = canvas.getContext("2d");


	var ball = {
		x: 10,
		y: 600,
		height: 25,
		width: 25,
		xVelocity: 5,
		yVelocity: 5,
		src: 'http://www.fancyicons.com/free-icons/218/mixed/png/48/blue_ball_48.png'
	};

	var board = {
		x: 200,
		y: canvas.height - 40,
		height: 30,
		width: 150,
		xVelocity: 20,
		yVelocity: 20,
		src: 'images/1211776983.png'
	};

  function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  function createSquare() {
    return  {
      x: 0,
      y: 0,
      height: 30,
      width: 80,
      color: getRandomColor()
    };
  }

  function createSquares(n){
    var squares = [];
    for(var i = 0; i < n; i++){
        squares.push(createSquare());
    }
    return squares;
  }

	function initSquares(squares){
		var left = 10;
		var top = 10;
		var k = 0;
    for(var i = 0; i < squares.length; i++){
				if (k > 5) {
					top += 40;
					left = 10;
					k = 0;
				}
				squares[i].x = left;
        squares[i].y = top;
				left += 90;
				k++;
    }
		return squares;
  }


  var squares = initSquares(createSquares(30));

  var background = new Image();
  background.src = "http://www.magic4walls.com/wp-content/uploads/2014/03/texture-green-paper-pattern-scratch-background-photo-hd-wallpaper-694x417.jpg";
  //background.src = "background.jpg";

  var ballImg = new Image();
	ballImg.src = ball.src;

	var boardImg = new Image();
	boardImg.src = board.src;

  var squareImg = new Image();
  squareImg.src = 'http://www.clker.com/cliparts/M/a/W/k/I/y/yellow-rectangle-button-hi.png'

  function drawSquares(){
    for (var i = 0; i < squares.length; i++) {
      var square = squares[i];
      context.fillStyle = square.color;
      context.fillRect(square.x, square.y, square.width, square.height);

      //context.drawImage(squareImg, square.x, square.y, square.width, square.height);

    }
  }




  function drawBoard() {
    if(board.x + board.width >= canvas.width){
      board.x -= 30;
    }else if (board.x <= 0) {
      board.x += 30;
    }
    context.drawImage(boardImg, board.x, board.y, board.width, board.height);
  }


  function ballMeetsSquare(ball, square) {
    if(ball.x + ball.width >= square.x && ball.x <= square.x + square.width
      && ball.y + ball.height >= square.y && ball.y <= square.y + square.height){
        return true;

    }

    // if((ball.x + ball.width >= square.x && ball.x + ball.width <= square.x + square.width || ball.x >= square.x && ball.x <= square.x + square.width)
    //   && ball.y + ball.height >= square.y && ball.y <= square.y + square.height){
    // }
    return false;
  }

  function changeVelWhenMeet(obj1, obj2) {
    if(obj1.x <= obj2.x + obj2.width && obj1.x + obj1.width >= obj2.x && (obj1.y == obj2.y + obj2.height || obj1.y + obj1.height == obj2.y)){
        obj1.yVelocity *= -1;
        return true;
    }
    if(obj1.y <= obj2.y + obj2.height && obj1.y + obj1.height >= obj2.y && (obj1.x + obj1.width == obj2.x || obj1.x == obj2.x + obj2.width)){
        obj1.xVelocity *= -1;
        return true;
    }
    return false;
  }


  function draw(el) {
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

			drawSquares();

		  drawBoard();

      context.beginPath();

      var height = el.height;
			el.x -= el.xVelocity;
      el.y -= el.yVelocity;

      if(el.x <= 0 || el.x + el.width >= canvas.width){
          el.xVelocity *= -1;
      }
      if(el.y <= 0){
          el.yVelocity *= -1;
      }
			if(el.y + el.height >= canvas.height){
          alert('game over');
					t = false;
					return;
      }


      changeVelWhenMeet(ball, board);

      // +________+________
			if(el.x >= board.x
        && el.x <= board.x + board.width/2
        && el.y + el.height >= board.y){
					if (el.xVelocity < 0) {
						el.xVelocity *= -1;
					}
					el.yVelocity *= -1;
      }

      // ________+________+
			if(el.x >= board.x + board.width/2
        && el.x <= board.x + board.width
        && el.y + el.height >= board.y){
					if (el.xVelocity > 0) {
						el.xVelocity *= -1;
					}
					el.yVelocity *= -1;
      }


			for (var i = 0; i < squares.length; i++) {
				var square = squares[i];
				if(changeVelWhenMeet(ball, square)){
          squares.splice(i, 1);
        }
			};


			if(!squares.length){
				alert('You won');
			}

      context.drawImage(ballImg, el.x, el.y, el.width, el.height);
    }

		var t = true;
    var loop = function() {
      draw(ball);

			if(t){
      	window.requestAnimationFrame(loop);
			}
    };

	  loop();

		$(document).keydown(function(e) {

				switch(e.keyCode) {
						case 37:
						board.x -= 30;
						break;

						case 39:
						board.x += 30;
						break;
				}
				e.preventDefault();
		});

    // $('#addFish').click(function(){
    //     fishes.push(createFish());
    // });

});
