import Message from "../Model/Messages/Message.js";
import { ApiError } from "../Utils/apiError.js";

export const sendMessage = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = req.user.id;
    const message = req.body.message;
    const MessageDoc = await Message.findOne({ userId: user });
    if (MessageDoc) {
      MessageDoc.message.push({
        message: message,
        isAdmin: false,
      });

      await MessageDoc.save();
      res.status(201).json({ message: "Message sent successfully" });
    } else {
      const newMessage = new Message({
        userId: req.user.id,
        message: [
          {
            message: message,
            isAdmin: false,
          },
        ],
      });
      await newMessage.save();
      res.status(201).json({ message: "Message sent successfully" });
    }
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const replyMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    const { message } = req.body;
    const messageDoc = await Message.findById(messageId);
    messageDoc.message.push({
      message: message,
      isAdmin: true,
    });
    await messageDoc.save();

    res
      .status(201)
      .json({ message: "Message replied successfully", messageDoc });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getAllmessages = async (req, res, next) => {
  try {
    const allMessages = await Message.find().populate({
      path: "userId"
    });
    res.status(200).json({ Messages: allMessages });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};

export const getOnemessages = async (req, res, next) => {
  try {
    const message = await Message.findOne({userId : req.user.id}).populate({
      path: "userId",
      select: "-_id ",
    });
    res.status(200).json({ Message: message });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};


export const getOnemessagesFroAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await Message.findById(id).populate({
      path: "userId",
      select: "-_id ",
    });
    res.status(200).json({ Message: message });
  } catch (error) {
    return next(new ApiError(`Server Error ${error}`, 500));
  }
};
