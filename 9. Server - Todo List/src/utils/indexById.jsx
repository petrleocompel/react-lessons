export default function indexById(arr, id, attrName = 'id') {
    if (arr == null) {
        return null;
    }
    const leng = arr.length;
    for (let a = 0; a < leng; a++) {
        if (arr[a][attrName] == id) {
            return a;
        }
    }
    return null;
}
