var Table = cc.Node.extend({
    tetrimino: null,
    nexttetrimino: null,
    ctor: function () {
        this._super();
        this.inittable();
        // this.create();
        cc.log(Table.table.length);
    },
    inittable: function () {
        // cc.log(this.table);
        //this.setPercentContentSize()
        Table.over = false;
        this.tetrimino = null;
        this.nexttetrimino = null;
        Table.table = [];
        for (let i = 0; i < Table.HEIGHT; i++) {
            Table.table.push("0000000000".split(""));
        }
        // this.nexttetrimino = new Tetrimino();
    },
    create: function () {
        // cc.log(this.table[1][1])
        // cc.log(!this.table[1][1]==0);
        cc.log("Create");
        this.removeAllChildren();
        while (Table.HEIGHT > Table.table.length) Table.table.push("0000000000".split(""));
        cc.log(Table.table.length);
        var i; var j;
        for (i = 0; i < Table.table.length; i++) {
            cc.log(Table.table[i]);
        }
        for (i = 0; i < Table.HEIGHT; i++) {
            for (j = 0; j < Table.WIDTH; j++) {
                if ((Table.table[i][j] == 1))
                    this.addChild(new BrickSprite(i, j));
            }
        }

        // Table.table=this.table;
        // this.addChild(this.tetrimino);
    },
    update: function (dt) {
        if (this.nexttetrimino == null) this.nexttetrimino = new Tetrimino(), this.nexttetrimino.retain();
        if (this.tetrimino == null) {
            this.tetrimino = this.nexttetrimino;
            this.addChild(this.tetrimino);
            this.nexttetrimino = new Tetrimino();
            this.nexttetrimino.retain();
        }

        this.tetrimino.update();
        var tet = { w: this.tetrimino.pos.w, h: this.tetrimino.pos.h - 1 };
        if (!Table.canMove(tet, this.tetrimino.table)) {
            // cc.log("can't move");
            if (!Table.over1()) {
                // cc.log("!over");
                Table.count++;
                if (Table.count > 40) {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            if (this.tetrimino.table[i][j] == 1) {
                                if (this.tetrimino.pos.h + i < Table.HEIGHT)
                                    Table.table[this.tetrimino.pos.h + i][this.tetrimino.pos.w + j] = 1;
                                else Table.over = true;
                            }
                        }
                    }
                    this.setScore();
                    // this.create();
                    // this.removeChild(this.tetrimino);
                    // var p =new Tetrimino();
                    // this.tetrimino=p;
                    delete this.tetrimino;
                    Table.count = 0;
                }
                // this.tetrimino=new Tetrimino();
            } else Table.over = true;
        }

    },
    setScore: function () {
        cc.log("Score");
        var tab = [];
        for (let i = 0; i < Table.HEIGHT; i++) {
            var p = Table.table[i];
            var kt = true;
            for (let j = 0; j < p.length; j++) {
                if (p[j] == 0) kt = false;
            }
            if (!kt) {
                //Scene1.score++;
                tab.push(Table.table[i]);//
            }
            else Scene1.score++;
        }
        Table.table = tab;
        this.create();
    }
});

Table.isValid = function (x, y) {
    if (!(x >= 0 && x < Table.HEIGHT && y >= 0 && y < Table.WIDTH)) return false;
    return true;
}
Table.canMove = function (pos, brick) {
    // cc.log(Table.table[20][1]);
    var tab = Table.table;
    if (brick[0][0] == 1) {
        var h = pos.h;
        var w = pos.w;
        var kt=false;
        for (let i = 0; i <= pos.h; i++) {
            if (tab[i][w]==0) kt= true;
        }
        cc.log(kt);
        return kt;
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (brick[i][j] == 1) {
                var h = i + pos.h;
                var w = j + pos.w;
                if (Table.isValid(h, w)) {
                    // cc.log("Size");
                    // cc.log("h", h);
                    // cc.log("w", w);
                    if (Table.table[h][w] == 1) return false;
                }
                else if (h >= Table.HEIGHT) return true;
                else return false;
            }
        }
    }
    return true;
}
Table.over1 = function () {
    return (Table.table[20][5] == 1 || Table.table[20][4] == 1);
}
Table.WIDTH = 10;
Table.HEIGHT = 21;
Table.table = [];
Table.count = 0;
Table.over = false;