import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./chinook.db');
// console.log(db.all('DROP TABLE rockets;'))
// console.log(db.all('CREATE TABLE rockets( id INTEGER PRIMARY KEY, name TEXT, description TEXT, user_id INTEGER, image_url TEXT, health INTEGER, fuel INTEGER, speed INTEGER, rating INTEGER)'));

export { db };