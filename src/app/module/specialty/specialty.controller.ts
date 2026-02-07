import { NextFunction, Request, RequestHandler, Response } from "express";
import { SpecialtyService } from "./specialty.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const specialty = await SpecialtyService.createSpecialty(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: specialty,
  });
});

const getAllSpecialties = async (req: Request, res: Response) => {
  try {
    const specialties = await SpecialtyService.getAllSpecialties();
    res.status(200).json({
      success: true,
      data: specialties,
      message: "Specialties retrieved successfully",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve specialties",
      error: error.message,
    });
  }
};

const deleteSpecialty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await SpecialtyService.deleteSpecialty(id as string);
    res.status(200).json({
      success: true,
      message: "Specialty deleted successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete specialty",
      error: error.message,
    });
  }
};

const updateSpecialty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await SpecialtyService.updateSpecialty(
      id as string,
      payload,
    );
    res.status(200).json({
      success: true,
      message: "Specialty updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update specialty",
      error: error.message,
    });
  }
};

export const SpecialtyController = {
  createSpecialty,
  deleteSpecialty,
  getAllSpecialties,
  updateSpecialty,
};
