window.onload = function () {
    $("#start_btn").on("click", triviaGameObj.showQuestion);

    $(document).on("click", ".start_over_btn", triviaGameObj.showQuestion);
};

var next = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var intervalId;
var secondsRunning = false;
var qTimeOut;
var rTimeOut;
var aTimeOut;
var secs = 5;
var timerTemp = 0;

var triviaGameObj = {
    timer: secs,
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
        //console.log(next);
        triviaGameObj.resetTimer();
        if ($(this).hasClass('start_over_btn')) {
            next = 0;
            correctAns = 0;
            incorrectAns = 0;
            unanswered = 0;
        }
        triviaGameObj.setTimer();

        if (!secondsRunning) {
            intervalId = setInterval(triviaGameObj.setTimer, 1000);
            secondsRunning = true;
        }

        var questAnsArrLen = triviaGameObj.questAnsArr.length;
        var question = triviaGameObj.questAnsArr[next].q;
        $("#bottom_div").empty();
        $("#bottom_div").html(question);

        var optionsObj = triviaGameObj.questAnsArr[next].a;

        /**
         * Display the options for an answer
         */
        var option = '';
        var newDiv = '';

        for (var key in optionsObj) {
            option = optionsObj[key];
            newDiv = $("<div>").text(option);
            newDiv.attr("ansNum", key);
            newDiv.click(triviaGameObj.showAnswer);
            $("#bottom_div").append(newDiv);

        }

        aTimeOut = setTimeout(triviaGameObj.showAnswer, (triviaGameObj.timer + 1) + '000');
    },

    setTimer: function () {
        timerTemp = triviaGameObj.timer--;
        $("#top_div").html("Time Remaining: " + timerTemp);
    },

    showAnswer: function () {
        triviaGameObj.resetTimer();
        var ansNum = $(this).attr('ansNum');
        var message;
        //console.log(ansNum);
        var correctAnswerIndex = triviaGameObj.questAnsArr[next].answer;
        var correctAnswer = triviaGameObj.questAnsArr[next].a[correctAnswerIndex];
        //console.log(ansNum + " " + correctAnswerIndex);
        //var newTimer = triviaGameObj.timer;
        console.log(timerTemp);
        if (timerTemp == 0) {
            message = "Out of Time";
            message += "The correct answer was " + correctAnswer;
            unanswered++;
            //newTimer = triviaGameObj.timer;
        } else if (ansNum == correctAnswerIndex) {
            //console.log(ansNum);
            message = "Correct";
            correctAns++;
        } else {
            message = "Nope!";
            message += "The correct answer was " + correctAnswer;
            incorrectAns++;
        }
        //console.log(message);
        triviaGameObj.showMessage({ msg: message });

        var questAnsArrLen = triviaGameObj.questAnsArr.length;
        //console.log(next + "==" + (questAnsArrLen - 1));

        //if (!secondsRunning) {
        // intervalId = setInterval(triviaGameObj.showQuestion, 5000);
        //secondsRunning = true;
        //}

        if (next == (questAnsArrLen - 1)) {
            //clearInterval(intervalId);
            //secondsRunning = false;
            rTimeOut = setTimeout(triviaGameObj.showResult, triviaGameObj.timer + '000');
        } else {
            qTimeOut = setTimeout(triviaGameObj.showQuestion, triviaGameObj.timer + '000');
        }
        next++;

        //console.log("increment next");
        //triviaGameObj.resetTimer();
        clearInterval(intervalId);
        secondsRunning = false;
    },

    showResult: function () {
        var message = '';
        message = "All done.";
        triviaGameObj.showMessage({ msg: message });

        message = "Correct Answers:" + correctAns;
        message += "Incorrect Answers:" + incorrectAns;
        message += "Unanswered:" + unanswered;

        //message += $("<div>").append("<button>Start Over</button>");

        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("start_over_btn");
        // Providing the initial button text
        a.text("Start Over");
        // Adding the button to the buttons-view div
        // var start_over_div = $("<div>").append(a);

        $("#bottom_div").append(a);
        //message += start_over_div;

        //triviaGameObj.showMessage({ msg: message });

        triviaGameObj.resetTimer();
    },

    showMessage: function (objParams) {
        var newDiv = '';
        newDiv = $("<div>").html(objParams.msg);
        var parentDiv = (objParams.div) ? objParams.div : "bottom_div";
        $("#" + parentDiv).empty();
        $("#" + parentDiv).append(newDiv);
    },

    resetTimer: function () {
        triviaGameObj.timer = secs;
        clearTimeout(qTimeOut);
        clearTimeout(rTimeOut);
        clearTimeout(aTimeOut);
        clearInterval(intervalId);
        secondsRunning = false;
    }
}