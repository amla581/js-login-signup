const readlinesync = require("readline-sync")
var passwordValidator = require('password-validator');
const fs = require('fs');

var main_obj = {}
var list = []
var mid_obj = {}
var new_obj = {}
var list1 = []

const option = readlinesync.question(" 1. Signup / 2. for Login=")

if (option == 1) {

    const user_name = readlinesync.question("Enter  the name=")
    const password = readlinesync.question("Enter your password=")
    const password1 = readlinesync.question("Confirm your password=")
    
    var schema = new passwordValidator();
    schema.is().min(5).is().max(15).has().uppercase().has().lowercase().has().digits(1).has().symbols(1)
    var stronPassword = (schema.validate(password));
    console.log(stronPassword)

    if (password == password1) {
        console.log("successful password");

    } else {
        console.log("Both password are not equal");

    } if (stronPassword == true) {
        mid_obj["Username"] = user_name
        mid_obj["Password"] = password

        list.push(mid_obj)

        main_obj["user"] = list

        fs.exists("userdetails.json", function (exists) {

            if (exists) {

                fs.readFile("userdetails.json", "utf8", (err, data1) => {
                    if (err) throw err;
                    var obj = JSON.parse(data1)

                    var list1 = (obj["user"]);

                    for (i in list1) {
                        var fileData = list1[i]["Username"]
                        if (fileData == user_name) {
                            break
                        }
                    }
                    if (fileData == user_name) {
                        console.log('already exists');
                    } else {
                        mid_obj["Username"] = user_name
                        mid_obj["Password"] = password
                        main_obj["user"] = list1

                        const Description = readlinesync.question("enter description= ")
                        const BirthDate = readlinesync.question("what is date of birth= ")
                        const Hobbies = readlinesync.question("what is your hobbi= ")
                        const Gender = readlinesync.question("Enter your sex= ")
                        new_obj["description"] = Description
                        new_obj["dob"] = BirthDate
                        new_obj["hobbies"] = Hobbies
                        new_obj["gender"] = Gender
                        mid_obj["profile"] = new_obj
                        list1.push(mid_obj)
                        main_obj["user"] = list1

                        fs.writeFile("userdetails.json", JSON.stringify(main_obj, null, 4), err => {

                            console.log("Data has added successfully in json!!!");
                        })

                    }

                })
            }
            else {
                console.log("signe up successfully");

                const Description = readlinesync.question("enter your discreaption=")
                const BirthDate = readlinesync.question("Enter your date of birth=")
                const Hobbies = readlinesync.question("write Hobbies=")
                const Gender = readlinesync.question("enter your sex=")

                new_obj["description"] = Description
                new_obj["dob"] = BirthDate
                new_obj["hobbies"] = Hobbies
                new_obj["gender"] = Gender
                mid_obj["profile"] = new_obj
                list1.push(mid_obj)
                main_obj["user"] = list1



                fs.writeFile("userdetails.json", JSON.stringify(main_obj, null, 4), err => {

                    if (err) throw err;

                })

            }
        })
    } else {
        console.log(" Both password are not same")
    }
} else {
    const user_name = readlinesync.question("Enter name= ")
    const password = readlinesync.question("Enter password= ")

        const data = fs.readFile("userdetails.json", "utf8", (err, data) => {
            if (err){
                throw err;
            }
            var fileData = JSON.parse(data)
            var list2 = (fileData["user"])

            for (i in list2) {

                var name = list2[i]["Username"]
                var pswd = list2[i]["Password"]
                var gen = list2[i]["profile"]["gender"]
                var bio = list2[i]["profile"]["description"]
                var hobbys = list2[i]["profile"]["hobbies"]
                var dob = list2[i]["profile"]["dob"]

                if (name == user_name && pswd == password) {
                    break
                }
            }
            if (name == user_name && pswd == password) {
                console.log(`${user_name} you are logged in successfully`)

                console.log("&&&&& PROFILE &&&&&");
                console.log(`User_name:-${user_name}`);
                console.log(`Sex:-${gen}`);
                console.log(`Bio:-${bio}`);
                console.log(`Hobbies:-${hobbys}`);
                console.log(`DOB:-${dob}`);

                console.log("successful login");
            } else {

                console.log("invalid password");

            }
        })
}