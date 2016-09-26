angular.module('myExam', [])
.controller('examQusController', function($scope) {
	var pos = 0, test, question, choice, choices, chA, chB, chC = null, chD=null, correct = 0;
	$scope.questions = [
    {
        "qusId": 1,
        "question": "Are you ready for exam?",
        "senior": null,
        "options": [
            "Yes",
            "No"
        ],
        "QuestionType": "multipleRadio",
        "choice": "A"
    },
    {
        "qusId": 2,
        "question": "What is 10 + 4?",
        "senior": null,
        "options": [
            "12",
            "14",
            "16"
        ],
        "QuestionType": "multipleRadio",
        "choice": "B"
    },
    {
        "qusId": 2,
        "question": "What is 20 - 9?",
        "senior": null,
        "options": [
            "9",
            "14",
            "11",
            "13"
        ],
        "QuestionType": "multipleRadio",
        "choice": "C"
    },
    {
        "qusId": 3,
        "question": "What is 7 x 3?",
        "senior": null,
        "options": [
            "12",
            "21",
            "24",
            "36"
        ],
        "choice": "A"
    },
    {
        "question": "What is 8 / 2?",
        "senior": null,
        "options": [
            "2",
            "8",
            "4"
        ],
        "choice": "C"
    },
    {
        "qusId": 4,
        "question": "What is sq-root 12?",
        "senior": "this shold be calculate like 12*12",
        "options": [
            "155",
            "122",
            "55",
            "144"
        ],
        "QuestionType": "multipleRadio",
        "choice": "A"
    },
    {
        "qusId": 5,
        "question": "What is LMC of 8, 6, 14?",
        "senior": "2*4*3*7",
        "options": [
            "168",
            "144",
            "120",
            "84"
        ],
        "QuestionType": "multipleRadio",
        "choice": "A"
    }
];
	$scope.currentPage = 0;
	$scope.pageSize = 5;
	 $scope.numberOfPages=function(){
        return Math.ceil($scope.questions.length/$scope.pageSize);                
    }
	
// $element === angular.element() === jQuery() === $()
$scope.test_status = "Started with "+$scope.questions.length+" Questions";
this.checkAnswer = function checkAnswer(num, name){	
	//var choices = document.getElementsByName("choices"+num);
	//var choices = angular.element('input[name=choices+num]:checked').val();
	/*window.alert($scope.toBool(option.Selected));
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
		choices[i].disabled = true;
	}

	/*if(choice == questions[num][5]){
		_(optId).style.backgroundColor = "#9CBA7F";
		correct++;
	} else{
		_(optId).style.backgroundColor = "#FF6666";
		wrong++;
	}*/
}

//$scope.test_status = "Total Question ";
}).filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
/*
.factory('examData', function(){
	var examQuestions  = ; 
	return examQuestions;
});*/

