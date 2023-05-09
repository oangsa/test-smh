export default function arrayRemove(arr: any[], value: any, pushVal=null) {
    if (pushVal !== null) arr.push(pushVal)
    return arr.filter(function(geeks: any){
        return geeks != value;
    });
  
}