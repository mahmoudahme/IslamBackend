import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
  },
  programCategory: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
 programImage: {
    type: String,
    required: true,
 },
 programFile: {
    type: String,
    required: true,
 },
size : {
	type : Number 
} ,
  KeyFeatures: {
    precisionDrafting: { type: String, required: true }, 
    modelingVisualization: { type: String, required: true} ,
    extensiveLibraries: { type: String, required: true},
    collaboration: { type: String, required: true},
    customAutomation: { type: String, required: true},
    integration: { type: String, required: true}
  },
  KeyFeatures: {
    precisionDrafting: { type: String, required: true }, 
    modelingVisualization: { type: String, required: true} ,
    extensiveLibraries: { type: String, required: true},
    collaboration: { type: String, required: true},
    customAutomation: { type: String, required: true},
    integration: { type: String, required: true}
  },
  useCase : {
    type:[String] ,
    required: true 
  },
  MinimumRequirements: {
    minOperatingSystem: { type: String, required: true }, 
    minProcessor : { type: String, required: true},
    minRAM: { type: String, required: true }, 
    minGPU : { type: String, required: true},
    minStorage: { type: String, required: true }, 
    minDisplay : { type: String, required: true},
  },
  MaximumRequirements: {
    maxOperatingSystem: { type: String, required: true }, 
    maxProcessor : { type: String, required: true},
    maxRAM: { type: String, required: true }, 
    maxGPU : { type: String, required: true},
    maxStorage: { type: String, required: true }, 
    maxDisplay : { type: String, required: true},
  },
  Installation : {
     type: [String], 
     required: true 
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0, 
  },
  saved : {
    type : Number , 
    default : 0 ,
  },
  downloads : {
    type : Number , 
    default : 0 ,
  }
} ,{timestamps : true }) ;

export default mongoose.model("programs", programSchema);
