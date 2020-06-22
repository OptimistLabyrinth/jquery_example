function SortStringArrayWithCustomComparison() {
  var A = [
    'AAA', 'aaa',
    'AAa', 'AaA', 'aAA',
    'Aaa', 'aAa', 'aaA',
    'A**', 'a**', 'a가가', 'A나나',
    '111', '222',
    '가가', '나나'
  ];

  A.sort(BasicStringSorting);
  var tmp = JSON.parse(JSON.stringify(A));
  console.log(tmp);
  A.sort(CustomStringCompare);
  var tmp = JSON.parse(JSON.stringify(A));
  console.log(tmp);

  function BasicStringSorting(a, b) {
    if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
  }

  function CustomStringCompare(a, b) {
    var i = 0;
    if (a.length === b.length) {
      const len = a.length;
      var aPrio = 0;
      var bPrio = 0;
      for (; i < len; ++i) {
        if (a[i] === b[i]) continue;
        aPrio = CustomPriorityForChar(a[i]);
        bPrio = CustomPriorityForChar(b[i]);
        if (aPrio < bPrio) return -1;
        else if (aPrio > bPrio) return 1;
        else {
          if (a[i] < b[i]) return -1;
          else return 1;
        }
      }
      return 0;
    } else {
      const len = Math.min(a.length, b.length);
      var aPrio = 0;
      var bPrio = 0;
      for (; i < len; ++i) {
        if (a[i] === b[i]) continue;
        aPrio = CustomPriorityForChar(a[i]);
        bPrio = CustomPriorityForChar(b[i]);
        if (aPrio < bPrio) return -1;
        else if (aPrio > bPrio) return 1;
        else {
          if (a[i] < b[i]) return -1;
          else return 1;
        }
      }
      if (a.length < b.length) return -1;
      else return 1;
    }
  }

  function CustomPriorityForChar(x) {
    var pattern_number = /[0-9]/;
    var pattern_alphabet_lower = /[a-z]/;
    var pattern_alphabet_upper = /[A-Z]/;
    var pattern_hangul = /[ㄱ-ㅎㅏ-ㅣ가-힇]/;
    if (x.match(pattern_number)) {
      return 0;
    } else if (x.match(pattern_alphabet_lower)) {
      return 1;
    } else if (x.match(pattern_alphabet_upper)) {
      return 2;
    } else if (x.match(pattern_hangul)) {
      return 3;
    }
    return 4;
  }
}
