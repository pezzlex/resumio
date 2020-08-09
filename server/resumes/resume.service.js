const express = require('express')
const router = express.Router()
const { Resume } = require('../helpers/db')
const Joi = require('joi')

const schema = Joi.object()
  .keys({
    fileName: Joi.string().trim(),
    contact: Joi.object().keys({
      firstName: Joi.string().trim(),
      lastName: Joi.string().trim(),
      email: Joi.string().trim().email(),
      phone: Joi.string().trim(),
      links: Joi.array().items(Joi.string().trim()),
    }),
    education: Joi.object().keys({
      headerName: Joi.string().trim(),
      content: Joi.array().items(
        Joi.object().keys({
          collegeName: Joi.string().trim(),
          summary: Joi.string().trim(),
        })
      ),
    }),
    workExperience: Joi.object().keys({
      headerName: Joi.string().trim(),
      content: Joi.array().items(
        Joi.object().keys({
          companyName: Joi.string().trim(),
          summary: Joi.string().trim(),
          description: Joi.array().items(Joi.string().trim()),
        })
      ),
    }),
    projects: {
      headerName: Joi.string().trim(),
      content: Joi.array().items(
        Joi.object().keys({
          title: Joi.string().trim(),
          link: Joi.string().trim().uri(),
          summary: Joi.string().trim(),
          description: Joi.array().items(Joi.string().trim()),
        })
      ),
    },
    skills: Joi.object().keys({
      headerName: Joi.string().trim(),
      content: Joi.array().items(
        Joi.object().keys({
          subHeader: Joi.string().trim(),
          details: Joi.string().trim(),
        })
      ),
    }),
  })
  .unknown(true)

const getAll = async ({ limit, skip, q }, userId) => {
  console.log('got here')
  console.log({ userId, limit, skip, q })
  const perPage = limit ? parseInt(limit) : 10
  const page = skip ? parseInt(skip) : 0
  const qRegex = new RegExp(q)
  const resumes = await Resume.find({
    createdBy: userId,
    fileName: qRegex,
  })
    .limit(perPage)
    .skip(perPage * page)

  const count = await Resume.countDocuments({
    createdBy: userId,
    fileName: qRegex,
  })
  return { resumes, count }
}

const getById = async (id) => {
  return await Resume.findById(id)
}

const create = async (resumeParam) => {
  console.log(resumeParam)
  const { value, error } = schema.validate(resumeParam)
  console.log('value', value)
  // validate fields
  if (error) {
    throw error
  }
  Object.assign(resumeParam, value)
  if (
    await Resume.findOne({
      createdBy: resumeParam.createdBy,
      fileName: resumeParam.fileName,
    })
  ) {
    throw new Error(
      `You already have a resume titled "${resumeParam.fileName}". Please pick another name`
    )
  }
  let resume = new Resume(resumeParam)
  return await resume.save()
}

const update = async (id, userId, resumeParam) => {
  const { value, error } = schema.validate(resumeParam)
  if (error) {
    throw error
  }
  Object.assign(resumeParam, value)
  const resume = await Resume.findOne({ _id: id, createdBy: userId })
  if (!resume) throw new Error('Resume not found')
  // filename must be unique
  if (
    resume.fileName !== resumeParam.fileName &&
    (await Resume.findOne({
      createdBy: userId,
      fileName: resumeParam.fileName,
    }))
  ) {
    throw new Error(
      `You already have a resume titled "${resumeParam.fileName}". Please pick another name`
    )
  }
  Object.assign(resume, { ...resumeParam, updatedAt: Date.now() })
  return await resume.save()
}

const _delete = async (id, userId) => {
  const resume = await Resume.findOne({ _id: id, createdBy: userId })
  if (!resume) throw new Error('Resume not found')
  return await Resume.findByIdAndDelete(id)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
}