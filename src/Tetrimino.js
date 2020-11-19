var Tetrimino = cc.Node.extend({

    ctor: function () {
        this._super();
        var random = Math.floor(Math.random() * Tetrimino.PLANS.length);
        this.bricksPlan = Tetrimino.PLANS[random];
        // cc.log(this.bricksPlan);
        // this.table = this.bricksPlan[0];
        this.id = Math.floor(Math.random() * this.bricksPlan.length);
        this.table = this.bricksPlan[this.id];
        // cc.log(this.table);
        this.pos = { w: 4, h: 20 };
        // this.initcreate();
        this.anchorX = 0;
        this.anchorY = 0;

    },
    initcreate: function () {
        this.removeAllChildren();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((this.table[i][j] === 1)&&Table.isValid(i+this.pos.h,j+this.pos.w)) {
                    var brick= new BrickSprite(i + this.pos.h, j + this.pos.w);
                    // brick.retain();
                    this.addChild(brick);
                }
            }
        }
        // cc.log("Manh", this.table);
    },
    update: function (dt) {
        // cc.log(Tetrimino.move);
        var p = 0;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                Tetrimino.move = key;
                p++;
                // if (p > Tetrimino.speedmove) {
                //     p = 0;
                //     Tetrimino.move = key;
                // }
                // else Tetrimino.move = 0;
            },
            onKeyReleased: function (key, event) {
                Tetrimino.move = 0;
            }
        }, this);
        // cc.log("move", Tetrimino.move);
        // cc.log("p",p);
        Tetrimino.movecount++;
        if (Tetrimino.move !== 0) {
            if (Tetrimino.movecount > Tetrimino.speed / 2) {
                if (Tetrimino.move == Tetrimino.left) {
                    cc.log("left");
                    cc.log(this.pos.w);
                    if (Table.canMove({ w: this.pos.w - 1, h: this.pos.h }, this.table)) {
                        this.pos = { w: this.pos.w - 1, h: this.pos.h };
                        cc.log(this.pos.w);
                        this.initcreate();
                    }
                } else if (Tetrimino.move == Tetrimino.right) {
                    cc.log("right");
                    cc.log(this.pos.w);
                    if (Table.canMove({ w: this.pos.w + 1, h: this.pos.h }, this.table)) {
                        this.pos = { w: this.pos.w + 1, h: this.pos.h };
                        cc.log(this.pos.w);
                        this.initcreate();
                    }
                } else if (Tetrimino.move == Tetrimino.up) {
                    cc.log("rotate");
                    // cc.log(this.id
                    //     (this.bricksPlan.length);
                    if (this.id < 0) this.id = this.bricksPlan.length;
                    else this.id--;
                    var tab = this.bricksPlan[this.id];
                    cc.log(tab);
                    if (Table.canMove({ w: this.pos.w, h: this.pos.h }, tab)) {
                        this.table = tab;
                        this.initcreate();
                    }
                } else if (Tetrimino.move == Tetrimino.down) {
                    cc.log("down");
                    cc.log(this.pos.w);
                    if (Table.canMove({ w: this.pos.w, h: this.pos.h - 1 }, this.table)) {
                        this.pos = { w: this.pos.w, h: this.pos.h - 1 };
                        cc.log(this.pos.w);
                        this.initcreate();
                    }
                }
                Tetrimino.movecount = 0;
            }
            // Tetrimino.move = 0;
        }
        Tetrimino.count++;
        if (Tetrimino.count > Tetrimino.speed) {
            // cc.log("down");
            // cc.log(this.pos.w);
            if (Table.canMove({ w: this.pos.w, h: this.pos.h - 1 }, this.table)) {
                this.pos = { w: this.pos.w, h: this.pos.h - 1 };
                // cc.log(this.pos.w);
                this.initcreate();
            }
            Tetrimino.count = 0;
        }

    },
    set: function (tet, brick) {
        this.pos = { w: 4, h: 20 };
        this.table = brick;
        this.setPosition(21 + tet.w * BrickSprite.SIZE, 21 + tet.h * BrickSprite.SIZE);
        this.initcreate();
    },

});
Tetrimino.PLANS = [
    [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ],
    [
        // square
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ],
    // T
    [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]
        ]
    ],
    //I
    [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ]
    ],
    // L
    [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ],

    // L - reversed
    [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ]
    ],


    // Z
    [
        [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
        ]
    ],

    // Z - reversed
    [
        [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ]

]
Tetrimino.move = 0
Tetrimino.left = 37
Tetrimino.right = 39
Tetrimino.down = 40
Tetrimino.up = 38
Tetrimino.count = 0
Tetrimino.speed = 13
Tetrimino.movecount = 0;