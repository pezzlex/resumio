const express = require('express')
const router = express.Router()
const { Resume } = require('../helpers/db')

const getAll = async ({ userId }) => {
  return await Resume.find({
    createdBy: userId,
  })
}

const getById = async (id) => {
  return await Resume.findById(id)
}

const create = async (resumeParam) => {
  if (
    await Resume.findOne({
      $and: [
        {
          fileName: resumeParam.fileName,
        },
        {
          createdBy: resumeParam.createdBy,
        },
      ],
    })
  ) {
    throw 'File name "' + resumeParam.fileName + '" is already taken'
  }
  let resume = new Resume(resumeParam)
  return await resume.save()
}

const update = async (id, resumeParam) => {
  return await Resume.findByIdAndUpdate(id, resumeParam, { new: true })
}

const _delete = async (id) => {
  return await Resume.findByIdAndDelete(id)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}
