/*模糊查询*/
export function selectLike(str) {
    return str!=undefined && str!="" ? "*"+str+"*":undefined;
}