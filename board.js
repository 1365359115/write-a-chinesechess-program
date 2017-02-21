"use strict";

var BOARD_WIDTH = 521;
var BOARD_HEIGHT = 577;
var SQUARE_SIZE = 57;
var SQUARE_LEFT = (BOARD_WIDTH - SQUARE_SIZE * 9) >> 1;
var SQUARE_TOP = (BOARD_HEIGHT - SQUARE_SIZE * 10) >> 1;

var PIECE_NAME = [
  "oo", null, null, null, null, null, null, null,
  "rk", "ra", "rb", "rn", "rr", "rc", "rp", null,
  "bk", "ba", "bb", "bn", "br", "bc", "bp", null,
];
var PIECE_NAME_CHN = [
  "����", null, null, null, null, null, null, null,
  "�쎛", "����", "����", "���R", "��܇", "��h", "���", null,
  "�ڽ�", "��ʿ", "����", "���R", "��܇", "����", "����", null,
];

// ���Ӿ���������߿�ľ���
function SQ_X(sq) {
  return SQUARE_LEFT + (FILE_X(sq) - 3) * SQUARE_SIZE;
}

// ���Ӿ��������ϱ߿�ľ���
function SQ_Y(sq) {
  return SQUARE_TOP + (RANK_Y(sq) - 3) * SQUARE_SIZE;
}

// Board����ĳ�ʼ�����룬λ��index.html��
function Board(container, images) {
  this.images = images;			// ͼƬ·��
  this.imgSquares = [];			// img���飬��Ӧ�����ϵ�90��λ������
  this.pos = new Position();
  this.pos.fromFen("rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1");	// ����FEN����ʼ�����

  var style = container.style;
  style.position = "relative";
  style.width = BOARD_WIDTH + "px";
  style.height = BOARD_HEIGHT + "px";
  style.background = "url(" + images + "board.jpg)";
  var this_ = this;
  for (var sq = 0; sq < 256; sq ++) {
    // �����������̵�256����
	
	// 1.�жϸõ��Ƿ�λ����ʵ����
	if (!IN_BOARD(sq)) {
      this.imgSquares.push(null);
      continue;
    }
	
	// 2.�����ϵ�90������ÿ�����򶼻ᶨ��һ����Ӧ��img��ǩ
    var img = document.createElement("img");
    var style = img.style;
    style.position = "absolute";
    style.left = SQ_X(sq);
    style.top = SQ_Y(sq);
    style.width = SQUARE_SIZE;
    style.height = SQUARE_SIZE;
    style.zIndex = 0;

	// 3.ÿ���������򶼻�󶨵���¼�������sq_��ʾ�˾����������򡣣������õ��ˡ��հ�����֪ʶ�ɣ�
    img.onmousedown = function(sq_) {
      return function() {
        this_.clickSquare(sq_);
      }
    } (sq);

	// 4.������õ�img��ǩ׷�ӵ�html��
    container.appendChild(img);
	
	// 5.��img��ǩ�洢��imgSquares�����У���������Ը�������в��������磬��ʾ��ͬ������ͼƬ��
	this.imgSquares.push(img);
  }

  // ��ʾ����ͼƬ
  this.flushBoard();
}

// ������̵���Ӧ������������̣����ӻ��߿�λ�ã����ͻ���øú�����sq_�ǵ����λ��
Board.prototype.clickSquare = function(sq_) {
  alert("������ˡ�"+PIECE_NAME_CHN[this.pos.squares[sq_]]+"��");
}

// ��ʾsqλ�õ�����ͼƬ�������λ��û���ӣ�����ʾһ��͸����ͼƬ
Board.prototype.drawSquare = function(sq) {
  var img = this.imgSquares[sq];
  img.src = this.images + PIECE_NAME[this.pos.squares[sq]] + ".gif";
}

// ������ʾ�����ϵ�����
Board.prototype.flushBoard = function() {
  for (var sq = 0; sq < 256; sq ++) {
    if (IN_BOARD(sq)) {
      this.drawSquare(sq);
    }
  }
}
