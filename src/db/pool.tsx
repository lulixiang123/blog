const mysql = require('mysql');
const mysqlConfig = require('./DBConfig').default;
const pool=mysql.createPool(mysqlConfig)

const query = (sql: string,value:Array<any>) => {
    return new Promise<any>((resolve, reject) => {
        pool.getConnection((error: any, connection: {
            query: (
                sql: string,
                value:Array<any>,
                callback: (error: any, results: any) => void) => void,
            release: () => void;
        }) => {
            if (error) {
                reject(error);
            } else {
                connection.query(sql,value,(error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release(); // 释放该链接
                });
            }
        });
    });
};
export default query