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

var ADD_PIECE = false;	// �������
var DEL_PIECE = true;	// ɾ������

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

// �������飬�����жϽ���˧���Ƿ��ھŹ�
var IN_FORT_ = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

// �������飬����У�齫��˧����ʿ���ˣ������ࣩ���߷��Ƿ�Ϸ�
var LEGAL_SPAN = [
                       0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
];

// �������飬����У������߷��Ƿ��������������ض�Ӧ��ŵķ��򣻷��򣬷���0
var KNIGHT_PIN_ = [
                              0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,-16,  0,-16,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0, -1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0, -1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0, 16,  0, 16,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,
];

var KING_DELTA = [-16, -1, 1, 16];
var ADVISOR_DELTA = [-17, -15, 15, 17];
var KNIGHT_DELTA = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];

// �ж�ĳλ���Ƿ�������
function IN_BOARD(sq) {
  return IN_BOARD_[sq] != 0;
}

// �ж�ĳλ���Ƿ��ھŹ�
function IN_FORT(sq) {
  return IN_FORT_[sq] != 0;
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

function SQUARE_FLIP(sq) {
  return 254 - sq;
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

// ��ú�ڱ��(������8��������16)
function SIDE_TAG(sd) {
  return 8 + (sd << 3);
}

// ��öԷ���ڱ��
function OPP_SIDE_TAG(sd) {
  return 16 - (sd << 3);
}

// ��ȡ�߷������
function SRC(mv) {
  return mv & 255;
}

// ��ȡ�߷����յ�
function DST(mv) {
  return mv >> 8;
}

// ��һ���߷��������յ㣬ת��Ϊһ����������
function MOVE(sqSrc, sqDst) {
  return sqSrc + (sqDst << 8);
}

// sp������λ�ã�sd�����巽���췽0���ڷ�1�������ر����䣩��ǰ��һ����λ�á�
function SQUARE_FORWARD(sq, sd) {
  return sq - 16 + (sd << 5);
}

// У�齫��˧�����߷�
function KING_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 1;
}

// ����ʿ���ˣ����߷�
function ADVISOR_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 2;
}

// У�����ࣩ���߷�
function BISHOP_SPAN(sqSrc, sqDst) {
  return LEGAL_SPAN[sqDst - sqSrc + 256] == 3;
}

// ���۵�λ��
function BISHOP_PIN(sqSrc, sqDst) {
  return (sqSrc + sqDst) >> 1;
}

// �������߷��Ϸ����򷵻���Ӧ��ŵ�λ�á����򷵻�sqSrc��
function KNIGHT_PIN(sqSrc, sqDst) {
  return sqSrc + KNIGHT_PIN_[sqDst - sqSrc + 256];
}

// sp������λ�ã�sd�����巽���췽0���ڷ�1���������λ��δ���ӣ��򷵻�true�����򷵻�false��
function HOME_HALF(sq, sd) {
  return (sq & 0x80) != (sd << 7);
}

// sp������λ�ã�sd�����巽���췽0���ڷ�1���������λ���ѹ��ӣ��򷵻�true�����򷵻�false��
function AWAY_HALF(sq, sd) {
  return (sq & 0x80) == (sd << 7);
}

// ��������sqSrc���յ�sqDstû�й��ӣ��򷵻�true�����򷵻�false
function SAME_HALF(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0x80) == 0;
}

// ���sqSrc��sqDst��ͬһ���򷵻�true�����򷵻�false
function SAME_RANK(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0xf0) == 0;
}

// ���sqSrc��sqDst��ͬһ���򷵻�true�����򷵻�false
function SAME_FILE(sqSrc, sqDst) {
  return ((sqSrc ^ sqDst) & 0x0f) == 0;
}

function Position() {
  
}

// ��ʼ���������
Position.prototype.clearBoard = function() {
  this.sdPlayer = 0;	// ��˭���塣0-�췽��1-�ڷ�
  this.squares = [];	// �������һά�������
  for (var sq = 0; sq < 256; sq ++) {
    this.squares.push(0);
  }
}

Position.prototype.setIrrev = function() {
  this.mvList = [0];	// ���ÿ���߷�������
  this.pcList = [0];	// ���ÿ�����Ե����ӡ����û�����ӱ��ԣ���ŵ���0
  this.distance = 0;	// ���
}

// ��FEN��תΪһά���飬��ʼ�����
Position.prototype.fromFen = function(fen) {
  this.clearBoard();
  var y = RANK_TOP;
  var x = FILE_LEFT;
  var index = 0;
  if (index == fen.length) {
    this.setIrrev();
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
      this.setIrrev();
	  return;
    }
    c = fen.charAt(index);
  }
  index ++;
  if (index == fen.length) {
    this.setIrrev();
	return;
  }

  this.setIrrev();
}

// ������ֵ������߷�
Position.prototype.generateMoves = function() {
  var mvs = [];									// ���ڴ洢���кϷ����߷�
  var pcSelfSide = SIDE_TAG(this.sdPlayer);		// ������ڱ��(������8��������16)
  var pcOppSide = OPP_SIDE_TAG(this.sdPlayer);	// �Է���ڱ��(������16��������8)
  for (var sqSrc = 0; sqSrc < 256; sqSrc ++) {
    // �����������̵�256����
  
    var pcSrc = this.squares[sqSrc];		// ĳ��λ���ϵ�����
    if ((pcSrc & pcSelfSide) == 0) {		// ���ǶԷ����ӣ����߸�λ�ø���û������
	  continue;
    }
    switch (pcSrc - pcSelfSide) {
    case PIECE_KING:
      for (var i = 0; i < 4; i ++) {		// ����4������
        var sqDst = sqSrc + KING_DELTA[i];	// �õ�һ�����ܵ��յ�λ��
        if (!IN_FORT(sqDst)) {				// ��λ�ò�λ�ھŹ��У����Ϸ�
          continue;
        }
        var pcDst = this.squares[sqDst];	// ����յ�λ������
        if ((pcDst & pcSelfSide) == 0) {	// �յ�λ�õ����Ӳ��Ǳ������ӣ������յ����û������
          mvs.push(MOVE(sqSrc, sqDst));		// ����Ϸ������浽������
        }
      }
      break;
    case PIECE_ADVISOR:
      for (var i = 0; i < 4; i ++) {		// �˵�4������
        var sqDst = sqSrc + ADVISOR_DELTA[i];	// �õ�һ�����ܵ��յ�λ��
        if (!IN_FORT(sqDst)) {				// ��λ�ò�λ�ھŹ��У����Ϸ�
          continue;
        }
        var pcDst = this.squares[sqDst];	// ����յ�����
        if ((pcDst & pcSelfSide) == 0) {	// �յ�λ�õ����Ӳ��Ǳ������ӣ������յ����û������
          mvs.push(MOVE(sqSrc, sqDst));		// ����Ϸ������浽������
        }
      }
      break;
    case PIECE_BISHOP:
      for (var i = 0; i < 4; i ++) {		// ���4������
        var sqDst = sqSrc + ADVISOR_DELTA[i];	// ������۵�λ��
        if (!(IN_BOARD(sqDst) && HOME_HALF(sqDst, this.sdPlayer) &&
            this.squares[sqDst] == 0)) {	//	���۲��������ϣ���������λ���ѹ��ӣ��������۴�������
          continue;
        }
        sqDst += ADVISOR_DELTA[i];			// �õ�һ�����ܵ��յ�λ��
        var pcDst = this.squares[sqDst];	// �õ��յ�λ�õ�����
        if ((pcDst & pcSelfSide) == 0) {	// �յ�λ��û�б�������
          mvs.push(MOVE(sqSrc, sqDst));		// ����Ϸ������浽����
        }
      }
      break;
    case PIECE_KNIGHT:
      for (var i = 0; i < 4; i ++) {		// ���ȵ�4������
        var sqDst = sqSrc + KING_DELTA[i];	// �õ�һ�����ȵ�λ��
        if (this.squares[sqDst] > 0) {		// ����λ�ô�������
          continue;
        }
        for (var j = 0; j < 2; j ++) {		// 1�����ȶ�Ӧ2����ķ���
          sqDst = sqSrc + KNIGHT_DELTA[i][j];	// �õ�һ�����ܵ��յ�λ��
          if (!IN_BOARD(sqDst)) {			// ��λ�ò���������
            continue;
          }
          var pcDst = this.squares[sqDst];	// �õ��յ�λ�õ�����
          if ((pcDst & pcSelfSide) == 0) {	// �յ�λ�ò����ڱ�������
            mvs.push(MOVE(sqSrc, sqDst));
          }
        }
      }
      break;
    case PIECE_ROOK:
      for (var i = 0; i < 4; i ++) {
        var delta = KING_DELTA[i];	// �õ�һ������
        var sqDst = sqSrc + delta;	// �����sqSrc��ʼ�����ŷ���delta��һ��
        while (IN_BOARD(sqDst)) {	// �õ����յ�λ������
          var pcDst = this.squares[sqDst];
          if (pcDst == 0) {			// �յ�û�����ӣ��߷��Ϸ�
            mvs.push(MOVE(sqSrc, sqDst));
          } else {
            if ((pcDst & pcOppSide) != 0) {	// �յ��жԷ����ӣ��߷��Ϸ�
              mvs.push(MOVE(sqSrc, sqDst));
            }
            break;
          }
          sqDst += delta;			// ���ŷ���delta��ǰ��һ��
        }
      }
      break;
    case PIECE_CANNON:
      for (var i = 0; i < 4; i ++) {
        var delta = KING_DELTA[i];	// �õ�һ������
        var sqDst = sqSrc + delta;	// �����sqSrc��ʼ�����ŷ���delta��һ��
        while (IN_BOARD(sqDst)) {	// �õ����յ�λ������
          var pcDst = this.squares[sqDst];
          if (pcDst == 0) {			// �յ�û�����ӣ��߷��Ϸ�
            mvs.push(MOVE(sqSrc, sqDst));
          } else {
            // �յ�������ӣ�����Ҫ��ɽ
			break;
          }
          sqDst += delta;			// ���ŷ���delta��ǰ��һ��
        }
        sqDst += delta;				// ���ŷ���delta��ǰ��һ��
        while (IN_BOARD(sqDst)) {	// ���sqDst��λ�����̣���ô��ʱ���Ѿ���ɽ��
          var pcDst = this.squares[sqDst];
          if (pcDst > 0) {			// �ڷ�ɽ��������һ������
            if ((pcDst & pcOppSide) != 0) {	// �ڷ�ɽ����������һ���Է�����
              mvs.push(MOVE(sqSrc, sqDst));
            }
            break;					// �ڷ�ɽ�󣬲����������ǶԷ����ӣ����Ǽ������ӣ���Ҫ�����Ե�ǰ���������
          }
          sqDst += delta;
        }
      }
      break;
    case PIECE_PAWN:
      var sqDst = SQUARE_FORWARD(sqSrc, this.sdPlayer);	// �õ���ǰ��һ����λ��
      if (IN_BOARD(sqDst)) {							// ��λ����������
        var pcDst = this.squares[sqDst];
        if ((pcDst & pcSelfSide) == 0) {				// Ŀ��λ��û�б�������
          mvs.push(MOVE(sqSrc, sqDst));
        }
      }
      if (AWAY_HALF(sqSrc, this.sdPlayer)) {			// ������ѹ���
        for (var delta = -1; delta <= 1; delta += 2) {	// deltaֻ��ȡ-1��1����ֵ�����Ǳ���������������
          sqDst = sqSrc + delta;
          if (IN_BOARD(sqDst)) {						// ��λ����������
            var pcDst = this.squares[sqDst];
            if ((pcDst & pcSelfSide) == 0) {			// Ŀ��λ��û�б�������
              mvs.push(MOVE(sqSrc, sqDst));
            }
          }
        }
      }
      break;
    }
  }
  return mvs;
}

// �жϲ����Ƿ�Ϸ������򷵻�true�����򷵻�false
Position.prototype.legalMove = function(mv) {
  var sqSrc = SRC(mv);						// ��ȡ�߷������λ��
  var pcSrc = this.squares[sqSrc];			// ��ȡ���λ�õ�����
  var pcSelfSide = SIDE_TAG(this.sdPlayer);	// ��ڱ��(������8��������16) 
  
  if ((pcSrc & pcSelfSide) == 0) {
    // ���λ�õ����ӣ����Ǳ������ӡ����ǶԷ����ӣ����߸���û�����ӣ�
	return false;
  }

  var sqDst = DST(mv);				// ��ȡ�߷����յ�λ��
  var pcDst = this.squares[sqDst];	// ��ȡ�յ�λ�õ�����
  
  if ((pcDst & pcSelfSide) != 0) {
    // �յ�λ�������ӣ������Ǳ�������
	return false;
  }

  switch (pcSrc - pcSelfSide) {
  case PIECE_KING:		// ��������ǽ���˧����У���߷�
    return IN_FORT(sqDst) && KING_SPAN(sqSrc, sqDst);
  case PIECE_ADVISOR:	// ����������ˣ��ˣ���У���߷�
    return IN_FORT(sqDst) && ADVISOR_SPAN(sqSrc, sqDst);
  case PIECE_BISHOP:	// ������������ࣩ��У���߷�
    return SAME_HALF(sqSrc, sqDst) && BISHOP_SPAN(sqSrc, sqDst) &&
        this.squares[BISHOP_PIN(sqSrc, sqDst)] == 0;
  case PIECE_KNIGHT:	// �����������У���߷�
    var sqPin = KNIGHT_PIN(sqSrc, sqDst);
    return sqPin != sqSrc && this.squares[sqPin] == 0;
  case PIECE_ROOK:		// ��������ǳ���У���߷�
  case PIECE_CANNON:	// ����������ڣ�У���߷�
    var delta;			// ��ʶ���ĸ���������
    if (SAME_RANK(sqSrc, sqDst)) {
	  // �����յ�λ��ͬһ�С��ٸ��������յ�Ĵ�С��ϵ���жϾ��������ĸ��������塣
      delta = (sqDst < sqSrc ? -1 : 1);
    } else if (SAME_FILE(sqSrc, sqDst)) {
	  // �����յ�λ��ͬһ�С��ٸ��������յ�Ĵ�С��ϵ���жϾ��������ĸ��������塣
      delta = (sqDst < sqSrc ? -16 : 16);
    } else {
	  // �����յ㲻��ͬһ�У�Ҳ����ͬһ�С��߷��ǷǷ��ġ�
      return false;
    }
    var sqPin = sqSrc + delta;	// ���ŷ���delta��һ����
    while (sqPin != sqDst && this.squares[sqPin] == 0) {
      // �ط���deltaһ������ǰ�ߣ�ֱ���������ӣ�����sqPin�ߵ����յ��λ����
	  sqPin += delta;
    }
    if (sqPin == sqDst) {
	  // ����յ�û�����ӣ������ǳ������ڣ��ⲽ�嶼�ǺϷ��ġ�����ǳ��������յ���û�����ӣ��Է����ӣ����ⲽ�嶼�Ϸ���
      return pcDst == 0 || pcSrc - pcSelfSide == PIECE_ROOK;
    }
	// ��ʱ�Ѿ���ɽ���յ���������ӣ�������������ڣ������ⲽ�岻�Ϸ�
    if (pcDst == 0 || pcSrc - pcSelfSide != PIECE_CANNON) {
      return false;
    }
    sqPin += delta;
    while (sqPin != sqDst && this.squares[sqPin] == 0) {
      sqPin += delta;
    }
    return sqPin == sqDst;
  case PIECE_PAWN:
    // ���ѹ��ӣ��������������������ߵ�
    if (AWAY_HALF(sqDst, this.sdPlayer) && (sqDst == sqSrc - 1 || sqDst == sqSrc + 1)) {
      return true;
    }
	// �жϱ��ǲ�������ǰ��
    return sqDst == SQUARE_FORWARD(sqSrc, this.sdPlayer);
  default:
    return false;
  }
}

// �л����巽
Position.prototype.changeSide = function() {
  this.sdPlayer = 1 - this.sdPlayer;
}

// ��һ����
Position.prototype.makeMove = function(mv) {
  this.movePiece(mv);	// �ƶ�����
  this.changeSide();	// �л����巽
  this.distance ++;		// ������+1
  return true;
}

// ������һ��������
Position.prototype.undoMakeMove = function() {
  this.distance --;		// �����ȼ�1
  this.changeSide();	// �л����巽
  this.undoMovePiece();	// ȡ����һ��������
}

// �����߷��ƶ����ӣ�ɾ���յ�λ�õ����ӣ������λ�õ����ӷ������յ��λ�á�
Position.prototype.movePiece = function(mv) {
  var sqSrc = SRC(mv);			// ���λ��
  var sqDst = DST(mv);			// �յ�λ��
  var pc = this.squares[sqDst];	// �յ�λ�õ�����
  this.pcList.push(pc);			// ���յ�λ�õ����ӣ���������б�
  if (pc > 0) {
    // �յ������ӣ���Ҫɾ��������
    this.addPiece(sqDst, pc, DEL_PIECE);
  }
  pc = this.squares[sqSrc];
  this.addPiece(sqSrc, pc, DEL_PIECE);	// ɾ���������
  this.addPiece(sqDst, pc, ADD_PIECE);	// ��ԭ������������ӵ��յ�
  this.mvList.push(mv);					// ���߷������߷��б�
}

// ȡ����һ�������ӵ��ƶ�
Position.prototype.undoMovePiece = function() {
  var mv = this.mvList.pop();
  var sqSrc = SRC(mv);
  var sqDst = DST(mv);
  var pc = this.squares[sqDst];
  this.addPiece(sqDst, pc, DEL_PIECE);	// ɾ���յ�����
  this.addPiece(sqSrc, pc, ADD_PIECE);	// ���յ�λ�õ�������ӵ����
  pc = this.pcList.pop();
  if (pc > 0) {
    // �ⲽ�巢���˳��ӣ���Ҫ�ѳԵ������ӷŻ��յ�λ��
    this.addPiece(sqDst, pc, ADD_PIECE);
  }
}

// ���bDelΪfalse��������pc��ӽ�����е�spλ�ã����bDelΪtrue����ɾ��spλ�õ����ӡ�
Position.prototype.addPiece = function(sq, pc, bDel) {
  var pcAdjust;
  this.squares[sq] = bDel ? 0 : pc;
}