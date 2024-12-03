import program from "../Model/Programs/Program.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createProgram = async (req, res, next) => {
  // verifyToken(req, res, async () => {
    try {
  //     if (req.user.isAdmin) {
        // استخراج البيانات من الطلب
        const {
          programName,
          programCategory,
          description,
          KeyFeatures,
          useCase,
          MinimumRequirements,
          MaximumRequirements,
          Installation,
        } = req.body;
    
        // التحقق من وجود الملفات المطلوبة (الصورة والملف)
        const newFiles = req.files;
// console.log(newFiles);
        // إنشاء كائن جديد للبرنامج
        const newProgram = new program({
          programName,
          programCategory,
          description,
          programImage: newFiles[0].originalname, // اسم الصورة
          programFile: newFiles[1].originalname,
	  size :newFiles[1].size, // اسم الملف
          KeyFeatures: {
            precisionDrafting: KeyFeatures?.precisionDrafting,
            modelingVisualization: KeyFeatures?.modelingVisualization,
            extensiveLibraries: KeyFeatures?.extensiveLibraries,
            collaboration: KeyFeatures?.collaboration,
            customAutomation: KeyFeatures?.customAutomation,
            integration: KeyFeatures?.integration,
          },
          useCase,
          MinimumRequirements: {
            minOperatingSystem: MinimumRequirements?.minOperatingSystem,
            minProcessor: MinimumRequirements?.minProcessor,
            minRAM: MinimumRequirements?.minRAM,
            minGPU: MinimumRequirements?.minGPU,
            minStorage: MinimumRequirements?.minStorage,
            minDisplay: MinimumRequirements?.minDisplay,
          },
          MaximumRequirements: {
            maxOperatingSystem: MaximumRequirements?.maxOperatingSystem,
            maxProcessor: MaximumRequirements?.maxProcessor,
            maxRAM: MaximumRequirements?.maxRAM,
            maxGPU: MaximumRequirements?.maxGPU,
            maxStorage: MaximumRequirements?.maxStorage,
            maxDisplay: MaximumRequirements?.maxDisplay,
          },
          Installation,
        });
    
        await newProgram.save();
    
        res.status(200).json({ message: "New program created successfully." });
  //     } else {
  //       return next(
  //         new ApiError("You are not Admin to us e this Feature", 404)
  //       );
  //     }
    } catch (error) {
      return next(new ApiError(`Error in Creation ${error}`, 400));
    }
  // });
};


/////////////////////
export const getAllPrograms = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const programs = await program.find();
        res.status(200).json(programs); 
      } else {
        return next(
          new ApiError('You are not authorized to use this feature', 404)
        );
      }
    });
  } catch (error) {
    return next(new ApiError('Error in Get', 400));
  }
};

export const getProgramByCategory = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const category = req.query.category;
        const programs = await program.find({ programCategory: category });
        for (var i = 0; i < programs.length; i++) {
          await program.findByIdAndUpdate(
            programs[i]._id,
            { $set: { views: programs[i].views + 1 } },
            { new: true }
          );
        }
        res.status(200).json({ Programs: programs });
      } else {
        return next(
          new ApiError("You are not Authentcator to use this Feature", 404)
        );
      }
    } catch (error) {
      return next(new ApiError(`Error in Get ${error}`, 400));
    }
  });
};
export const getOneProgram = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const id = req.params.id;
        const Program = await program.findById(id);
        await program.findByIdAndUpdate(
          Program._id,
          { $set: { views: Program.views + 1 } },
          { new: true }
        );
        res.status(200).json({ Program: Program });
      } else {
        return next(
          new ApiError("You are not Authentcator to use this Feature", 404)
        );
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};
export const updatePrograms = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const programId = req.params.programId;

    // استخراج البيانات من الطلب
    const {
      programName,
      programCategory,
      description,
      KeyFeatures,
      useCase,
      MinimumRequirements,
      MaximumRequirements,
      Installation,
    } = req.body;

    // التحقق من وجود ملفات مرفقة (مثل الصور أو الملفات)
   // const updatedFiles = req.files;

    // بناء الكائن الذي يحتوي على الحقول المحدثة
    const updateFields = {
      ...(programName && { programName }),
      ...(programCategory && { programCategory }),
      ...(description && { description }),
     // ...(updatedFiles?.[0] && { programImage: updatedFiles[0].originalname }),
      // ...(updatedFiles?.[1] && { programFile: updatedFiles[1].originalname }),
      ...(KeyFeatures && {
        "KeyFeatures.precisionDrafting": KeyFeatures.precisionDrafting,
        "KeyFeatures.modelingVisualization": KeyFeatures.modelingVisualization,
        "KeyFeatures.extensiveLibraries": KeyFeatures.extensiveLibraries,
        "KeyFeatures.collaboration": KeyFeatures.collaboration,
        "KeyFeatures.customAutomation": KeyFeatures.customAutomation,
        "KeyFeatures.integration": KeyFeatures.integration,
      }),
      ...(useCase && { useCase }),
      ...(MinimumRequirements && {
        "MinimumRequirements.minOperatingSystem":
          MinimumRequirements.minOperatingSystem,
        "MinimumRequirements.minProcessor": MinimumRequirements.minProcessor,
        "MinimumRequirements.minRAM": MinimumRequirements.minRAM,
        "MinimumRequirements.minGPU": MinimumRequirements.minGPU,
        "MinimumRequirements.minStorage": MinimumRequirements.minStorage,
        "MinimumRequirements.minDisplay": MinimumRequirements.minDisplay,
      }),
      ...(MaximumRequirements && {
        "MaximumRequirements.maxOperatingSystem":
          MaximumRequirements.maxOperatingSystem,
        "MaximumRequirements.maxProcessor": MaximumRequirements.maxProcessor,
        "MaximumRequirements.maxRAM": MaximumRequirements.maxRAM,
        "MaximumRequirements.maxGPU": MaximumRequirements.maxGPU,
        "MaximumRequirements.maxStorage": MaximumRequirements.maxStorage,
        "MaximumRequirements.maxDisplay": MaximumRequirements.maxDisplay,
      }),
      ...(Installation && { Installation }),
    };

console.log(updateFields);

    // تحديث البرنامج باستخدام `findByIdAndUpdate`
    const ProgramUpdated = await program.findByIdAndUpdate(
      programId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    // التحقق إذا كان البرنامج موجودًا
    if (!ProgramUpdated) {
      return res.status(404).json({ message: "Program not found." });
    }

    res.status(200).json({
      message: "Program updated successfully.",
      ProgramUpdated,
    });
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteProgram = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const programId = req.params.programId;
        await program.findByIdAndDelete({ _id: programId });
        res.status(200).json({ message: "program is Deleted" });
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const Likes = async (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      if (req.user) {
        const programId = req.params.id;
        const programs = await program.findById(programId);
        const updateLike = await program.findByIdAndUpdate(
          programId,
          { likes: programs.likes + 1 },
          { new: true }
        );
        res.status(200).json({
          message: "Likes is Updated",
          programs: updateLike,
        });
      } else {
        new ApiError("You are not Authentcator to use this Feature", 404);
      }
    } catch (error) {
      return next(new ApiError("Error in Like Try Again Later", 400));
    }
  });
};

export const numberOfDownloads = async(req , res , next)=>{
  try{
    const id = req.params.id ;
    const Program = await program.findById(id) ;
    const updateDownload = await program.findByIdAndUpdate(id , {downloads : Program.downloads + 1} , {new : true}) ;
    res.status(200).json({message : "Downloads is Updated" , Program : updateDownload})
  }catch(error){  
    return next(new ApiError("Error in Download", 400));
  }
}