import stringWidth from 'string-width'

/**
 * @module padding
 */

class Padding {
  constructor (padding) {
    this.left = padding.left
    this.right = padding.right
  }

  length () {
    return stringWidth(this.left) + stringWidth(this.right)
  }
}

export default Padding
