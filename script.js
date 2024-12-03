var Zwierze = function(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
};

Zwierze.prototype.rysuj = function(a) {
    var ZwierzeHtml = a;
    this.ZwierzeElement = $(ZwierzeHtml);
    this.ZwierzeElement.css({
        position: "absolute",
        left: this.x + "px",
        top: this.y + "px",
        width: this.width + "px",
        height: this.height + "px"
    });

    $("main").append(this.ZwierzeElement);
};

Zwierze.prototype.wPrawo = function() {
    if (this.x + this.width < $(window).width()) { 
        this.x += this.speed;
        this.ZwierzeElement.css({
            left: this.x + "px",
            top: this.y + "px"
        });
    }
};

Zwierze.prototype.wLewo = function() {
    if (this.x > 0) { 
        this.x -= this.speed;
        this.ZwierzeElement.css({
            left: this.x + "px",
            top: this.y + "px"
        });
    }
};

Zwierze.prototype.wGore = function() {
    if (this.y > 0) { 
        this.y -= this.speed;
        this.ZwierzeElement.css({
            left: this.x + "px",
            top: this.y + "px"
        });
    }
};

Zwierze.prototype.wDol = function() {
    if (this.y + this.height < $(window).height()) { 
        this.y += this.speed;
        this.ZwierzeElement.css({
            left: this.x + "px",
            top: this.y + "px"
        });
    }
};

Zwierze.prototype.sprawdzKolizje = function(inneZwierze) {   
    return !(this.x + this.width < inneZwierze.x || 
             this.x > inneZwierze.x + inneZwierze.width || 
             this.y + this.height < inneZwierze.y || 
             this.y > inneZwierze.y + inneZwierze.height); 
};

function stworzNowaMyszka() {
    var x = Math.floor(Math.random() * ($(window).width() - 100));
    var y = Math.floor(Math.random() * ($(window).height() - 100));
    var myszka = new Zwierze(x, y, 100, 100, 30);
    var a = '<img src="mysz.png">';
    myszka.rysuj(a);
    return myszka;
}

var licznikMyszek = 0;
var Zwierze1 = new Zwierze(1000, 500, 300, 300, 10);
var mysz1 = stworzNowaMyszka();

var a = '<img src="kot.png">';
Zwierze1.rysuj(a);

function aktualizujLicznik() {
    $("#licznik").text("Zjedzone myszki: " + licznikMyszek);
}

$("header").append('<div id="licznik">Zjedzone myszki: 0</div>');

$(document).keydown(function(e) {
    switch (e.key) {
        case "ArrowRight":
            Zwierze1.wPrawo();
            break;
        case "ArrowLeft":
            Zwierze1.wLewo();
            break;
        case "ArrowUp":
            Zwierze1.wGore();
            break;
        case "ArrowDown":
            Zwierze1.wDol();
            break;
    }

    if (Zwierze1.sprawdzKolizje(mysz1)) {
        mysz1.ZwierzeElement.remove();
        licznikMyszek++;
        aktualizujLicznik();

        mysz1 = stworzNowaMyszka();
    }
});

$(document).keydown(function(e) {
    switch (e.key) {
        case "w":
            mysz1.wGore();
            break;
        case "s":
            mysz1.wDol();
            break;
        case "a":
            mysz1.wLewo();
            break;
        case "d":
            mysz1.wPrawo();
            break;
        case "W":
            mysz1.wGore();
            break;
        case "S":
            mysz1.wDol();
            break;
        case "A":
            mysz1.wLewo();
            break;
        case "D":
            mysz1.wPrawo();
            break;
    }

    if (Zwierze1.sprawdzKolizje(mysz1)) {
        mysz1.ZwierzeElement.remove();
        licznikMyszek++;
        aktualizujLicznik(); 

        mysz1 = stworzNowaMyszka();
    }
});
