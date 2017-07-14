# take-me-to-church-encoding

Live multi-REPL thing here: https://dfreeman.github.io/take-me-to-church-encoding

- <kbd>Shift</kbd>+<kbd>Enter</kbd> to add a fresh editor
- <kbd>Backspace</kbd> in an empty editor to clear it

### Cheat Sheet

```js
// Identity
let ID = tag`ID`
  (x => x)
```

```js
// Booleans
let If = (bool, yes, no) =>
  bool(yes, no)

let True = tag`True`
  ((yes, no) => yes)

let False = tag`False`
  ((yes, no) => no)

let And = (a, b) =>
  a(b(True, False), False)

let Or = (a, b) =>
  a(True, b(True, False))

let Not = (a) =>
  a(False, True)
```

```js
// Numbers
let Zero = tag`Zero`
  ((f, zero) => zero)
let Succ = (n) => tag`Succ(${n})`
  ((f, zero) => f(n(f, zero)))

let One = Succ(Zero)
let Two = Succ(One)

let IsEven = (n) => n(Not, True)
let IsOdd = (n) => n(Not, False)

let Plus = (x, y) => x(Succ, y)
let Times = (x, y) => x(n => Plus(n, y), Zero)
```

```js
// Pairs
let Pair = (left, right) => tag`Pair(${left}, ${right})`
  (f => f(left, right))

let Left = (pair) =>
  pair((left, right) => left)

let Right = (pair) =>
  pair((left, right) => right)
```

```js
// Subtraction
let Pred = (n) => Right(n(
  (p) => Pair(Succ(Left(p)), Left(p)),
  Pair(Zero, Zero)
))

let Minus = (x, y) => y(Pred, x)
```

```js
// Lists
let Nil = tag`Nil`
  ((f, nil) => nil)
let Cons = (item, list) => tag`${item}::${list}`
  ((f, nil) => f(item, list(f, nil)));

let Map = (f, list) =>
  list((item, acc) => Cons(f(item), acc), Nil)
let IsEmpty = (list) =>
  list((item, acc) => False, True)
let Length = (list) =>
  list((item, acc) => Succ(acc), Zero)

let Head = (list) =>
  list((item, acc) => item, 'irrelevant')
let Tail = (list) =>
  Right(list(
    (item, acc) => Pair(Cons(item, Left(acc)), Left(acc)),
    Pair(Nil, Nil)))
```
