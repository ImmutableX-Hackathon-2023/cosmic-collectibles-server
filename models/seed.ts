import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./chinook.db');

db.all('DROP TABLE IF EXISTS rockets');

db.all('CREATE TABLE rockets (id integer primary key, name varchar(20), fuel integer, speed integer, health integer, rating integer);');