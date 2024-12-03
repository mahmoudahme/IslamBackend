import Program from "../Model/Programs/Program.js";
import SavedItem from "../Model/SavedItem.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createSaveItem = async(req , res , next )=>{
  verifyToken(req , res ,  async()=>{
    try{
      if(req.user){
        const programId = req.params.programId;
        const program = await Program.findById(programId);
        await Program.findByIdAndUpdate(program._id ,{ saved : program.saved+1} ,{new : true}  );
        const savedItem = new SavedItem({
          userId : req.user.id ,
          programId : programId ,
        })
        await savedItem.save() ;
        res.status(200).json({message : "This Program is Save in Your Favourites"})
      }else{
        return next(new ApiError("You Are Not Authorized" , 401))
      }
    }catch(error){
      return next(new ApiError(`Error in Create SaveItem ${error}` , 400 ))
    }
  })
}
export const getMySaveItem = async(req , res , next )=>{
  verifyToken(req , res ,  async()=>{
    try{
      if(req.user){
        const savedItems = await SavedItem.find({userId : req.user.id}).populate({ path: "programId" });
        res.status(200).json({savedItems : savedItems})
      }else{
        return next(new ApiError("You Are Not Authorized" , 401))
      }
    }catch(error){
      return next(new ApiError(`Error in Getting SaveItem ${error}` , 400 ))
    }
  })
}

export const deleteOneFromSavedItem = async(req , res , next )=>{
  try {
    const id = req.params.id ;
    await SavedItem.findByIdAndDelete(id);
    res.status(200).json({message : "This Item is Delete from Your Favourites"})
  } catch (error) {
    return next(new ApiError(`Server error${error}` , 500))
  }
}
