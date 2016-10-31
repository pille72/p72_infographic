if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var Infographic = {
    active: 0,
    isChangingStage: false,
    activeStage: false,
    wrapper: '#infographic',
    stageBaseClass: '.info-stage',
    stageClass: '.info-stage-',
    loadingStage: '.loading-stage',

    controls: {
        wrap: '<div class="controls {0}">{1}</div>',
        down: '<a href="#" class="arrow arrow-down next"></a>',
        right: '<a href="#" class="arrow arrow-right next"></a>',
        left: '<a href="#" class="arrow arrow-left prev"></a>',
        up: '<a href="#" class="arrow arrow-up prev"></a>'
    },

    animation: {
        up: 'slide-up',
        down: 'slide-down',
        left: 'slide-left',
        right: 'slide-right'
    },
    stages: [],

    initArrows: function() {
        var me = this;
        $('.controls .arrow.next').on('click', function(){
            me.next.call(me, $(this));
        });
        $('.controls .arrow.prev').on('click', function(){
            me.previous.call(me, $(this));
        });
    },
    initializeControls: function() {
        var i, len = this.stages.length, curr, prev, next = false, tpl, dir;
        for(i=0;i<len;i++) {
            curr = $(this.stages[i]);
            prev = (this.stages[i-1]) ? $(this.stages[i-1]) : false;
            next = (this.stages[i+1]) ? $(this.stages[i+1]) : false;

            if(!curr.attr('id')) {
                curr.attr('id', 'info-stage-' + i);
            }

            if(prev && prev.data('direction')) {
                tpl = this.controls.wrap;
                dir = this.getDirection(prev.data('direction'), true);

                if(curr.data('direction') === 'down') {
                    dir = 'up';
                }
                if(curr.data('direction') === 'right') {
                    dir = 'left';
                }
                curr.find('.content').append(tpl.format('controls-' + dir, this.controls[dir]));
            }
            if(next && next.data('direction')) {
                tpl = this.controls.wrap;
                dir = this.getDirection(next.data('direction'), false);
                curr.find('.content').append(tpl.format('controls-' + dir, this.controls[dir]));
            }

        }
        this.initArrows();
        this.initKeyBoard();
    },
    initKeyBoard: function() {
        var me = this;
        $(document).keydown(function(e) {
            switch(e.which) {
                case 37: // left
                    me.handleKeyboardInput.call(me, 'left');
                    break;
                case 38: // up
                    me.handleKeyboardInput.call(me, 'up');
                    break;
                case 39: // right
                    me.handleKeyboardInput.call(me, 'right');
                    break;
                case 40: // down
                    me.handleKeyboardInput.call(me, 'down');
                    break;

                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        });
    },
    handleKeyboardInput: function(direction) {
        var possibleArrow = $(this.activeStage).find('.controls-' + direction + ' .arrow');
        if(possibleArrow.length > 0 && !this.isChangingStage) {
            if(possibleArrow.hasClass('next')) {
                this.isChangingStage = true;
                this.next.call(this);
            }
            if(possibleArrow.hasClass('prev')) {
                this.isChangingStage = true;
                this.previous.call(this);
            }
        }
    },
    start: function() {
        var me = this, direction, newStage, hash = window.location.hash;
        this.stages = $(this.wrapper + ' ' + this.stageBaseClass);
        this.initializeControls();
        $(this.loadingStage).hide();

        if(hash && $(hash).length > 0) {
            me.activeStage = $(hash);
            me.resetIndex.call(me);
        }
        else {
            me.activeStage = $(me.stages[me.active]);
        }

        this.isChangingStage = true;
        newStage = me.activeStage;
        newStage.show();

        window.setTimeout(function(){
            newStage.addClass('active');
            me.isChangingStage = false;
        }, 50);
        $(this.loadingStage).remove();
    },

    getDirection: function(direction, reverse, append) {
        switch(direction) {
            case 'down':
                direction = (reverse === true) ? 'up' : 'down';
                break;
            case 'up':
                direction = (reverse === true) ? 'down' : 'up';
                break;
            case 'left':
                direction = (reverse === true) ? 'right' : 'left';
                break;
            case 'right':
                direction = (reverse === true) ? 'left' : 'right';
                break;
        }

        if(direction == '') {
            direction = 'down';
        }
        if(append) {
            return append + direction;
        }
        return direction;
    },

    getDirectionClassFromObject: function(obj, reverse) {
        return this.getDirection(obj.data('direction'), reverse, 'slide-');
    },

    moveStages: function(stageIn, stageOut, goNext) {
        var me = this, classOut = this.getDirectionClassFromObject(stageIn, false),
            classIn = this.getDirectionClassFromObject(stageIn, true);
        if(!goNext) {
            classOut = this.getDirectionClassFromObject(stageOut, true);
            classIn = this.getDirectionClassFromObject(stageOut, false);
        }

        stageOut.addClass(classOut);
        stageIn.addClass(classIn);
        stageIn.show();

        window.setTimeout(function(){
            stageOut.removeClass('active');
            stageIn.addClass('active');
        }, 50);

        window.setTimeout(function(){
            stageOut.hide();
            stageIn.removeClass(classIn);
            stageOut.removeClass(classOut);
            window.location.hash = stageIn.attr('id');
            me.isChangingStage = false;
        }, 1000);
    },
    next: function(elem) {
        var me = this;
        if((me.active + 1) <= me.stages.length) {
            me.activeStage = $(me.stages[me.active + 1]);
            me.moveStages.call(me, $(me.stages[me.active + 1]), $(me.stages[me.active]), true);
            me.active++;
        }
    },
    previous: function(elem) {
        var me = this;
        if((me.active - 1) >= 0) {
            me.activeStage = $(me.stages[me.active - 1]);
            me.moveStages.call(me, $(me.stages[me.active - 1]), $(me.stages[me.active]), false);
            me.active--;
        }
    },
    resetIndex: function() {
        var i, len = this.stages.length, curr;
        for(i=0;i<len;i++) {
            curr = $(this.stages[i]);
            if(curr.attr('id') === $(this.activeStage).attr('id')) {
                this.active = i;
                return;
            }
        }
        this.active = 0;
        return;
    }
};

$(document).ready(function(){
    window.setTimeout(function(){
        Infographic.start();
    }, 3000);
});