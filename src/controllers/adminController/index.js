const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../../middlewares/authMiddleware/authenticateMiddleware");

const { signUpAdmin } = require("./admin");
const { adminSignUpMiddleWare } = require("../../middlewares/adminMiddleware/adminSignUpMiddle");

// companies controllers and middlewares
const { getCompanyData, getAllStatistics, getFilterCompanies, getFilterPersons, getFilterServices, getCompanies, deleteCompany, getCompany, getStatisticsRegion, getStatistics, getStatisticsServices, getStatisticsAppareil } = require("./company");


router.post("/sign-up", adminSignUpMiddleWare, signUpAdmin);

// companies routes
router.get("/statistics", authenticateMiddleware, getAllStatistics);
router.get("/companies", authenticateMiddleware, getCompanies); // ucan send search query to filter companies out
router.get("/company/:id", authenticateMiddleware, getCompany);
router.get("/company/:id/data", authenticateMiddleware, getCompanyData);
router.delete("/company/:id", authenticateMiddleware, deleteCompany);
router.get("/statistics/company", authenticateMiddleware, getStatistics);
router.get("/statistic/company/region", authenticateMiddleware, getStatisticsRegion);
router.get("/statistic/company/service", authenticateMiddleware, getStatisticsServices);
router.get("/statistic/company/appareil", authenticateMiddleware, getStatisticsAppareil);
router.get("/filter/company", authenticateMiddleware, getFilterCompanies);
router.get("/filter/company/services", authenticateMiddleware, getFilterServices);
router.get("/filter/company/persons", authenticateMiddleware, getFilterPersons);

// hospitals routes
const { getAllServices, getAllSearchServices, getFilterHospitalPatients, getHospitalData, getHospitals, getFilterHospitalServices, getFilterHospital, getStatisticsHospitalAppareil, getStatisticsHospitalServices, deleteHospital, getHospital, getHospitalStatistics, getStatisticsHospitalRegion } = require("./hospital");
router.get("/hospitals", authenticateMiddleware, getHospitals);
router.get("/hospital/:id", authenticateMiddleware, getHospital);
router.get("/hospital/:id/data", authenticateMiddleware, getHospitalData);
router.delete("/hospital/:id", authenticateMiddleware, deleteHospital);
router.get("/statistics/hospital", authenticateMiddleware, getHospitalStatistics);
router.get("/statistic/hospital/region", authenticateMiddleware, getStatisticsHospitalRegion);
router.get("/statistic/hospital/service", getStatisticsHospitalServices);
router.get("/statistic/hospital/appareil", getStatisticsHospitalAppareil);
router.get("/filter/hospital", authenticateMiddleware, getFilterHospital);
router.get("/filter/hospital/traitements", getFilterHospitalServices);
router.get("/filter/hospital/patients", getFilterHospitalPatients);
router.get("/services", getAllServices);
router.get("/search-services", getAllSearchServices);

// patients routes
const { getPatients, getPatient, getPatientData, deletePatient, getStatisticsPatient } = require("./patient");
router.get("/patients", authenticateMiddleware, getPatients);
router.get("/patient/:id", authenticateMiddleware, getPatient);
router.get("/patient/:id/data", authenticateMiddleware, getPatientData);
router.delete("/patient/:id", authenticateMiddleware, deletePatient);
router.get("/statistics/patients", authenticateMiddleware, getStatisticsPatient);

// person routes
const { getPersons, getPerson, getPersonData, deletePerson, getStatisticsPerson } = require("./person");
router.get("/persons", authenticateMiddleware, getPersons); // search query to filter persons out
router.get("/person/:id", authenticateMiddleware, getPerson);
router.get("/person/:id/data", authenticateMiddleware, getPersonData);
router.delete("/person/:id", authenticateMiddleware, deletePerson);
router.get("/statistics/persons", authenticateMiddleware, getStatisticsPerson);

//services
const { deleteService, getAllTraitements, getUltimateStatistics, 
	getUserHospital,
	getUserCompany,
	getUserPatient,
	getUserPerson,
	getHospitalMedicalPersons,
  getAdminData
} = require("./service");
router.delete("/service/:id", authenticateMiddleware, deleteService);
router.get("/all-traitements", authenticateMiddleware, getAllTraitements);
router.get("/ultimate-statistics", authenticateMiddleware, getUltimateStatistics);
router.get("/user-hospital/:id", authenticateMiddleware, getUserHospital);
router.get("/user-company/:id", authenticateMiddleware, getUserCompany);
router.get("/user-patient/:id", authenticateMiddleware, getUserPatient);
router.get("/user-person/:id", authenticateMiddleware, getUserPerson);
router.get("/medical-persons", authenticateMiddleware, getHospitalMedicalPersons);


router.get("/admin-data", authenticateMiddleware, getAdminData);

module.exports = router;