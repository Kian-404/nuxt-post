import Mock from 'mockjs'

Mock.mock(/\/api\/test/, {
  'list|1-10': [
    {
      "id|+1": 1,
      email: "@EMAIL"
    }
  ]
})

Mock.mock(/\/api\/postlist/, {
  'list|10': [
    {
      "id|+1": 1,
      title: "@ctitle(5, 10)",
      desc: '@cparagraph()',
      pic: Mock.Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
      createTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
      email: "@EMAIL"
    }
  ]
})

Mock.mock(/\/api\/postdetail/, {
  'detail':
  {
    "id|+1": 1,
    title: "@ctitle(5, 10)",
    desc: '@cparagraph()',
    content: `@[toc](目录)
## Function.prototype.call()

**语法**

> fun.call(thisArg, arg1, arg2, ...)

**参数**

 - **thisArg**

> 在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于non-strict  mode，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
> arg1, arg2, ... 指定的参数列表。

 - **返回值**

> 使用调用者提供的this值和参数调用该函数的返回值。若该方法没有返回值，则返回undefined。

---

## Function.prototype.apply()

**语法**

> func.apply(thisArg, [argsArray])

**参数**

 - **thisArg**

> 可选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。 
> argsArray 可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

**返回值**

> 调用有指定this值和参数的函数的结果。
---

## Function.prototype.bind()

**语法**

> function.bind(thisArg[, arg1[, arg2[, ...]]])

**参数**

 - **thisArg**

> 调用绑定函数时作为this参数传递给目标函数的值。
> 如果使用new运算符构造绑定函数，则忽略该值。当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。
> arg1, arg2, ... 当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。

**返回值**
     

>  返回一个原函数的拷贝，并拥有指定的this值和初始参数。
---
模拟实现如下:

\`\`\`javascript

Function.prototype.mycall = function (context) {
  var context = context || window;
  // 给context添加一个属性
  context.fn = this;
  // 获取参数
  var args = [...arguments].slice(1);
  // 执行该函数
  var result = context.fn(...args);
  // 删除fn	
  delete context.fn;
  // 返回执行结果
  return result;
}

Function.prototype.myapply = function (context) {
  var context = context || window;

  context.fn = this;

  var result = null;

  if (arguments[1]) {

    result = context.fn(...arguments);

  } else {

    result = context.fn();

  }

  delete context.fn;

  return result;
}

Function.prototype.mybind = function (context) {
  if (typeof this !== 'function') {

    throw new TypeError('Error');

  }

  var _this = this;

  var args = [...arguments].slice(1);

  return function F() {

    if (this instanceof F) {

      return new _this(...args, ...arguments);

    }

    return _this.apply(context, args.concat(...arguments));

  }
}
\`\`\`
    
`,
    pic: Mock.Random.image('200x100', '#50B347', '#FFF', 'Mock.js'),
    createTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
    email: "@EMAIL"
  }
})