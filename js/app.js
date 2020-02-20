/* -----------------------------
     CONNECT TO MYSQL
 --------------------------------- */

// var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: '107.180.1.16',
//     user: 'pentest',
//     password: '!!Pentest'
// });

// connection.connect(function(err) {
//     if(err) throw err;
//     console.log("Connected to the database!");
// });


/* -----------------------------
    CODE FOR REGISTER PAGE
 --------------------------------- */

function registerOnSubmit() {
    let user = $("#user").val();
    let uni = $("#uni").val();
    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let pass = $("#pass").val();
    let confirm = $("#confirm").val();
    let responses = [user, uni, fname, lname, pass, confirm];

    for (var i = 0; i < responses.length; i++) {
        if (pass != confirm) {
            alert("Passwords don't match.");
            break;
        }

        if (responses[i] == "") {
            alert("Please complete all fields.");
            break;
        } else {
            insertSignUpData(responses);
            alert("Account succesfully created!");
            window.location.href = "index.html"
            break;
        }
    }
}

// Put data into database
function insertSignUpData(responses) {
    connection.connect(function(err) {
        if(err) throw err;
        console.log("Connected!");

        var insertStatement = "INSERT INTO User_Account (user_ID, University_name, Fname, Lname, Password,Major) VALUES ("
                    + "'" + user + "'" + ","
                    + "'" + uni + "'" + ","
                    + "'" + fname + "'" + ","
                    + "'" + lname + "'" + ","
                    + "'" + pass + "'" + ")";
        
        connection.query(insertStatement, function(err, result) {
            if(err) throw err;
            console.log("Succesfully inputted " + responses + " to the database.");
        });
    });
    window.location.href = "./dashboard.html";
}

/* 
    CODE FOR GRADE ENTRY PAGE
*/

function submitGradeEntryData() {
    let school = $("#school").val();
    let year = $("#year").val();
    let term = $("#term").val();
    let major = $("#major").val();
    let cumGpa = $("#cumGpa").val();
    let termGpa = $("#termGpa").val();
    let course = $("#course").val();
    let grade = $("#grade").val();
    let required = [school, year, term, major, cumGpa, termGpa];
    let fullGrades = [school, year, term, major, cumGpa, termGpa, course, grade];
    let optional = false;

    if (fullGrades[6] == "") {
        //handle required
        for (var i = 0; i < required.length; i++) {
            if (required[i] == "") {
                alert("Please complete all fields.");
                break;
            } else if (required[4] > 4 || required[5] > 4) {
                alert("GPA cannot be over 4.0.");
                break;
            } else {
                insertSignUpData(required);
                break;
            }
        }
    } else {
        // handle fullGrades
        for(var i = 0; i < fullGrades.length; i++) {
            if (fullGrades[i] == "") {
                alert("Please complete all fields.");
                break;
            } else if (fullGrades[4] > 4 || fullGrades[5] > 4) {
                alert("GPA cannot be over 4.0.");
                break;
            } else if(fullGrades[7] > 100) {
                alert("Grade cannot be over 100.");
                break;
            } else {
                insertSignUpData(fullGrades);
                break;
            }
        }

    }
}