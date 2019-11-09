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
            newDiv.addClass("option_text cursor-pointer")
            newDiv.click(triviaGameObj.showAnswer);
            $("#bottom_div").append(newDiv);

        }

        aTimeOut = setTimeout(triviaGameObj.showAnswer, (triviaGameObj.timer + 1) + '000');
    },

    setTimer: function () {
        timerTemp = triviaGameObj.timer--;
        var timerDiv = $("<div>").text("Time Remaining: " + timerTemp + " Seconds");
        timerDiv.addClass("pb-3");
        $("#top_div").html(timerDiv);
    },

    showAnswer: function () {
        triviaGameObj.resetTimer();
        var ansNum = $(this).attr('ansNum');
        var message;
        var correctAnswerIndex = triviaGameObj.questAnsArr[next].answer;
        var correctAnswer = triviaGameObj.questAnsArr[next].a[correctAnswerIndex];

        console.log(timerTemp);
        if (timerTemp == 0) {
            message = "Out of Time!<br />";
            message += "The correct answer was: " + correctAnswer;
            unanswered++;
        } else if (ansNum == correctAnswerIndex) {
            message = "Correct!<br />";
            correctAns++;
        } else {
            message = "Nope!<br />";
            message += "The correct answer was: " + correctAnswer;
            incorrectAns++;
        }

        triviaGameObj.showMessage({ msg: message });

        var questAnsArrLen = triviaGameObj.questAnsArr.length;

        if (next == (questAnsArrLen - 1)) {
            rTimeOut = setTimeout(triviaGameObj.showResult, triviaGameObj.timer + '000');
        } else {
            qTimeOut = setTimeout(triviaGameObj.showQuestion, triviaGameObj.timer + '000');
        }
        next++;

        clearInterval(intervalId);
        secondsRunning = false;
    },

    showResult: function () {
        var message = '';
        message = "All done, here's how you did!<br />";

        message += "Correct Answers: " + correctAns + "<br />";
        message += "Incorrect Answers: " + incorrectAns + "<br />";
        message += "Unanswered: " + unanswered + "<br />";

        triviaGameObj.showMessage({ msg: message });

        var a = $("<button>");
        // Adding a classes to start over button
        a.addClass("start_over_btn btn btn-warning btn-lg mt-5");
        // Providing the initial button text
        a.text("Start Over?");

        $("#bottom_div").append(a);

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