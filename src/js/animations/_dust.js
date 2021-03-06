import { GET_RANDOM } from './../utils';
import { WIN } from '../constants';

(() => {
  const parent = $('.js-gravity');
  const canvasWindow = $('.js-dust');
  if (!parent.length) return;
  $(() => {
    let H, Particle, W, animateParticles, canvas, clearCanvas, colorArray, createParticles, ctx, drawParticles, initParticleSystem, particleCount, particles, updateParticles;
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
      this.radius = GET_RANDOM(0.5, 4);
      this.move = () => {
        this.x += this.vx * this.direction.x;
        this.y += this.vy * this.direction.y;
      };
      this.changeDirection = function(axis) {
        this.direction[axis] *= -1;
      };
      this.draw = () => {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      };
      this.boundaryCheck = () => {
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

      let self = this;

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
      WIN.on('resize', resize);
    };
    clearCanvas = function() {
      ctx.clearRect(0, 0, W, H);
    };
    createParticles = () => {
      let i, p;
      i = particleCount - 1;
      while (i >= 0) {
        p = new Particle();
        particles.push(p);
        i--;
      }
    };
    drawParticles = () => {
      let i, p;
      i = particleCount - 1;
      while (i >= 0) {
        p = particles[i];
        p.draw();
        i--;
      }
    };
    updateParticles = () => {
      let i, p;
      i = particles.length - 1;
      while (i >= 0) {
        p = particles[i];
        p.move();
        p.boundaryCheck();
        i--;
      }
    };
    initParticleSystem = () => {
      createParticles();
      drawParticles();
    };
    animateParticles = () => {
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
    H = parent.height();
    canvas = canvasWindow.get(0);
    canvas.width = W;
    canvas.height = H;
    ctx = canvas.getContext('2d');
    initParticleSystem();
    requestAnimationFrame(animateParticles);
    WIN.on('resize', function(event) {
      canvas.width = WIN.width();
    });
  });
}).call(this);
