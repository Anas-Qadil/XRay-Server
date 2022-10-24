const express = require("express");
const router = express.Router();
const patientModel = require("../src/models/patientModel");
const serviceModel = require("../src/models/serviceModel");
const hospitalModel = require("../src/models/hospitalModel");
const personModel = require("../src/models/personModel");
//@test apis

//@all patients
router.get("/patients", async (req, res) => {
	const data = await patientModel.find({});
	res.json({data});
});


router.post("/add-services", async (req, res, next) => {
	try {
    const services = [
      {
        name: "Service 1",
        equipment: "Equipment 1",
        examen: "Examen 1",
        protocol: "Protocole 1",
        hospital: "6317a7501bb0144558b12e90"
      },
      {
        name: "Service 2",
        equipment: "Equipment 2",
        examen: "Examen 2",
        protocol: "Protocole 2",
        hospital: "6317a7561bb0144558b12e93"
      },
      {
        name: "Service 3",
        equipment: "Equipment 3",
        examen: "Examen 3",
        protocol: "Protocole 3",
        hospital: "6317a7571bb0144558b12e95"
      },
      {
        name: "Service 4",
        equipment: "Equipment 4",
        examen: "Examen 4",
        protocol: "Protocole 4",
        hospital: "6317a7581bb0144558b12e97"
      }
    ]
    await serviceModel.insertMany(services);
    res.status(200).send({
      status: "success",
      message: "Services added",
      services: services
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
})

router.post("/add-hospital", async (req, res, next) => {
	try {
    const hospital = [
      {
        name: "Hospital 1",
        region: "Region 1",
        ville: "Ville 1",
        statut: "active",
        designation: "Designation 1",
        phone: "Phone 1",
        email: "Email 1",
      },
      {
        name: "Hospital 2",
        region: "Region 2",
        ville: "Ville 2",
        statut: "active",
        designation: "Designation 2",
        phone: "Phone 2",
        email: "Email 2",
      },
      {
        name: "Hospital 3",
        region: "Region 3",
        ville: "Ville 3",
        statut: "active",
        designation: "Designation 3",
        phone: "Phone 3",
        email: "Email 3",
      },
      {
        name: "Hospital 4",
        region: "Region 4",
        ville: "Ville 4",
        statut: "active",
        designation: "Designation 4",
        phone: "Phone 4",
        email: "Email 4",
      },
      {
        name: "Hospital 5",
        region: "Region 5",
        ville: "Ville 5",
        statut: "active",
        designation: "Designation 5",
        phone: "Phone 5",
        email: "Email 5",
      },
      {
        name: "Hospital 6",
        region: "Region 6",
        ville: "Ville 6",
        statut: "active",
        designation: "Designation 6",
        phone: "Phone 6",
        email: "Email 6",
      },
    ];
    await hospitalModel.insertMany(hospital);
    res.status(200).send({
      status: "success",
      message: "Hospital added",
      hospital: hospital
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
});

router.post("/add-person", async (req, res, next) => {
  try {
    const person = [
      {
        firstName: "firstName 2",
        lastName: "lastName 2",
        region: "Region 2",
        cin: "CIN 2",
        ville: "Ville 2",
        gender: "male",
        statut: "active",
        birthDate: "2000-09-03",
        phone: "Phone 2",
        email: "Email 2",
        address: "address",
        secteur: "secteur",
        fonction: "fonction",
        age: "10"
      },
      {
        firstName: "firstName 3",
        lastName: "lastName 3",
        region: "Region 3",
        cin: "CIN 3",
        ville: "Ville 3",
        gender: "male",
        statut: "active",
        birthDate: "2000-09-03",
        phone: "Phone 3",
        email: "Email 3",
        address: "address",
        secteur: "secteur",
        fonction: "fonction",
        age: "30"
      },
      {
        firstName: "firstName 4",
        lastName: "lastName 4",
        region: "Region 4",
        cin: "CIN 4",
        ville: "Ville 4",
        gender: "male",
        statut: "active",
        birthDate: "2000-09-03",
        phone: "Phone 4",
        email: "Email 4",
        address: "address",
        secteur: "secteur",
        fonction: "fonction",
        age: "24"
      },
      {
        firstName: "firstName 5",
        lastName: "lastName 5",
        region: "Region 5",
        cin: "CIN 5",
        ville: "Ville 5",
        gender: "male",
        statut: "active",
        birthDate: "2000-09-03",
        phone: "Phone 5",
        email: "Email 5",
        address: "address",
        secteur: "secteur",
        fonction: "fonction",
        age: "23"
      },
    ];
    await personModel.insertMany(person);
    res.status(200).send({
      status: "success",
      message: "Person added",
      person: person
    });
  } catch (e) {
    return res.status(500).send({
      status: "failure",
      message: e.message
    });
  }
});

router.get("/get-all-persons", async (req, res, next) => {
  try {
    const persons = await personModel.find({});
    if (!persons) {
      return res.send({
        status: "failure",
        message: "no person was found"
      });
    }
    return res.send({
      status: "success",
      data: persons
    });
  } catch (e) {
    return res.send({
      status: "failure",
      message: "unexpected error happend"
    });
  }
});

router.get("/all-hospitals", async (req, res, next) => {
  try {
    const hospitals = await hospitalModel.find({});
    if (!hospitals) {
      return res.send({
        status: "failure",
        message: "no hospital was found"
      });
    }
    return res.send({
      status: "success",
      data: hospitals
    });
  } catch(e) {
    return res.send({
      status: "failure",
      message: "unexpected error happend"
    });
  }
});

router.post("/all-companies", async (req, res, next) => {
  try {
    const companies = await companyModel.find({});
    if (!companies) {
      return res.send({
        status: "failure",
        message: "no company was found"
      });
    }
    return res.send({
      status: "success",
      data: companies
    });
  } catch(e) {
    return res.send({
      status: "failure",
      message: "unexpected error happend"
    });
  }
});

// company route tests


const traitement = [{
  patient: '630609a6061274d47405b6fd',
  service: '6325cd62717238e0cf9de9c4',
  hospital: '6317a7501bb0144558b12e90',
  date: '2021-09-03',
  dose: 3,
},{
  patient: '631397ac64d2d999605844ca',
  service: '6325cd62717238e0cf9de9c6',
  hospital: '6317a7561bb0144558b12e93',
  date: '2021-07-03',
  dose: 3,
},{
  patient: '63060c304e3bc60011f49be1',
  service: '6325cd62717238e0cf9de9c7',
  hospital: '6317b79ace25721f6d551704',
  date: '2021-08-03',
  dose: 3,
},{
  patient: '63060be14e3bc60011f49bd9',
  service: '6325cd62717238e0cf9de9c5',
  hospital: '6317a7571bb0144558b12e95',
  date: '2021-05-03',
  dose: 3,
}
]

module.exports = router;