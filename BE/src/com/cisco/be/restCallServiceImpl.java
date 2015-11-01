package com.cisco.be;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.mongodb.DB;

@Path("/minFareService")
public class restCallServiceImpl {
	
	@POST
	@Path("/addAUser")
	@Produces("application/json")
	public String addPatient(String jsonNewUser) {		
		gominAction gmaction = new gominAction();
		DB GMDatabase = gmaction.initialize();
		restCallDAO restcalldao = new restCallDAO(GMDatabase);	
		
		try {	
			return restcalldao.addUserDetails(jsonNewUser);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "User could not be added";
	}

	@POST
	@Path("/checkMinFare")
	@Produces("application/json")
	public String checkMinFare(String jsonData) throws Exception {				
		gominAction ecaction = new gominAction();
		DB ECDatabase = ecaction.initialize();
		
		emailTrigger trigger = new emailTrigger();		
		
		try {			
			trigger.schedule(jsonData, MinFareJob.class);
			return "{\"Output\":\"Success\"}";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Error returned.";
	}
	
	@POST
	@Path("/checkCancellation")
	@Produces("application/json")
	public String checkCancellation(String jsonData) throws Exception {			
		String output;		
		emailTrigger trigger = new emailTrigger();	
		gominAction gmaction = new gominAction();
		DB GMDatabase = gmaction.initialize();
		restCallDAO restcalldao = new restCallDAO(GMDatabase);		
		
		try {				
			output = restcalldao.makeRestCall_getFlightDetails(jsonData);
			trigger.schedule(jsonData, FlightSearchJob.class);
			return output;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Error returned.";
	}
	
	@POST
	@Path("/addATrip")
	@Produces("application/json")
	public void addATrip(String jsonNewTrip) {		
		gominAction gmaction = new gominAction();
		DB GMDatabase = gmaction.initialize();
		restCallDAO restcalldao = new restCallDAO(GMDatabase);	
		
		try {	
			restcalldao.addTrip(jsonNewTrip);			
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	@POST
	@Path("/addAPhoto")
	@Produces("application/json")
	public void addAPhoto(String jsonNewPhoto) {		
		gominAction gmaction = new gominAction();
		DB GMDatabase = gmaction.initialize();
		restCallDAO restcalldao = new restCallDAO(GMDatabase);	
		
		try {	
			restcalldao.addPhoto(jsonNewPhoto);			
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	@POST
	@Path("/addAComment")
	@Produces("application/json")
	public void addAComment(String jsonNewComment) {		
		gominAction gmaction = new gominAction();
		DB GMDatabase = gmaction.initialize();
		restCallDAO restcalldao = new restCallDAO(GMDatabase);	
		
		try {	
			restcalldao.addComment(jsonNewComment);			
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
	@POST
	@Path("/getTravellogue")
	@Produces("application/json")
	public String getTravellogue(String jsonData) throws Exception {			
		String output;		
		
		gominAction gmaction = new gominAction();
		DB GMDatabase = gmaction.initialize();
		restCallDAO restcalldao = new restCallDAO(GMDatabase);		
		
		try {				
			output = restcalldao.getTravellogue(jsonData);			
			return output;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Error returned.";
	}

	
}
