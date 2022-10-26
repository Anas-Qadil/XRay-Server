const express = require("express");
const hospitalModel = require("../../models/hospitalModel");
const patientModel = require("../../models/patientModel");
const serviceModel = require("../../models/serviceModel");
const traitementModel = require("../../models/traitementModel");
const personModel = require("../../models/personModel");
const person_traitementModel = require("../../models/person_traitementModel");

const getAllHospitals = async (req, res) => {
	try {
		const data = await hospitalModel.find({});
		if (!data) {
			return res.status(400).json({
				message: "No hospitals found",
			});
		}
		res.status(200).send({
			message: "Hospitals found",
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			message: "Server error",
			error: error.message
		});
	}
}

const getHospitalById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await hospitalModel.findOne({_id: id});
		if (!data) {
			return res.status(400).json({
				message: "No hospital found",
			});
		}
		res.status(200).send({
			message: "Hospital found",
			data: data,
		});
	} catch (error) {
		res.status(500).send({
			message: "Server error",
			error: error.message
		});
	}
}

const getHospitalPatients = async (req, res) => {
	try {
		const id = String(req.user.hospital);
    const search = req.query.search;
    const patients = await patientModel.find({ 
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { gender: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ]
    });
    const data = await traitementModel.find({}).populate("patient").populate("service");
    let result =[]
    data.map((doc) => {
      if (doc.service.hospital == id) {
        result.push(doc)
      }
    });
    let final = [];
    result.map((doc) => {
      patients.map((patient) => {
        if (String(doc.patient._id) == String(patient._id)) {
          if (!final.includes(patient)) {
            final.push(patient)
          }
        }
      })
    });

    res.status(200).send({
      status: "success",
      message: "Patients found",
      data: final,
    });
	} catch (e) {
		res.status(500).send({
      status: "failure",
      message: e.message
		});
	}
}

const getHospitalPersons = async (req, res) => {
  try {
    const user = req.user;
    const id = String(req.user.hospital);
    const search = req.query.search;
    const persons = await personModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { cin: { $regex: search, $options: "i" } },
        { secteur: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
        { fonction: { $regex: search, $options: "i" } },
        { poids: { $regex: search, $options: "i" } },
      ],
    }).populate("hospital");

    let data = [];
    const traitement = await person_traitementModel.find({})
      .populate("person")
      .populate("service");
      
    traitement.map((doc) => {
      persons.map((person) => {
        if (String(doc.service.hospital) === String(user.hospital)) {
          if (String(doc.person._id) === String(person._id)) {
            if (!data.includes(person)) {
              data.push(person);
            }
          }
        }
      });
    });

    res.status(200).send({
      status: "success",
      message: "persons found",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: "Internal server error"
    });
  }
}

const getHospitalServices = async (req, res) => {
  try {
    const id = String(req.user.hospital);
    const data = await serviceModel.find({ hospital: id })
    .populate("hospital");
    if (!data) {
      return res.status(400).json({
        status: "failure",
        message: "No services found",
      });
    }
    res.status(200).send({
      message: "Services found",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message
    });
  }
}

const hospitalDoes = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceModel.findById({hospital: id})
    .populate("hospital")
    .populate("patient");

    let doses = 0;
    data.map((dose) => {
      doses += parseInt(dose.dose);
    })

    if (!data) {
      return res.status(400).json({
        message: "No hospital found",
      });
    }
    res.status(200).send({
      message: "Hospital found",
      data: data,
      doses: doses
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message
    });
  }
}

const addService = async (req, res) => {
  try {
    const { data } = req.body;
    const dataResult = await serviceModel.create(data);
    if (!dataResult) {
      return res.status(400).json({
        message: "No hospital found",
      });
    }
    res.status(200).send({
      message: "Service Was Created Successfully",
      data: dataResult,
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
      error: error.message
    });
  }
}

module.exports = {
	getAllHospitals,
	getHospitalById,
  getHospitalPatients,
  getHospitalServices,
  hospitalDoes,
  addService,
  getHospitalPersons
}