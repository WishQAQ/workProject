/**
 * Created by liulingli on 2017/6/14.
 * desc 提供公共方法
 */

/*
 * @desc 克隆对象
 * @param {obj} obj 数组
 * @return obj
 * */
export function clone(obj) {
  //Object.assign只可以实现浅拷贝
  // let aa = {a:1,b:2}
  //let bb = Object.assign({},aa);
  //bb.a = '10'
  // Handle the 3 simple types, and null or undefined
  if (null === obj || "object" !== typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    let copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    let copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    let copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

/*
 * @desc 获取数组中的最大值和最小值
 * @param {Array} arr 数组
 * @param {Function} fun 获取数组中的数字
 * @return {max,min}
 * */
export function getMaxAndMin(arr, fun) {
  if (arr instanceof Array) {
    let max = 0;
    let min = 0;
    for (let i = 0; i < arr.length; i++) {
      let value = fun(arr[i]);
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    }
    return {
      max: max,
      min: min,
    }
  }
  throw new Error(arr + "不是一个数组");
}
/*
 * @desc 获取数组排序，采用快速排序
 * @param {Array} arr 数组
 * @param {Function} fun 获取数组中的数字
 * @param {Number} type 排序方式，1为升序，0为降序,默认升序
 * @return {max,min}
 * */
export function arraySort(arr, fun, type1) {
  if (arr instanceof Array) {
    let type = type1 === undefined ? 1 : type1;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        let before = fun(arr[j]);
        let after = fun(arr[j + 1]);
        if (type === 1) { //升序
          if (before > after) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        } else { //降序
          if (before < after) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        }
      }
    }
    return arr;
  }
  throw new Error(arr + "不是一个数组");
}
/*
 * @desc 获取元素的left和top
 * @param {Element} e为htmlElement对象
 * @param {Element} parent为父元素,如果未传值，则默认为顶层window
 * @return {left,top}
 * */
export function getOffset(e, parent) {
  let x = e.offsetLeft;
  let y = e.offsetTop;
  if (!parent) parent = document.body;
  if (parent) {
    while (e = e.offsetParent) {
      if (e !== parent) {
        x += e.offsetLeft;
        y += e.offsetTop;
      }
    }
  }
  return {"left": x, "top": y};
}

/*
 * @desc 判断元素是否是htmlElement对象
 * @param {obj}
 * @return {Boolean}
 * */
export function isHtmlElement(obj) {
  let d = document.createElement("div");
  try {
    d.appendChild(obj.cloneNode(true));
    return obj.nodeType === 1;
  } catch (e) {
    return obj === window || obj === document;
  }
}

/*
 * @desc 判断对象是否相等
 * @param {obj}
 * @param {obj}
 * @return {Boolean}
 * */
export function compareObj(objA, objB) {
  function isObj(object) {
    return object && typeof (object) === 'object' && Object.prototype.toString.call(object).toLowerCase() === "[object object]";
  }

  function isArray(object) {
    return object && typeof (object) === 'object' && object.constructor === Array;
  }

  function getLength(object) {
    let count = 0;
    for (let i in object) count++;
    return count;
  }

  function CompareObj(objA, objB, flag) {
    for (let key in objA) {
      if (!flag) //跳出整个循环
        break;
      if (!objB.hasOwnProperty(key)) {
        flag = false;
        break;
      }
      if (!isArray(objA[key])) { //子级不是数组时,比较属性值
        if (objB[key] !== objA[key]) {
          flag = false;
          break;
        }
      } else {
        if (!isArray(objB[key])) {
          flag = false;
          break;
        }
        let oA = objA[key], oB = objB[key];
        if (oA.length !== oB.length) {
          flag = false;
          break;
        }
        for (let k in oA) {
          if (!flag) //这里跳出循环是为了不让递归继续
            break;
          flag = CompareObj(oA[k], oB[k], flag);
        }
      }
    }
    return flag;
  }

  if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
  if (getLength(objA) !== getLength(objB)) return false; //判断长度是否一致
  return CompareObj(objA, objB, true);//默认为true
}