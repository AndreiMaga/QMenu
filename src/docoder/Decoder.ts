export interface IResult {
  restaurantID: string
  menuID: string
}

export class Decoder {
  /**
   * Decode the string
   */
  public decode(encoded: string): IResult | undefined {
    if (encoded.length != 84) {
      throw new Error('The QR is invalid, please inform your waiter.')
    }

    let restaurant = encoded.slice(0, 64)

    let menu = encoded.slice(64, 80)

    let checksum = encoded.slice(80, 84)

    if (checksum !== this.checksum(restaurant, menu)) {
      // failed checksum

      return undefined
    }

    return {restaurantID: restaurant, menuID: menu}
  }

  byteSize(str: string) {
    return new Blob([str]).size
  }

  private checksum(restaurant_id: string, menu_id: string) {
    return this.hash(`${restaurant_id}${menu_id}`).toString(16).slice(0, 4)
  }

  private hash(str: string): number {
    var hash = 0

    if (str.length == 0) return hash

    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }

    return hash
  }

  public encode() {
    console.log(
      this.hash(
        '21c8be32b8c560d7f42bf0589ad3a47a9cd39753068a916ddeb2c0239fe9ee33' +
          '648a78f9e2f6d1c9'
      )
        .toString(16)
        .slice(0, 4)
    )
  }
}

export const decoder = new Decoder()
