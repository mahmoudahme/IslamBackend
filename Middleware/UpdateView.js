export const Views = async (arr , model)=>{
  for(var i = 0 ; i < arr.length ; i++){
      await model.findByIdAndUpdate( 
        arr[i].id ,
        {Views : arr[i].Views+1},
        {new : true}
      )   
  }
  return arr ;
}