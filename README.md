计算器：
calculator.html : 界面
calculator.js : 计算器逻辑

思路：
首先将screen中的字符串传入calculator函数中，进行判断是否为算式；接下来把算式中的数字和运算符分别放进numStack栈和oprStack栈中；接下来每次从oprStack的后面弹出一个运算符，跟当前oprStack中的运算符进行判断(判断条件遵循下表)，如果大于则从numStack后面弹出两个数，进行运算；如果小于，则把该运算符压进temOprStack中，同时把numStack最后一个数弹出，压进temNumStack中。下一次取运算符时，则先判断之前是否进行过运算，如果有则从temOprStack中取值（如果temOprStack为空，则从oprStack最后弹出），没有则从oprStack最后弹出，取数字方法同上。重复以上过程直到oprStack和temOprStack为空（即无法取到运算符）。


运算符判断条件表：
  + - * /
+ > > < <
- > > < <
* > > > >
/ > > > >