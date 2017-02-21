"use strict";

// ���ӱ��
var PIECE_KING = 0;		// ��
var PIECE_ADVISOR = 1;	// ʿ
var PIECE_BISHOP = 2;	// ��
var PIECE_KNIGHT = 3;	// ��
var PIECE_ROOK = 4;		// ��
var PIECE_CANNON = 5;	// ��
var PIECE_PAWN = 6;		// ��

// ���̷�Χ
var RANK_TOP = 3;
var RANK_BOTTOM = 12;
var FILE_LEFT = 3;
var FILE_RIGHT = 11;

// �������飬�����ж������Ƿ���������
var IN_BOARD_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

// �ж�ĳλ���Ƿ�������
function IN_BOARD(sq) {
  return IN_BOARD_[sq] != 0;
}

// ����һά���󣬻�ȡ��ά��������
function RANK_Y(sq) {
  return sq >> 4;
}

// ����һά���󣬻�ȡ��ά��������
function FILE_X(sq) {
  return sq & 15;
}

// ����ά����ת��Ϊһά����
function COORD_XY(x, y) {
  return x + (y << 4);
}

function CHR(n) {
  return String.fromCharCode(n);
}

function ASC(c) {
  return c.charCodeAt(0);
}

function CHAR_TO_PIECE(c) {
  switch (c) {
  case "K":
    return PIECE_KING;
  case "A":
    return PIECE_ADVISOR;
  case "B":
    return PIECE_BISHOP;
  case "N":
    return PIECE_KNIGHT;
  case "R":
    return PIECE_ROOK;
  case "C":
    return PIECE_CANNON;
  case "P":
    return PIECE_PAWN;
  default:
    return -1;
  }
}

function Position() {
  
}

// ��ʼ���������
Position.prototype.clearBoard = function() {
  this.squares = [];	// �������һά�������
  for (var sq = 0; sq < 256; sq ++) {
    this.squares.push(0);
  }
}

// ������pc��ӽ�����е�spλ��
Position.prototype.addPiece = function(sq, pc) {
  this.squares[sq] = pc;
}

// ͨ��FEN����ʼ�����
Position.prototype.fromFen = function(fen) {
  this.clearBoard();
  var y = RANK_TOP;
  var x = FILE_LEFT;
  var index = 0;
  if (index == fen.length) {
    return;
  }
  var c = fen.charAt(index);
  while (c != " ") {
    if (c == "/") {
      x = FILE_LEFT;
      y ++;
      if (y > RANK_BOTTOM) {
        break;
      }
    } else if (c >= "1" && c <= "9") {
      x += (ASC(c) - ASC("0"));
    } else if (c >= "A" && c <= "Z") {
      if (x <= FILE_RIGHT) {
        var pt = CHAR_TO_PIECE(c);
        if (pt >= 0) {
          this.addPiece(COORD_XY(x, y), pt + 8);
        }
        x ++;
      }
    } else if (c >= "a" && c <= "z") {
      if (x <= FILE_RIGHT) {
        var pt = CHAR_TO_PIECE(CHR(ASC(c) + ASC("A") - ASC("a")));
        if (pt >= 0) {
          this.addPiece(COORD_XY(x, y), pt + 16);
        }
        x ++;
      }
    }
    index ++;
    if (index == fen.length) {
      return;
    }
    c = fen.charAt(index);
  }
  index ++;
  if (index == fen.length) {
    return;
  }

}