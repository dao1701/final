

var Scene1 = cc.Layer.extend({
    menu: null,
    scoreS: null,
    state: 0,
    next:null,
    ctor: function () {
        this.table = null;
        this._super();
        this.init();
    },
    init: function () {
        this.initBackGround();
        return true;
    },
    initBackGround: function () {
        var background = new cc.Sprite(res.background);
        var winSize = cc.director.getWinSize();
        // cc.log(winSize.width);
        background.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(background);

        var play = new cc.Sprite(res.play);
        var pp = new cc.MenuItemSprite(play, play, play, this.onGame, this);
        this.menu = new cc.Menu(pp);
        this.menu.setScale(0.7);
        // this.addChild(about);
        this.menu.x = winSize.width / 2.5;
        this.menu.y = winSize.height / 2;
        this.addChild(this.menu);

        // cc.log(this.menu);
        // this.removeChild(this.menu);
        return true;
    },
    onGame: function () {
        cc.log('ongame1');
        this.removeChild(this.menu);

        this.table = new Table();
        this.addChild(this.table);
        // if (this.table.tetrimino==null) this.table.tetrimino= new Tetrimino();

        this.scoreS = new cc.LabelTTF(Scene1.score.toString(), "res/fonts/telelower.ttf", 23)
        this.scoreS.setColor(cc.color(MW.FONTCOLOR));
        this.scoreS.x = 545;
        this.scoreS.y = 850;
        this.addChild(this.scoreS);
        this.scheduleUpdate();
    },
    update: function (dt) {
        //cc.log("adfaf");
        // this.score++;
        this.scoreS.setString(Scene1.score.toString());
        // this.scoreS.
        // if (this.table.nexttetrimino==null){
        //     this.table.nexttetrimino= new Tetrimino();
        //     this.addChild(this.table.nexttetrimino);
        // }
        if (this.table.nexttetrimino==null) this.table.nexttetrimino=new Tetrimino();
        this.removeChild(this.next);
        this.next= new cc.Node();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((this.table.nexttetrimino.table[i][j] === 1)) {
                    var brick= new BrickSprite(i+15 , j+10);
                    // brick.retain();
                    this.next.addChild(brick);
                }
            }
        }
        this.addChild(this.next);
        this.table.update(dt);

        if (Table.over == true) {
            Scene1.score = 0;
            this.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(this.onGameOver, this)
            ));
        }
    },
    onGameOver: function () {
        cc.director.runScene(Scene1.scene());
        Scene1.score=0;
    }
});
Scene1.score = 0;
Scene1.scene = function () {
    var scene = new cc.Scene();
    var layer = new Scene1();
    scene.addChild(layer);
    return scene;
};
