const _value = new WeakMap()
const _column = new WeakMap()

class Cell {
  constructor (value, column) {
    this.value = value
    _column.set(this, column)
  }

  set value (val) {
    _value.set(this, val)
  }

  get value () {
    let cellValue = _value.get(this)
    let column = _column.get(this);
    if (column.transform !== undefined) {
      cellValue = column.transform.call(column, cellValue)
    }
    if (typeof cellValue === 'function') cellValue = cellValue.call(column)
    if (cellValue === undefined) {
      cellValue = ''
    } else {
      cellValue = String(cellValue)
    }
    return cellValue
  }
}

export default Cell
