/* tslint:disable */
class HashUtil {
    hashCode(strKey) {
        let hash = 0
        if (strKey) {
            for (let i = 0; i < strKey.length; i++) {
                hash = hash * 31 + strKey.charCodeAt(i)
                hash = hash & 0xFFFFFFFFF
            }
        }
        return hash + 0xFFFFFFFFF
    }
}

export const hash = new HashUtil()