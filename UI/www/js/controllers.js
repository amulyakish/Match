angular.module('directory.controllers', ['directory.services','ionic.rating','ngMessages','ngFileUpload','googlechart'])

    .controller('NGOListCtrl', function ($scope, $stateParams,  $q,  MatchFactory) {
        console.log("NGOListCtrl");
        var promise = MatchFactory.volunteers.loadNGOs($stateParams.volId);
        promise.then(function (data) {
            $scope.ngos  = data.results;
            console.log( $scope.ngos);
            })
            .catch(function (error) {
                //do something with the error
            });
    })

    .controller('BookNowCtrl', function( $stateParams,$scope,  $q,  MatchFactory) {
        console.log('BookNowCtrl!');
        var promise = MatchFactory.bookNow($scope.data); //TODO
        promise.then(function (data) {
            $scope.details  = data.results;
            console.log( $scope.ngos);
        })
            .catch(function (error) {
                //do something with the error
            });
    })

    .controller('NewPostCtrl', function( $stateParams,$scope,  $q,  MatchFactory) {
        console.log('NewPostCtrl!');
        $scope.offer={
            offerDate: new Date(2015,11,11)
        };
        $scope.postNew = function() {
            $scope.submitted = true;
            var promise = MatchFactory.NGO.postNew(offer);
            //TODO
            promise.then(function (data) {
                $scope.details = data.results;
                console.log($scope.ngos);
            })
                .catch(function (error) {
                    //do something with the error
                });
        }
    })

    .controller('OppDescCtrl', function($scope, $stateParams,  $q,  MatchFactory) {
        console.log('OppDescCtrl!');
        var promise = MatchFactory.volunteers.getOppDesc($stateParams.ngoId);
        promise.then(function (data) {
            $scope.offer  = data.results[0];
            var date= new Date($scope.offer.offerDate.iso);
            $scope.dateText = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
            $scope.sendSMS = function(){
                // send sms
                window.open('sms:' + $scope.offer.phoneNo, '_system');
            };

            $scope.sendEmail = function(){
                // send sms
                window.open('mailTo:' + $scope.offer.ngo.email, '_system');
            };

            $scope.dialNumber = function() {
                window.open('tel: ' + $scope.offer.phoneNo, '_system');
            };
        })
            .catch(function (error) {
                //do something with the error
            });
        //$scope.offers = Opportunities.get({ngoId: $stateParams.ngoId ,offerId: $stateParams.offerId});
       // $scope.offer = {"contactName":"Khyati ","createdAt":"2015-10-24T10:01:18.399Z","description":"Need O+ blood at Manipal Hospital","duration":"NA","ngo":{"__type":"Pointer","className":"NGO","objectId":"6KzCBurhsT"},"nofpeople":1,"offerDate":{"__type":"Date","iso":"2015-12-09T13:16:00.000Z"},"offerTitle":"O+ Blood","offerType":"Blood donation","requesterName":"Amulya","status":"N","updatedAt":"2015-10-24T18:39:03.115Z","objectId":"Thmn0os3qW"};
    })

    .controller('NGODetailCtrl', function($scope, $stateParams, $q,  MatchFactory) {
        console.log('ngo-details!');
        $scope.readOnly = true;
        //$scope.ngos = Ngos.query({ngoId: $stateParams.ngoId});
        //$scope.ngos = {"address":"Shanti Nagar, Bangalore","contactName":"Bimal Roy","createdAt":"2015-10-24T07:59:55.875Z","email":"samridhi.0203@gmail.com","ngoName":"Antardrishti","phoneNo":9,"pic":{"__type":"File","name":"tfss-aa492886-fbef-4bd6-9467-83ed0aba2a35-ad.jpg","url":"http://files.parsetfss.com/a2a4169a-32af-4c3f-a2d0-f2bc4fff4017/tfss-aa492886-fbef-4bd6-9467-83ed0aba2a35-ad.jpg"},"rating":2,"updatedAt":"2015-10-24T18:45:36.931Z","objectId":"6KzCBurhsT"};

        var promise = MatchFactory.volunteers.getNGODetails($stateParams.ngoId);
        promise.then(function (data) {
            $scope.ngos  = data.results[0];
            $scope.sendSMS = function(){
                // send sms
                window.open('sms:' + $scope.ngos.phoneNo, '_system');
            };

            $scope.sendEmail = function(){
                // send sms
                window.open('mailTo:' + $scope.ngos.email, '_system');
            };

            $scope.dialNumber = function() {
                window.open('tel: ' + $scope.ngos.phoneNo, '_system');
            };
        })
            .catch(function (error) {
                //do something with the error
            });
    })

    .controller('NGOOffersCtrl', function ($scope, $stateParams,  $q,  MatchFactory) {
        console.log("NGOOffersCtrl");
        $scope.searchKey = "";

        /*$scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.offers = Opportunities.query();
        }

        $scope.search = function () {
            $scope.offers = Opportunities.query({name: $scope.searchKey});
        }*/

        $scope.onClick = function(ngoId){
            $state.go("ngoOffers",{volId :$stateParams.volId, ngoId: ngo.objectId});
        }

        //TODO
        $scope.about = function () {
            var id = $scope.offers[0].ngo.objectId;
            //$location.url("#/ngo/"+ id);
            $state.go("#/ngo/"+ id);
        }

        var promise = MatchFactory.volunteers.getNGOOffers($stateParams.ngoId);
        promise.then(function (data) {
            $scope.offers  = data.results;
            console.log( $scope.offers);
        })
            .catch(function (error) {
                //do something with the error
            });
        //$scope.offers = Opportunities.query({ngoId: $stateParams.ngoId});

    })

    .controller('NGOPostsCtrl', function ($scope, $stateParams,  $q,  MatchFactory) {
        console.log("NGOPostsCtrl");
        $scope.searchKey = "";

        //TODO
        $scope.about = function () {
            var id = $scope.offers[0].ngo.objectId;
            //$location.url("#/ngo/"+ id);
            $state.go("#/ngo/"+ id);
        }

        var promise = MatchFactory.volunteers.getNGOOffers("6KzCBurhsT");  //todo get ngoId on login
        promise.then(function (data) {
            $scope.offers  = data.results;
            console.log( $scope.offers);
        })
            .catch(function (error) {
                //do something with the error
            });

    })

    .controller('NGOProfileCtrl', function ($scope, $stateParams,  $q,  MatchFactory) {
        console.log("NGOProfileCtrl");
        $scope.searchKey = "";

        var promise = MatchFactory.volunteers.getNGODetails($stateParams.ngoId);
        promise.then(function (data) {
            $scope.ngos  = data.results[0];
            $scope.sendSMS = function(){
                // send sms
                window.open('sms:' + $scope.ngos.phoneNo, '_system');
            };

            $scope.sendEmail = function(){
                // send sms
                window.open('mailTo:' + $scope.ngos.email, '_system');
            };

            $scope.dialNumber = function() {
                window.open('tel: ' + $scope.ngos.phoneNo, '_system');
            };
        })
            .catch(function (error) {
                //do something with the error
            });
    })

    .controller('PostRequestsCtrl', function ($scope, $stateParams,  $q,  MatchFactory) {
        console.log("PostRequestsCtrl");

        $scope.sampleData = {
            "type": "ColumnChart",
            "cssStyle": "height:200px; width:300px;",
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string"
                    },
                    {
                        "id": "colVol",
                        "label": "College",
                        "type": "number"
                    },
                    {
                        "id": "corpVols",
                        "label": "Corporate",
                        "type": "number"
                    },
                    {
                        "id": "comVols",
                        "label": "Community",
                        "type": "number"
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42"
                            },
                            {
                                "v": 12,
                                "f": "12"
                            },
                            {
                                "v": 7,
                                "f": "7"
                            },
                            {
                                "v": 4
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 0
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            }
                        ]
                    }
                ]
            },
            "options": {
                "legend": "right",
                "title": "Volunteer Distribution",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Volunteers",
                    "gridlines": {
                        "count": 6
                    }
                },
                "hAxis": {
                    "title": "Event Month"
                }
            },
            "formatters": {}
        };

        var promise = MatchFactory.NGO.fetchBookings($stateParams.offerId);
        promise.then(function (data) {
            $scope.bookings  = data.results;
        });

        $scope.acceptClicked = function(val){
            if(val === "pending" || val === "accepted") {
                return "accepted";
            }else{
                return "declined";
            }
        };

        $scope.declineClicked = function(val){
            if(val === "declined" ||  val ==="pending") {
                return "declined";
            }else{
                return "accepted";
            }
        };

        var promise = MatchFactory.volunteers.getOppDesc($stateParams.offerId);
        promise.then(function (data) {
            $scope.op  = data.results[0];
            $scope.sendSMS = function(){
                // send sms
                window.open('sms:' + $scope.op.phoneNo, '_system');
            };

            $scope.sendEmail = function(){
                // send sms
                window.open('mailTo:' + $scope.op.ngo.email, '_system');
            };

            $scope.dialNumber = function() {
                window.open('tel: ' + $scope.op.phoneNo, '_system');
            };

            $scope.cancelOpportunity = function(id){
                // Delete Opportunity with id = id
            }
        });
    })

    .controller('LoginCtrl', function($scope, $state, $stateParams, $q,  MatchFactory) {
        $scope.loginEmail = function(data){
            var login = MatchFactory.identity.login(data);
            login.then(function(data) {
                    if(data.type==="volunteer"){
                        $state.go("search", {volId : data.volunteer.objectId });
                    }else if(data.type==="ngo"){
                        $state.go("ngo-profile" ,{ngoId: data.ngo.objectId});
                    }
            })
                .catch(function(error){

                });
        }
    })

    .controller('SignUpCtrl', function($scope, $state, $stateParams, $q,  MatchFactory) {
        $scope.data;

        $scope.uploadFiles = function(file, errFiles) {
            if(errFiles && errFiles.length >0){
                alert("This image maybe too large.Please select another image");
            }else{
                $scope.pic = file;
            }
        }

        $scope.signup= function(data){
           console.log($scope.pic);
            var signup;
            var uploadImage;
            if($scope.pic) {
                //upload the image file to parse
                uploadImage = MatchFactory.Images.upload($scope.pic);
                uploadImage.then(function(fileRes){
                    data.pic = {
                        name : fileRes.name,
                        __type : "File"
                    };
                    if(data.type === 'ngo'){
                        signup = MatchFactory.identity.addNgo(data);
                    }else if(data.type == 'volunteer'){
                        signup = MatchFactory.identity.addVolunteer(data);
                    }
                    signup.then(function(res) {
                        if(res.objectId){
                            var newUser = MatchFactory.identity.addNewUser(data, res.objectId,data.type);
                            newUser.then(function(user){
                                if(user.objectId){
                                    if(data.type==='ngo'){
                                        $state.go("ngo-profile" ,{ngoId: res.objectId});
                                    }else if(data.type==='volunteer'){
                                        $state.go("search", {volId : res.objectId });
                                    }
                                }else{
                                    // unsuccessful. delete added
                                    if(data.type==='ngo'){
                                        var removeAdded = MatchFactory.identity.removeNGO(res.objectId);
                                    }else if(data.type==='volunteer'){
                                        var removeAdded = MatchFactory.identity.removeVolunteer(res.objectId);
                                    }
                                    removeAdded.then(function(){
                                        alert("Signup unsuccessful");
                                    })
                                }
                            })
                        }else{
                            alert(res.error);
                        }
                    });

                });
            }
       }

    })
;

