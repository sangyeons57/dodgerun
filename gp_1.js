	
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext("2d")

			var width = canvas.width;
			var height = canvas.height;
			
			var X = 500;
			var Y = 960;
			var lineWidth = 10;

			var Code = {
				38: "up",
				40: "down",
				39: "right",
				37: "left",
			};

			var score = 0; 
			
			var ground = function () {
				ctx.fillStyle = "black";
				ctx.fillRect(0,0,width,lineWidth);
				ctx.fillRect(0,0,lineWidth,height);
				ctx.fillRect(0,height-10,width,lineWidth);
				ctx.fillRect(width-10,0,lineWidth,height);
			};

			var move = function(X1,Y1) {
				var s = Code[event.keyCode];
				if (s === "right") {
					X+=10;
					X1 = X;
					if (X1 > width - lineWidth*3) {
						X-=10;
					}
				} else if (s === "left") {
					X-=10;
					X1 = X;
					if (X1 < lineWidth) {
						X+=10;
					}
				} else if (s === "up") {
					Y -= 10;
					Y1 = Y;
					if (Y1 < lineWidth){
						Y += 10;
					}
				} else if (s === "down"){
					Y += 10;
					Y = Y;
					if (Y1 > height - lineWidth*4){
						Y -= 10;
					}
				}
				return X,Y
			};


			var Black = function() {
				this.random_b = 10+(Math.floor(Math.random()*98))*10;
				this.bh = 10;
				this.i = 0;
			};

			Black.prototype.draw = function () {
				ctx.fillStyle = "black";
				ctx.fillRect(this.random_b,this.bh,10,10);
			};

			Black.prototype.move = function (y) {
				ctx.fillStyle = "black";
				if (this.bh < height-lineWidth) {
					ctx.clearRect(this.random_b ,this.bh,10,10);
					this.bh += 10;
					ctx.fillRect(this.random_b,this.bh,10,10);
				} else {
					this.random_b = 10+(Math.floor(Math.random()*98))*10;
					this.bh = 10;
				}
			};

			Black.prototype.check = function(px,py) {
				if (px <= this.random_b){
					if (px +20 > this.random_b){
						if (py <= this.bh){
							if (py + 21 > this.bh){
								clearInterval(set);
								setTimeout(function(){
									ctx.clearRect(0,0,width,height);
									ctx.font = '50px black'
									ctx.fillText("End",width/2,height/2);
									ctx.fillText(`score: ${score}`,width/2-40,height/2+50);
								},500);
							}
						}
					}
				}
			}


//			var Red = function() {
//				this.random_r = 10+(Math.floor(Math.random()*98))*10;
//				this.rh = 10;
//			}
//
//			Red.prototype.move = function() {
//				ctx.fillStyle = "red";
//				if (this.rh < height-lineWidth) {
//					ctx.clearRect(this.random_r,this.rh,10,10);
//					this.bh += 10;
//				}
//			}



//			for (var i1 = 0.5; i1<900; i1++) {
//				black[i1] = new Black();
//			}

//			for (var level = 1; level <= 10; level++){
//				for ()
//				var level = setTimeout(function(){
//
//				},20000);
//			}

			ground();
			ctx.fillStyle = "blue";
			ctx.fillRect(X ,Y ,20,20);

			black = [];

			for (var i1 = 0; i1<level*100; i1++) {
					black[i1] = new Black();
			}

			var level = 1;
			ctx.font ='50px black';
			ctx.fillText(`Level: ${level}`,width/2-70,height/2)
			setInterval(function(){
				level += 1;
				ctx.font ='50px black';
				ctx.fillText(`Level${level}`,width/2-70,height/2)
			},30000);

			$("body").keydown(function(event){
				ctx.clearRect(X,Y,20,20);
				move(X,Y);
				ctx.fillStyle = "blue";
				ctx.fillRect(X ,Y ,20,20);
			});

			var i=0;

			var set = setInterval(function () {
				score += 1;
				i+=1;
				if (i>level*100-1){
					i = level*100-1;
				}
				black[i].draw();
				for (var t = 0; t < i-1; t += 1){
					black[t].move(Y);
					black[t].check(X,Y);
				}
			},200 / level);
			
