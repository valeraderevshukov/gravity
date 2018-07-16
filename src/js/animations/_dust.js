import { GET_RANDOM } from './../utils';

(function() {
  $(function() {
    var H, Particle, W, animateParticles, canvas, clearCanvas, colorArray, createParticles, ctx, drawParticles, initParticleSystem, particleCount, particles, updateParticles;
    Particle = function() {
      this.color = colorArray[0];
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.direction = {
        x: -1 + Math.random() * 2,
        y: -1 + Math.random() * 1
      };
      this.vx = 1 * Math.random() + 0.05;
      this.vy = 1 * Math.random() + 0.05;
      this.radius = GET_RANDOM(1, 4);
      this.move = function() {
        this.x += this.vx * this.direction.x;
        this.y += this.vy * this.direction.y;
      };
      this.changeDirection = function(axis) {
        this.direction[axis] *= -1;
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      };
      this.boundaryCheck = function() {
        if (this.x >= W) {
          this.x = W;
          this.changeDirection('x');
        } else if (this.x <= 0) {
          this.x = 0;
          this.changeDirection('x');
        }
        if (this.y >= H) {
          this.y = H;
          this.changeDirection('y');
        } else if (this.y <= 0) {
          this.y = 0;
          this.changeDirection('y');
        }
      };

      var self = this;

      function setRadius(value) {
        self.radius = value;
      }

      function resize(event) {
        W = $(window).width();
        self.x = Math.random() * W;
        if (W > 600) {
          setRadius(GET_RANDOM(1, 4));
        } else {
          setRadius(GET_RANDOM(1, 4));
        }
      }
            
      resize();
      $(window).on('resize', resize);
    };
    clearCanvas = function() {
      ctx.clearRect(0, 0, W, H);
    };
    createParticles = function() {
      var i, p;
      i = particleCount - 1;
      while (i >= 0) {
        p = new Particle();
        particles.push(p);
        i--;
      }
    };
    drawParticles = function() {
      var i, p;
      i = particleCount - 1;
      while (i >= 0) {
        p = particles[i];
        p.draw();
        i--;
      }
    };
    updateParticles = function() {
      var i, p;
      i = particles.length - 1;
      while (i >= 0) {
        p = particles[i];
        p.move();
        p.boundaryCheck();
        i--;
      }
    };
    initParticleSystem = function() {
      createParticles();
      drawParticles();
    };
    animateParticles = function() {
      clearCanvas();
      drawParticles();
      updateParticles();
      requestAnimationFrame(animateParticles);
    };
    W = null;
    H = null;
    canvas = null;
    ctx = null;
    particleCount = 100;
    particles = [];
    colorArray = ['rgba(255,255,255,0.2)'];
    W = window.innerWidth;
    H = $('.js-gravity').height();
    canvas = $('.js-dust').get(0);
    canvas.width = W;
    canvas.height = H;
    ctx = canvas.getContext('2d');
    initParticleSystem();
    requestAnimationFrame(animateParticles);
    $(window).on('resize', function(event) {
      canvas.width = $(window).width();
    });
  });
}).call(this);
