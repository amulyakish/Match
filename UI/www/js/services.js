angular.module('directory.services',[]).factory('MatchFactory', function($http,$q){
    return {
        identity:{
            addNgo: function(data){
                console.log("ngo sign up -"+ data);
                var deffered = $q.defer();
                // add details to NGO collection
                var newNGO = {
                    address: data.address || '',
                    ngoName: data.ngoName || '',
                    email: data.email || '',
                    contactName: data.contactName || '',
                    phoneNo: data.phoneNo || '',
                    rating: 0,
                    description: data.description || '',
                    pic: data.pic
                };
                $http.post('https://api.parse.com/1/classes/NGO', newNGO, {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },

            addVolunteer: function(data){
                console.log("ngo sign up -"+ data);
                var deffered = $q.defer();
                // add details to NGO collection
                var newVolunteer = {
                    firstname: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    currentLoc: data.currentLoc || null,
                    phoneNo: parseInt(data.phoneNo) || '',
                    rating: 0
                };
                $http.post('https://api.parse.com/1/classes/Volunteer', newVolunteer, {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },

            addNewUser: function(data, type){
                var deffered = $q.defer();
                var userData = {
                    username : data.username,
                    password: data.password,
                    type: type
                };
                $http.post('https://api.parse.com/1/users', userData, {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                        'X-Parse-Revocable-Session': 1,
                        'Content-Type': 'application/json'
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.resolve(data.data);
                    }
                );
                return deffered.promise;
            },

            removeNGO: function(data){
                var deffered = $q.defer();
                $http.delete('https://api.parse.com/1/NGO/'+data,  {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },

            removeVolunteer: function(data){
                var deffered = $q.defer();
                $http.delete('https://api.parse.com/1/Volunteer/'+data,  {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },


            login: function(data){
                var deffered = $q.defer();
                $http.get('https://api.parse.com/1/login',  {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    },
                    params:{
                        username: data.username,
                        password: data.password
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            }
        },
        Images: {
            upload : function(upFile){
                var deffered = $q.defer();
                $http.post('https://api.parse.com/1/files/'+upFile.name, upFile, {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                        'Content-Type': 'image'
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            }
        },
        volunteers: {
            loadNGOs: function () {
                var deffered = $q.defer();
                $http.get('https://api.parse.com/1/classes/NGO', {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },

            getOppDesc: function (offerId) {
                var deffered = $q.defer();
                var whereQuery = {"objectId": "Thmn0os3qW"};
                $http.get('https://api.parse.com/1/classes/Opportunity', {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    }, params: {
                        where: whereQuery,
                        include: "ngo"
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },

            getNGODetails: function (ngoId) {
                var deffered = $q.defer();
                var whereQuery = {"objectId": ngoId};
                $http.get('https://api.parse.com/1/classes/NGO', {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                    },
                    params: {
                        where: whereQuery
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            },

            getNGOOffers: function (ngoId) {
                var deffered = $q.defer();
                var whereQuery = {"ngo": {"__type": "Pointer", "className": "NGO", "objectId": ngoId}};
                $http.get('https://api.parse.com/1/classes/Opportunity', {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                        'Content-Type': 'application/json'
                    },
                    params: {
                        where: whereQuery,
                        include: "ngo"
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            }
        },

        NGO :  {
            postNew: function (data) {
                var deffered = $q.defer();
                 $http.post('https://api.parse.com/1/classes/Opportunity', data,  {
                 headers: {
                 'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                 'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                 'Content-Type': 'application/json'
                 },
                 params: {
                 include: "ngo"
                 }
                 }).then(function (data) {
                 deffered.resolve(data.data);
                 }, function (data) {
                 deffered.reject();
                 }
                 );
                return deffered.promise;
            },

            fetchBookings: function (data) {
                var deffered = $q.defer();
                var whereQuery = {"opportunity": {"__type": "Pointer", "className": "Opportunity", "objectId": data}};
                $http.get('https://api.parse.com/1/classes/Bookings', {
                    headers: {
                        'X-Parse-Application-Id': 'V3JaKrEOPtddyVtpW1394agmTq3A4K4m2k34uT5c',
                        'X-Parse-REST-API-Key': 'P3zql5uM0kVJs5YEY1Ub1xKo8qUkhJA2qzuWIsQF',
                        'Content-Type': 'application/json'
                    },
                    params: {
                        where: whereQuery,
                        include: "volunteer"
                    }
                }).then(function (data) {
                        deffered.resolve(data.data);
                    }, function (data) {
                        deffered.reject();
                    }
                );
                return deffered.promise;
            }
        }
    }
});
