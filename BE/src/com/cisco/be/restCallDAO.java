package com.cisco.be;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.client.ClientProtocolException;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONObject;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

public class restCallDAO {
	DBCollection userdataCollection;
	DBCollection travellogueCollection;
	
	public restCallDAO(final DB gominDatabase){
		userdataCollection = gominDatabase.getCollection("users");
		travellogueCollection = gominDatabase.getCollection("travellogue");
	}	
	
	public String addUserDetails(String jsonNewUser) {	
		String user,userId,newUserId,password,emailId;
		Object uid;
		
		try{			
			JSONObject jsonObject = new JSONObject(jsonNewUser);
		    JSONObject dataobj = jsonObject.getJSONObject("user");
		    user = dataobj.getString("username");
		    password = dataobj.getString("password");
		    emailId = dataobj.getString("email");
		    
		    BasicDBObject whereQuery = new BasicDBObject();
			whereQuery.put("username", user);
			DBCursor cursor = userdataCollection.find(whereQuery);
			if (cursor.hasNext()){
				DBObject doc = cursor.next();
				uid = doc.get("userId");
				userId = uid.toString();
				newUserId = "{\"userId\" : \"" + userId + "\"}";
			}
			else{
			    BasicDBObject document = (BasicDBObject) JSON.parse(jsonNewUser);			    
			    BasicDBObject doc = new BasicDBObject();
				ObjectId id = new ObjectId();
				doc.put("userId", id);
				doc.put("username", user);
				doc.put("password", password);
				doc.put("emailId", emailId);
				userId = id.toString();
				newUserId = "{\"userId\" : \"" + userId + "\"}";				
				userdataCollection.insert(document);				
				if (document.get("trips") == null)
					doc.put("trips", new Object[0]);
				travellogueCollection.insert(doc);
			}
			
			System.out.println("Inserted the user details");
			
			return newUserId;
		}catch(Exception e){
			e.printStackTrace();
			return "";
		}		
	}
	
	public String makeRestCall_getFlightDetails(String jsonData){
		String source, destination, startDate, endDate, classType, output;
		System.out.println(jsonData);
		BasicDBObject document = (BasicDBObject) JSON.parse(jsonData);
		
		source = document.getString("source");
		destination = document.getString("destn");
		startDate = document.getString("start");
		endDate = document.getString("end");
		classType = document.getString("class");
		
		String str = "http://developer.goibibo.com/api/search/?"
				+ "app_id=3ec08889&app_key=5ed83892dd5fbd110dce81702e20edbf&"
				+ "format=json&source=";
		str = str.concat(source);
		str = str.concat("&destination=");
		str = str.concat(destination);
		str = str.concat("&dateofdeparture=");
		str = str.concat(startDate);
		str = str.concat("&seatingclass=");
		str = str.concat(classType);
		str = str.concat("&adults=1&children=0&infants=0");
		System.out.println(str);
		try 
		{			 
			Client client = Client.create();
			WebResource webResource2 = client.resource(str);
			ClientResponse response2 = webResource2.accept("application/json").get(ClientResponse.class);
			if (response2.getStatus() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + response2.getStatus());
			}
 
			output = response2.getEntity(String.class);			
			System.out.println(output);
			
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
		
		return output;
	}
	
	public String makeRestCall_getMin(String jsonData) throws ClientProtocolException,
			IOException {
		
		String source, destination, startDate, endDate, classType, output;
		System.out.println(jsonData);
		BasicDBObject document = (BasicDBObject) JSON.parse(jsonData);
		
		source = document.getString("source");
		destination = document.getString("destn");
		startDate = document.getString("start");
		endDate = document.getString("end");
		classType = document.getString("class");
		
		String str = "http://developer.goibibo.com/api/stats/minfare/?"
				+ "app_id=3ec08889&app_key=5ed83892dd5fbd110dce81702e20edbf&"
				+ "format=json&vertical=flight&source=";
		str = str.concat(source);
		str = str.concat("&destination=");
		str = str.concat(destination);
		str = str.concat("&mode=one&sdate=");
		str = str.concat(startDate);
		str = str.concat("&edate=");
		str = str.concat(endDate);
		str = str.concat("&class=");
		str = str.concat(classType);
		
		try 
		{			 
			Client client = Client.create();
			WebResource webResource2 = client.resource(str);
			ClientResponse response2 = webResource2.accept("application/json").get(ClientResponse.class);
			if (response2.getStatus() != 200) {
				throw new RuntimeException("Failed : HTTP error code : " + response2.getStatus());
			}
 
			output = response2.getEntity(String.class);			
			System.out.println(output);
 
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
		
		return output;
	}	
	
	
	public void addTrip(String tripInfo){
		System.out.println("Trip info :" );
		System.out.println(tripInfo);
		String user,userId;
		
		try{				    
		    BasicDBObject document = (BasicDBObject) JSON.parse(tripInfo);
		    user = document.getString("username");
		    //userId = dataobj.get("userId").toString();		    
		    document.remove("username");
		    document.put("photos", new Object[0]);
		    document.put("comments", new Object[0]);
		    
		    BasicDBObject whereQuery = new BasicDBObject();
			whereQuery.put("username", user);
			DBCursor cursor = travellogueCollection.find(whereQuery);
			
			if (cursor.hasNext()){
				DBObject doc = cursor.next();				
				BasicDBObject docToInsert = new BasicDBObject("trips", document);
				
				BasicDBObject updateQuery = new BasicDBObject("username", user);
				
				BasicDBObject updateCommand = new BasicDBObject("$push", new BasicDBObject(docToInsert));

				travellogueCollection.update(updateQuery, updateCommand);
				System.out.println(travellogueCollection.findOne().toString());
			}
			
		}catch(Exception e){
			e.printStackTrace();			
		}
	}	
	
	
	public void addPhoto(String imgInfo){
		String user, tripName, tripName_user;
		
		try{			
			BasicDBObject document = (BasicDBObject) JSON.parse(imgInfo);
			user = document.getString("username");
			document.remove("username");
			tripName_user = document.getString("tripName");
			document.remove("tripName");
			
			BasicDBObject whereQuery = new BasicDBObject();
			whereQuery.put("username", user);
			DBCursor cursor = travellogueCollection.find(whereQuery);
			
			if (cursor.hasNext()){				
				DBObject doc = cursor.next();	
				JSONObject jSONObject = new JSONObject(doc.toString());				
				JSONArray tripsArr = jSONObject.getJSONArray("trips");
				
				for (int i = 0; i < tripsArr.length(); i++) {				
					JSONObject anotherjsonObject = tripsArr.getJSONObject(i);
					String trip = anotherjsonObject.toString();					
					BasicDBObject dock = (BasicDBObject) JSON.parse(trip);	
					tripName = dock.getString("tripName");
					
					if(tripName.equalsIgnoreCase(tripName_user)){
						System.out.println("Trip found");
						BasicDBObject docToInsert = new BasicDBObject(document);
						BasicDBObject updateQuery = new BasicDBObject("username", user);
						updateQuery.put("trips.tripName", tripName);
						BasicDBObject updateCommand = new BasicDBObject("$push", new BasicDBObject("trips.$.photos", docToInsert));
						travellogueCollection.update(updateQuery, updateCommand);
						System.out.println(travellogueCollection.findOne().toString());
					}
				}
			
			}
		}catch(Exception e){
			e.printStackTrace();	
		}
		
	}
	
	
	public void addComment(String commentInfo){
		String user, tripName, tripName_user;
		
		try{			
			BasicDBObject document = (BasicDBObject) JSON.parse(commentInfo);
			user = document.getString("username");
			document.remove("username");
			tripName_user = document.getString("tripName");
			document.remove("tripName");
			
			BasicDBObject whereQuery = new BasicDBObject();
			whereQuery.put("username", user);
			DBCursor cursor = travellogueCollection.find(whereQuery);
			
			if (cursor.hasNext()){				
				DBObject doc = cursor.next();	
				JSONObject jSONObject = new JSONObject(doc.toString());				
				JSONArray tripsArr = jSONObject.getJSONArray("trips");
				
				for (int i = 0; i < tripsArr.length(); i++) {				
					JSONObject anotherjsonObject = tripsArr.getJSONObject(i);
					String trip = anotherjsonObject.toString();					
					BasicDBObject dock = (BasicDBObject) JSON.parse(trip);	
					tripName = dock.getString("tripName");
					
					if(tripName.equalsIgnoreCase(tripName_user)){						
						BasicDBObject docToInsert = new BasicDBObject(document);
						BasicDBObject updateQuery = new BasicDBObject("username", user);
						updateQuery.put("trips.tripName", tripName);
						BasicDBObject updateCommand = new BasicDBObject("$push", new BasicDBObject("trips.$.comments", docToInsert));
						travellogueCollection.update(updateQuery, updateCommand);
						System.out.println(travellogueCollection.findOne().toString());
					}
				}
			
			}
		}catch(Exception e){
			e.printStackTrace();	
		}		
	}
	
	
	public String getTravellogue(String userInfo){
		String user, travellogue;
		
		try{			
			BasicDBObject document = (BasicDBObject) JSON.parse(userInfo);
			user = document.getString("username");
			
			BasicDBObject whereQuery = new BasicDBObject();
			whereQuery.put("username", user);
			DBCursor cursor = travellogueCollection.find(whereQuery);
			
			if (cursor.hasNext()){
				DBObject doc = cursor.next();	
				travellogue = doc.toString();
			}
			else
				travellogue = "";
			
		}catch(Exception e){
			e.printStackTrace();
			return "";
		}
		
		return travellogue;		
	}
	
}