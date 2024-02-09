import { fa, fakerEN_IN as faker } from "@faker-js/faker";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();



const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    port: process.env.PORTNUM,       
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,    
    database: process.env.DBNAME
}).promise();



async function  execute_query(){
    const res = await pool.query("SELECT * from student");
    console.log(res);
}


function getRandomIndex(ary_length){
    return Math.floor(Math.random() * ary_length);    
}

function padbatchID(number,length) {
    const num = number;
    const formattedNumber = num.toString().padStart(length, '0');
    return formattedNumber;
}
// numtostr(44, 3);

async function getbatchID(batch){
    let res = await  pool.query(`SELECT count(*) as total_students from student where batch_ID = ${batch};`);
    res = res[0][0].total_students;
    return padbatchID(res+1, 4);
}

async function getRandomStudent(batch){
    if(!Number.isInteger(batch)){
        console.log("Enter a valid batch number");
        return;
    }
    let name = `${faker.person.firstName()} ${faker.person.lastName()}`;
    let college_id = `${batch}${await getbatchID(batch)}`;
    let batch_id = batch;
    let password = faker.internet.password();
    return [name, college_id, batch_id, password];
}

// getRandomStudent(2021);


async function init_newBatch(year){
    if(!Number.isInteger()){
        console.error(`${year} is not a valid year`);
        return;
    }
    let res = await pool.query('')
}
async function getRandomStaff(department){
    let count = await pool.query('select count(*) from staff;');

    // console.log(count);
    count = count[0][0]['count(*)']+1;
    // console.log(count);
    count = padbatchID(count,3);
    let staff_ID = `ST_${count}`;
    let name = `${faker.person.firstName()} ${faker.person.lastName()}`;
    // console.log(staff_ID);
    // console.log(name);
    let access_data = '{}';
    let is_HOD = false;
    let is_Admin = false;
    let password = `${ faker.internet.password()}`
    // console.log(password);
    return [staff_ID,department,name,access_data,is_HOD,is_Admin,password];
    

}

async function insertStaff(){
    let details = await getRandomStaff('cse');
    let result = await pool.query('insert into staff values (?);',[details]);
    console.log(result);

}



// getRandomStaff("CSE").then((e)=>{console.log(e)})
insertStaff();

