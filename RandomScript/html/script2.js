$(document).ready(function() {
    var nameArray = [];

    $("#pick").click(function() {
        // Get the input value
        var names = $("#names").val();

        // Seperate the names and push them into the array
        nameArray = names.split(',');

        // Get a random name, the winner
        var winner = nameArray[Math.floor(Math.random() * nameArray.length)];

        winner = "🎉" + " " + winner.trim() + " " + "🎉";

        // Display winner
        $("#world").addClass("open");
        $("#winner").addClass("open");
        $("#close").addClass("open");
        $("#winner").text(winner);
    });

    $("#close").click(function() {
        $("#world").removeClass("open");
        $("#winner").removeClass("open");
        $("#close").removeClass("open");
    });

    // Confetti
    var NUM_CONFETTI = 350;
    var COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
    var canvas = document.getElementById("world");
    var context = canvas.getContext("2d");
    var w = window.innerWidth;
    var h = window.innerHeight;

    resizeWindow();

    function resizeWindow() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeWindow, false);

    for (var i = 0; i < NUM_CONFETTI; i++) {
        confetti.push(new Confetti());
    }

    function Confetti() {
        this.style = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.rgb = `rgba(${this.style[0]}, ${this.style[1]}, ${this.style[2]}`;
        this.r = Math.floor(Math.random() * 4) + 2;
        this.r2 = 2 * this.r;
        this.replace();
    }

    Confetti.prototype.replace = function() {
        this.opacity = 0;
        this.dop = 0.03 * Math.random() + 0.02;
        this.x = Math.random() * w;
        this.y = Math.random() * h - h;
        this.vx = Math.random() * 2 - 1;
        this.vy = 0.5 * this.r + Math.random() * 3;
    };

    Confetti.prototype.draw = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;

        if (this.opacity > 1) {
            this.opacity = 1;
            this.dop *= -1;
        }

        if (this.opacity < 0 || this.y > h) {
            this.replace();
        }

        context.beginPath();
        context.lineWidth = this.r;
        context.strokeStyle = `${this.rgb},${this.opacity})`;
        context.moveTo(this.x + this.r, this.y);
        context.lineTo(this.x - this.r, this.y);
        context.stroke();

        return context.closePath();
    };

    (function draw() {
        requestAnimationFrame(draw);
        context.clearRect(0, 0, w, h);
        for (var i = 0; i < confetti.length; i++) {
            confetti[i].draw();
        }
    })();
});
