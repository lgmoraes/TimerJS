/* GLOBAL */

timer_main = function(e) {
    
}


/* STRUCTURES */
function timer() {
    this.cumulTime = 0;         // En ms. Augmente a chaques pause() en fonction du timestamp
    this.timeMax = 0;
    this.running = false;
    this.timestamp = null;
}

timer.prototype.play = function() {
    this.running = true;
    this.timestamp = Date.now();
}

timer.prototype.pause = function() {
    this.cumulTime += Date.now() - this.timestamp;
    this.running = false;
    this.timestamp = Date.now();
}

timer.prototype.stop = function() {
    this.cumulTime = 0;
    this.running = false;
}

timer.prototype.getCurrentTime = function() {
    if(this.running === true)
        return this.cumulTime + (Date.now() - this.timestamp);
    else
        return this.cumulTime;
}



function timerInterface() {
    /* INITIALISATION */
    this.timer = new timer();
    this.interface = document.createElement('div');
    this.menu = document.createElement('div');
    this.btn_lecture = document.createElement('div');
    this.btn_stop = document.createElement('div');
    this.timer_actual = divTxt("auto", "0:00");
    this.timer_end = divTxt("auto", "0:00");

    this.audio.lecteur = this;
    this.interface.lecteur = this;
    this.interface.className = "lecteur_audio " + style;
    this.menu.className = "menu";
    this.btn_lecture.className = "lecture";    
    this.btn_stop.className = "stop";
    this.mediaList = [];
    // PROGRESS BAR
    this.progressBar.className = "progressBar";
    this.progressBar_actual.className = "progressBar_actual";
    this.progressBar_buffer.className = "progressBar_buffer";
    this.progressBar_cursor.className = "progressBar_cursor";
    // VOLUME
    this.btn_volume.className = "volume-high";
    this.hitbox_volume.className = "hitbox_volume";
    this.bar_volume.className = "bar_volume";
    this.barRemplissage_volume.className = "barRemplissage_volume";
    this.hitbox_volume.appendChild(this.btn_volume);
    this.hitbox_volume.appendChild(this.bar_volume);
    this.bar_volume.appendChild(this.barRemplissage_volume);
    // TIMER
    this.timer_actual.className = "timer";
    this.timer_end.className = "timer";
    var timer_slash = divTxt("34", "/");
    timer_slash.className = "timer";
    
    this.menu.appendChild(widthSpace(20));
    this.menu.appendChild(this.btn_lecture);
    this.menu.appendChild(this.btn_stop);
    this.menu.appendChild(this.hitbox_volume);
    this.menu.appendChild(widthSpace(15));
    this.menu.appendChild(this.timer_actual);
    this.menu.appendChild(timer_slash);
    this.menu.appendChild(this.timer_end);
    this.progressBar.appendChild(this.progressBar_buffer);
    this.progressBar.appendChild(this.progressBar_actual);
    this.progressBar.appendChild(this.progressBar_cursor);
    this.interface.appendChild(this.progressBar);
    this.interface.appendChild(this.menu);

    element_dest.appendChild(this.interface);

    /* SET POSITION AND SIZE */
    if(options !== undefined) {
        this.interface.style.left = options.x + "px";
        this.interface.style.top = options.y + "px";
        this.interface.style.bottom = "auto";
        this.interface.style.width = options.w + "px";
        this.menu.style.height = options.h + "px";
        this.menu.style.lineHeight = options.h + "px";
    }


    /* EVENTS */
    addEvent(this.interface, "mousedown", function(e) {
        e.preventDefault();
    });

    addEvent(this.interface, "click", function(e) {
        e.preventDefault();
    });

    this.btn_lecture.onmousedown = function() {
        var lecteur = this.parentElement.parentElement.lecteur;
        
        if(hasClass("pause", this))
            lecteur.audio.pause();
        else if(hasClass("lecture", this) || hasClass("recommencer", this))
            lecteur.audio.play();
    };

    this.btn_stop.onclick = function() {
        var lecteur = this.parentElement.parentElement.lecteur;
        lecteur.stop();
    };

    addEvent(this.audio, "play", function() {
        this.lecteur.btn_lecture.className = "pause";
    });

    addEvent(this.audio, "pause", function() {
        this.lecteur.btn_lecture.className = "lecture";
    });

    addEvent(this.audio, "timeupdate", function() {
        this.lecteur.updateCurrentTime();
    });

    addEvent(this.audio, "ended", function() {
        this.lecteur.btn_lecture.className = "recommencer";
    });

}



/* FONCTIONS PRIVEES */
timer.prototype.updateCurrentTime = function() {
    var t = getFormatedTime(this.audio.currentTime);

    if(t.h === 0)
        this.timer_actual.innerHTML = t.m + ":" + zerofill(t.s, 2);
    else
        this.timer_actual.innerHTML = t.h + ":" + zerofill(t.m, 2) + ":" + zerofill(t.s, 2);

    /* PROGRESS BAR */
    var w = this.progressBar.offsetWidth;
    var ratio = this.audio.currentTime / this.audio.duration;
    var positionX = w*ratio;

    this.progressBar_actual.style.width = positionX + "px";
    this.progressBar_cursor.style.left = positionX + "px";
}

