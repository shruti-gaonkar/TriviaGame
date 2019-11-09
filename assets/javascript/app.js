window.onload = function () {
    // start button
    $("#start_btn").on("click", triviaGameObj.showQuestion);

    // binding on click event to start over button when created
    $(document).on("click", ".start_over_btn", triviaGameObj.showQuestion);
};

// global variables
var next = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var intervalId;
var secondsRunning = false;
var qTimeOut;
var rTimeOut;
var aTimeOut;
var secs = 30;
var timerTemp = 0;

/**
 * initialising trivia game object
 * initialising the question and answer array - question, answer options, correct answer, answer image
 */
var triviaGameObj = {
    timer: secs,
    questAnsArr: [
        {
            "q": "Which popular TV show featured house Targaryen and Stark?",
            "a": {
                1: "Stranger Things",
                2: "Game of Thrones",
                3: "The Crown",
                4: "The Good Place"
            },
            "answer": 2,
            "image": "https://media.giphy.com/media/4CsGr6QNDSNri/giphy.gif"
        },
        {
            "q": "Which desert is the largest in the world?",
            "a": {
                1: "Thar Desert",
                2: "The Sahara Desert",
                3: "Great Basin",
                4: "Great Victoria Desert"
            },
            "answer": 2,
            "image": "https://media.giphy.com/media/PR3o1Xxx4xADC/giphy.gif"
        },
        {
            "q": "Which cartoon character lives in a pineapple under the sea?",
            "a": {
                1: "Doraemon",
                2: "Bugs Bunny",
                3: "Spongebob Squarepants",
                4: "Mickey Mouse"
            },
            "answer": 3,
            "image": "http://giphygifs.s3.amazonaws.com/media/nDSlfqf0gn5g4/giphy.gif"
        },
        {
            "q": "In which body part can you find the femur?",
            "a": {
                1: "Leg",
                2: "Arm",
                3: "Neck",
                4: "Chest"
            },
            "answer": 1,
            "image": "https://media.giphy.com/media/l3nWkBDBuZ7HBRrkQ/giphy.gif"
        },
        {
            "q": "Which country invented tea?",
            "a": {
                1: "India",
                2: "Thailand",
                3: "China",
                4: "Malaysia"
            },
            "answer": 3,
            "image": "https://media.giphy.com/media/l2YWgcxIZ0vn1ZmaQ/giphy.gif"
        },
        {
            "q": "Which planet has the most gravity?",
            "a": {
                1: "Earth",
                2: "Saturn",
                3: "Mars",
                4: "Jupiter"
            },
            "answer": 4,
            "image": "https://media.giphy.com/media/s2uampOAMWksU/giphy.gif"
        }
    ],

    /**
     * function to show each question based on the next counter 
     */
    showQuestion: function () {
        // reset timer and intervals each time the question is shown
        triviaGameObj.resetTimer();

        // when game is restarted reset extra variables other than timers
        if ($(this).hasClass('start_over_btn')) {
            next = 0;
            correctAns = 0;
            incorrectAns = 0;
            unanswered = 0;
        }
        // start to display timer and call timer function every sec to display the seconds countdown
        triviaGameObj.setTimer();

        if (!secondsRunning) {
            intervalId = setInterval(triviaGameObj.setTimer, 1000);
            secondsRunning = true;
        }

        // get the question and display based on next counter
        var questAnsArrLen = triviaGameObj.questAnsArr.length;
        var question = triviaGameObj.questAnsArr[next].q;
        $("#bottom_div").empty();
        $("#bottom_div").html(question);

        // Display the list of answer options for a question
        var optionsObj = triviaGameObj.questAnsArr[next].a;
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

        // Show answer if timer reaches 0. Added +1 to timer to stop timer at 0 
        // else it was stopping to 1 
        aTimeOut = setTimeout(triviaGameObj.showAnswer, (triviaGameObj.timer + 1) + '000');
    },

    /**
     * function to display the timer
     */
    setTimer: function () {
        timerTemp = triviaGameObj.timer--;
        var timerDiv = $("<div>").text("Time Remaining: " + timerTemp + " Seconds");
        timerDiv.addClass("pb-3");
        $("#top_div").html(timerDiv);
    },

    /**
     * function to show the result based on user input
     */
    showAnswer: function () {
        // reset timer and intervals each time the question is shown
        triviaGameObj.resetTimer();

        // the ansNum attr returns the index of answer that was clicked
        var ansNum = $(this).attr('ansNum');
        var message;

        // get answer, image based on ansNum attribute
        var correctAnswerIndex = triviaGameObj.questAnsArr[next].answer;
        var correctAnswerImage = triviaGameObj.questAnsArr[next].image;
        var correctAnswer = triviaGameObj.questAnsArr[next].a[correctAnswerIndex];

        // display messages based on user input
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

        // append image to the message
        var img = $("<img>");
        img.attr("src", correctAnswerImage);
        $("#bottom_div").append(img);

        var questAnsArrLen = triviaGameObj.questAnsArr.length;

        if (next == (questAnsArrLen - 1)) {
            // if last question then show results
            rTimeOut = setTimeout(triviaGameObj.showResult, 5000);
        } else {
            // go to next question if not reached last question
            qTimeOut = setTimeout(triviaGameObj.showQuestion, 5000);
        }
        next++;

        //clearInterval(intervalId);
        //secondsRunning = false;
    },

    showResult: function () {
        var message = '';
        message = "All done, here's how you did!<br />";

        message += "Correct Answers: " + correctAns + "<br />";
        message += "Incorrect Answers: " + incorrectAns + "<br />";
        message += "Unanswered: " + unanswered + "<br />";

        triviaGameObj.showMessage({ msg: message });

        var a = $("<button>");
        // Adding classes to start over button  to initiate the on click event on line 6
        a.addClass("start_over_btn btn btn-warning btn-lg mt-5");
        // Providing the initial button text
        a.text("Start Over?");
        $("#bottom_div").append(a);

        triviaGameObj.resetTimer();
    },

    /**
     * 
     * @param {obj} objParams message and div to  be appended to
     */
    showMessage: function (objParams) {
        var newDiv = '';
        newDiv = $("<div>").html(objParams.msg);
        var parentDiv = (objParams.div) ? objParams.div : "bottom_div";
        $("#" + parentDiv).empty();
        $("#" + parentDiv).append(newDiv);
    },

    /**
     * function to reset timer and intervals
     */
    resetTimer: function () {
        triviaGameObj.timer = secs;
        clearTimeout(qTimeOut);
        clearTimeout(rTimeOut);
        clearTimeout(aTimeOut);
        clearInterval(intervalId);
        secondsRunning = false;
    }
}