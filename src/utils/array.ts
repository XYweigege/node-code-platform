/**
 * 数组移动方法
 * @param arr
 * @param from
 * @param to
 */

/**
 * 将数组中索引 `from` 的元素移动到索引 `to`，返回新的数组副本（不修改原数组）。
 *
 * 细节：
 * - 函数不会修改传入的 `arr`，而是返回一个新的数组副本。
 * - 如果 `to` 为负数，则从数组末尾开始倒数计算目标位置（等同于 Python 的负索引语义）。
 * - 使用 `splice` 做插入与删除操作，从而在目标位置插入被移动的元素。
 *
 * 示例：
 * ```ts
 * arrayMove([0,1,2,3], 1, 3) // => [0,2,3,1]
 * arrayMove([0,1,2,3], 3, -1) // => [0,1,2,3] (将索引 3 移动到倒数第1个，即末尾)
 * ```
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的原始索引
 * @param to 目标索引，支持负数从末尾计数
 * @returns 新的数组副本，元素已从 `from` 移动到 `to`
 */
export const arrayMove = <T>(arr: T[], from: number, to: number) => {
    // const newArr = arr.slice()

    // newArr.splice(to < 0 ? newArr.length + to : to, 0, newArr.splice(from, 1)[0])

    // return newArr
    const newArr = arr.slice()
    const item = newArr.splice(from, 1)[0] // 移除并取出元素
    const toIndex = to < 0 ? newArr.length + to : to
    newArr.splice(toIndex, 0, item) // 在目标位置插入
    return newArr
}
