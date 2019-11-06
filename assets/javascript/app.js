window.onload = function () {
    triviaGameObj.showQuestion();
};

var counter = 0;
var intervalId;
var triviaGameObj = {
    questAnsArr: [
        {
            "q": "what is a volcano?",
            "a": {
                1: "mountain",
                2: "opening which discharges lava",
                3: "crater",
                4: "deadly wave"
            },
            "answer": 2
        },
        {
            "q": "what is pluto?",
            "a": {
                1: "biggest planet",
                2: "smallest planet",
                3: "dwarf planet",
                4: "gas giant"
            },
            "answer": 3
        }],

    showQuestion: function () {
        //console.log(counter);
        var questAnsArrLen = triviaGameObj.questAnsArr.length;
        var question = triviaGameObj.questAnsArr[counter].q;
        $("#quest_id").html(question);

        var optionsObj = triviaGameObj.questAnsArr[counter].a;

        /**
         * Display the options for an answer
         */
        var option = '';
        var newDiv = '';
        $("#ans_id").html('');
        for (var key in optionsObj) {
            option = optionsObj[key];
            newDiv = $("<div>").text(option);
            $("#ans_id").append(newDiv);
        }

        counter++;
        if (counter <= (questAnsArrLen - 1)) {
            intervalId = setInterval(triviaGameObj.showQuestion, 2000);
            triviaGameObj.questCount++;
        } else {
            //$("#ans_id").html("sdsds");
            clearInterval(intervalId);
        }


    }
}