var BrickSprite = cc.Sprite.extend({
  ctor: function (j,i) {
    this._super('res/1.png');
    this.setContentSize(BrickSprite.SIZE, BrickSprite.SIZE);
    this.anchorX = 0;
    this.anchorY = 0;
    this.scale=BrickSprite.SIZE/113;
    this.setPosition(21+i*BrickSprite.SIZE,21+j*BrickSprite.SIZE);
  }
});
BrickSprite.SIZE = 40;
